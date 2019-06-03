//
//  RNSpeechModule.java
//  RNSpeech
//
//  Created by Eric Lewis on 5/24/19.
//  Copyright © 2019 TruckMap. All rights reserved.
//

package com.truckmap.RNSpeech;

import android.content.Context;
import android.content.SharedPreferences;
import android.media.AudioAttributes;
import android.media.AudioFocusRequest;
import android.media.AudioFormat;
import android.media.AudioManager;
import android.media.AudioTrack;
import android.os.Build;
import android.speech.tts.TextToSpeech;
import android.speech.tts.UtteranceProgressListener;
import android.speech.tts.Voice;
import android.util.Base64;
import android.util.Log;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import javax.annotation.Nullable;

import java.util.Map;
import java.util.HashMap;

public class RNSpeechModule extends ReactContextBaseJavaModule {
    public static final String NAME = "RNSpeech";

    // Event names, keep in sync with iOS / types
    private static final String SPEECH_LOADING_EVENT = "SPEECH_LOADING_EVENT";
    private static final String SPEECH_START_EVENT = "SPEECH_START_EVENT";
    private static final String SPEECH_END_EVENT = "SPEECH_END_EVENT";
    private static final String SPEECH_ERROR_EVENT = "SPEECH_ERROR_EVENT";
    private static final String DEFAULT_PROVIDER_KEY = "DEFAULT_PROVIDER_KEY";

    private TextToSpeech tts;

    private AudioManager audioManager;
    private AudioFocusRequest mAudioFocusRequest;
    private AudioManager.OnAudioFocusChangeListener afChangeListener;
    private SharedPreferences preferences;

    public RNSpeechModule(ReactApplicationContext reactContext) {
        super(reactContext);

        Context appContext = reactContext.getApplicationContext();
        audioManager = (AudioManager) appContext.getSystemService(reactContext.AUDIO_SERVICE);
        preferences = getReactApplicationContext().getSharedPreferences("RNSpeech", Context.MODE_PRIVATE);  

        tts = new TextToSpeech(appContext, new TextToSpeech.OnInitListener() {
            @Override
            public void onInit(int status) {
                // we have init'd let do somethin with it.
            }
        });

        tts.setOnUtteranceProgressListener(new UtteranceProgressListener() {
            @Override
            public void onStart(String utteranceId) {
                sendEvent(SPEECH_START_EVENT, null);
            }

            @Override
            public void onDone(String utteranceId) {
                sendEvent(SPEECH_END_EVENT, null);
            }

            @Override
            public void onError(String utteranceId) {
                sendEvent(SPEECH_ERROR_EVENT, null);
            }
        });
    }

    @Override
    public void onCatalystInstanceDestroy() {
        tts.shutdown();
    }

    @Override
    public String getName() {
        return NAME;
    }

    @Override
    public @Nullable Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        final Map<String, Object> events = new HashMap<>();

        events.put(SPEECH_LOADING_EVENT, SPEECH_LOADING_EVENT);
        events.put(SPEECH_START_EVENT, SPEECH_START_EVENT);
        events.put(SPEECH_END_EVENT, SPEECH_END_EVENT);
        events.put(SPEECH_ERROR_EVENT, SPEECH_ERROR_EVENT);
        constants.put("events", events);

        // Settings
        constants.put("provider", preferences.getString(DEFAULT_PROVIDER_KEY, null));

        return constants;
    }

    @ReactMethod
    public void saveProviderAsDefault(String provider) {
        SharedPreferences.Editor editor = preferences.edit();
        editor.putString(DEFAULT_PROVIDER_KEY, provider);
        editor.apply();
    }

    @ReactMethod
    public void playAudioContent(String base64AudioContent, String utterance, ReadableMap options) {
        // TODO: handle options, utteranceId's should map to a map so we can report our events better
        byte[] data = Base64.decode(base64AudioContent, Base64.DEFAULT);
        int intSize = AudioTrack.getMinBufferSize(16000, 
                                                AudioFormat.CHANNEL_OUT_MONO, 
                                                AudioFormat.ENCODING_PCM_16BIT);
        AudioTrack at = new AudioTrack(audioManager.STREAM_MUSIC, 
                                    16000, 
                                    AudioFormat.CHANNEL_OUT_MONO, 
                                    AudioFormat.ENCODING_PCM_16BIT, 
                                    intSize, 
                                    AudioTrack.MODE_STREAM);
        if (at != null) {
            sendEvent(SPEECH_START_EVENT, null);
            at.play();
            at.write(data, 0, data.length);
            at.stop();
            at.release();
            sendEvent(SPEECH_END_EVENT, null);
        } else {
            sendEvent(SPEECH_ERROR_EVENT, null);
        }
    }

    @ReactMethod
    public void speak(String utterance, ReadableMap options) {
        // TODO: handle options, utteranceId's should map to a map so we can report our events better
        String utteranceId = Integer.toString(utterance.hashCode());
        tts.speak(utterance, TextToSpeech.QUEUE_ADD, null, utteranceId);
    }

    @ReactMethod
    public void getVoices(Promise promise) {
        WritableArray voiceArray = Arguments.createArray();

        // TODO: check out our options for lower SDKs
        // TODO: notInstalled / network connection required may have equiv on iOS
        if (Build.VERSION.SDK_INT >= 21) {
            try {
                for(Voice voice: tts.getVoices()) {
                    WritableMap voiceMap = Arguments.createMap();
                    voiceMap.putString("id", voice.getName());
                    voiceMap.putString("name", voice.getName());
                    voiceMap.putBoolean("networkConnectionRequired", voice.isNetworkConnectionRequired());
                    voiceMap.putBoolean("notInstalled", voice.getFeatures().contains(TextToSpeech.Engine.KEY_FEATURE_NOT_INSTALLED));
                    voiceArray.pushMap(voiceMap);
                }
            } catch (Exception e) {
              // Purposefully ignore exceptions here due to some buggy TTS engines.
              // See http://stackoverflow.com/questions/26730082/illegalargumentexception-invalid-int-os-with-samsung-tts
            }
        } else {
            // no extra voice options on older SDKs...
        }

        promise.resolve(voiceArray);
    }

    @ReactMethod
    public void getAudioSources(Promise promise) {
        // TODO: implement
        promise.resolve(null);
    }

    private Boolean duckAudio() {
        int duckType = AudioManager.AUDIOFOCUS_GAIN_TRANSIENT_MAY_DUCK;

        if (Build.VERSION.SDK_INT >= 26) {
            AudioAttributes mPlaybackAttributes = new AudioAttributes.Builder()
                .setUsage(AudioAttributes.USAGE_MEDIA)
                .setContentType(AudioAttributes.CONTENT_TYPE_SPEECH)
                .build();
            mAudioFocusRequest = new AudioFocusRequest.Builder(duckType)
                .setAudioAttributes(mPlaybackAttributes)
                .setAcceptsDelayedFocusGain(true)
                .setOnAudioFocusChangeListener(afChangeListener)
                .build();

            int result = audioManager.requestAudioFocus(mAudioFocusRequest);
            return result == AudioManager.AUDIOFOCUS_REQUEST_GRANTED;
        } else {
            int result = audioManager.requestAudioFocus(afChangeListener,
                                                            AudioManager.STREAM_MUSIC,
                                                            duckType);

            return result == AudioManager.AUDIOFOCUS_REQUEST_GRANTED;
        }
    }

    private void sendEvent(String eventName,
                           @Nullable WritableMap options) {

        // this is the easiest way to ensure we remove our ducking      
        // if ducking...                 
        switch(eventName)
        {
            case SPEECH_END_EVENT:
            case SPEECH_ERROR_EVENT:
                if (Build.VERSION.SDK_INT >= 26) {
                    audioManager.abandonAudioFocusRequest(mAudioFocusRequest);
                } else {
                    audioManager.abandonAudioFocus(afChangeListener);
                }
                break;
            default:
                // do nothing
        }

        getReactApplicationContext()
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, options);
    }
}