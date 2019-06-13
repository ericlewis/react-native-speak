//
//  RNSpeechModule.java
//  RNSpeech
//
//  Created by Eric Lewis on 5/24/19.
//  Copyright © 2019 TruckMap. All rights reserved.
//

package com.truckmap.RNSpeech;

import android.content.Context;
import android.media.AudioAttributes;
import android.media.AudioFocusRequest;
import android.media.AudioFormat;
import android.media.AudioManager;
import android.media.AudioTrack;
import android.os.Build;
import android.os.Bundle;
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

    private static final String OUTPUT_PHONE_SPEAKER = "Speaker";
    private static final String OUTPUT_BLUETOOTH = "Bluetooth";
    private static final String OUTPUT_HEADPHONES = "Headphones";

    private TextToSpeech tts;
    private Voice previousVoice;

    private AudioTrack at;
    private AudioManager audioManager;
    private AudioFocusRequest mAudioFocusRequest;
    private AudioManager.OnAudioFocusChangeListener afChangeListener = new AudioManager.OnAudioFocusChangeListener() {
        @Override
        public void onAudioFocusChange(int focusChange) {
            // do nothing
        }
    };

    private boolean isPlaying;

    private HashMap<String, HashMap<String, Object>> mUtteranceMap = new HashMap();

    public RNSpeechModule(ReactApplicationContext reactContext) {
        super(reactContext);

        Context appContext = reactContext.getApplicationContext();
        audioManager = (AudioManager) appContext.getSystemService(reactContext.AUDIO_SERVICE);

        tts = new TextToSpeech(appContext, new TextToSpeech.OnInitListener() {
            @Override
            public void onInit(int status) {
                // we have init'd let do somethin with it.
            }
        });

        tts.setOnUtteranceProgressListener(new UtteranceProgressListener() {
            @Override
            public void onStart(String utteranceId) {
                HashMap utteranceMap = mUtteranceMap.get(utteranceId);
                sendEvent(SPEECH_START_EVENT, (String) utteranceMap.get("utterance"),
                        (ReadableMap) utteranceMap.get("options"));
            }

            @Override
            public void onDone(String utteranceId) {
                HashMap utteranceMap = mUtteranceMap.get(utteranceId);
                tts.setVoice(previousVoice);
                sendEvent(SPEECH_END_EVENT, (String) utteranceMap.get("utterance"),
                        (ReadableMap) utteranceMap.get("options"));
                mUtteranceMap.remove(utteranceId);
            }

            // TODO: this is deprecated in 21, update to also get an error code back
            @Override
            public void onError(String utteranceId) {
                HashMap utteranceMap = mUtteranceMap.get(utteranceId);
                tts.setVoice(previousVoice);
                sendEvent(SPEECH_ERROR_EVENT, (String) utteranceMap.get("utterance"),
                        (ReadableMap) utteranceMap.get("options"));
                mUtteranceMap.remove(utteranceId);
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
        events.put("SPEECH_LOADING", SPEECH_LOADING_EVENT);
        events.put("SPEECH_START", SPEECH_START_EVENT);
        events.put("SPEECH_END", SPEECH_END_EVENT);
        events.put("SPEECH_ERROR", SPEECH_ERROR_EVENT);
        constants.put("events", events);

        final Map<String, Object> outputs = new HashMap<>();
        outputs.put("PHONE_SPEAKER", OUTPUT_PHONE_SPEAKER);
        outputs.put("BLUETOOTH", OUTPUT_BLUETOOTH);
        outputs.put("HEADPHONES", OUTPUT_HEADPHONES);
        constants.put("outputs", outputs);

        return constants;
    }

    @ReactMethod
    public void playAudioContent(String base64AudioContent, String utterance, ReadableMap options) {
        String utteranceId = Integer.toString(utterance.hashCode());
        HashMap utteranceMap = new HashMap();
        utteranceMap.put("utterance", utterance);
        utteranceMap.put("options", options);
        mUtteranceMap.put(utteranceId, utteranceMap);

        float volume = options.hasKey("volume") ? (float) options.getDouble("volume") : 1.0f;
        byte[] data = Base64.decode(base64AudioContent, Base64.DEFAULT);
        int intSize = AudioTrack.getMinBufferSize(16000, AudioFormat.CHANNEL_OUT_MONO, AudioFormat.ENCODING_PCM_16BIT);
        at = new AudioTrack(audioManager.STREAM_MUSIC, 16000, AudioFormat.CHANNEL_OUT_MONO,
                AudioFormat.ENCODING_PCM_16BIT, intSize, AudioTrack.MODE_STREAM);
        at.setVolume(volume);
        if (at != null) {
            sendEvent(SPEECH_START_EVENT, utterance, options);
            at.play();
            isPlaying = true;
            at.write(data, 0, data.length);
            at.stop();
            isPlaying = false;
            at.release();
            sendEvent(SPEECH_END_EVENT, utterance, options);
            mUtteranceMap.remove(utteranceId);
        } else {
            isPlaying = false;
            sendEvent(SPEECH_ERROR_EVENT, utterance, options);
            mUtteranceMap.remove(utteranceId);
        }
    }

    @ReactMethod
    public void speak(String utterance, ReadableMap options) {
        String utteranceId = Integer.toString(utterance.hashCode());
        HashMap utteranceMap = new HashMap();
        utteranceMap.put("utterance", utterance);
        utteranceMap.put("options", options);
        mUtteranceMap.put(utteranceId, utteranceMap);

        previousVoice = tts.getVoice();
        if (options.hasKey("voiceId")) {
            String voiceId = options.getString("voiceId");
            if (previousVoice.getName().equals(voiceId) == false) {
                if (Build.VERSION.SDK_INT >= 21) {
                    try {
                        for (Voice voice : tts.getVoices()) {
                            if (voice.getName().equals(voiceId)) {
                                int result = tts.setVoice(voice);
                            }
                        }
                    } catch (Exception e) {
                        // Purposefully ignore exceptions here due to some buggy TTS engines.
                        // See
                        // http://stackoverflow.com/questions/26730082/illegalargumentexception-invalid-int-os-with-samsung-tts
                    }
                } else {
                    // do nothing
                }
            }
        }

        float volume = options.hasKey("volume") ? (float) options.getDouble("volume") : 1.0f;
        float pitch = options.hasKey("pitch") ? (float) options.getDouble("pitch") : 1.0f;
        float speakingRate = options.hasKey("speakingRate") ? (float) options.getDouble("speakingRate") : 1.0f;

        // TODO: we probably need these values normalized
        tts.setSpeechRate(speakingRate);
        tts.setPitch(pitch);

        if (Build.VERSION.SDK_INT >= 21) {
            Bundle params = new Bundle();
            params.putFloat(TextToSpeech.Engine.KEY_PARAM_VOLUME, volume);
            tts.speak(utterance, TextToSpeech.QUEUE_ADD, params, utteranceId);
        } else {
            HashMap<String, String> params = new HashMap();
            params.put(TextToSpeech.Engine.KEY_PARAM_VOLUME, String.valueOf(volume));
            tts.speak(utterance, TextToSpeech.QUEUE_ADD, params);
        }
    }

    @ReactMethod
    public void getVoices(Promise promise) {
        WritableArray voiceArray = Arguments.createArray();

        // TODO: check out our options for lower SDKs
        // TODO: notInstalled / network connection required may have equiv on iOS
        if (Build.VERSION.SDK_INT >= 21) {
            try {
                for (Voice voice : tts.getVoices()) {
                    WritableMap voiceMap = Arguments.createMap();
                    voiceMap.putString("id", voice.getName());
                    voiceMap.putString("name", voice.getName());
                    voiceMap.putBoolean("networkConnectionRequired", voice.isNetworkConnectionRequired());
                    voiceMap.putBoolean("notInstalled",
                            voice.getFeatures().contains(TextToSpeech.Engine.KEY_FEATURE_NOT_INSTALLED));
                    voiceArray.pushMap(voiceMap);
                }
            } catch (Exception e) {
                // Purposefully ignore exceptions here due to some buggy TTS engines.
                // See
                // http://stackoverflow.com/questions/26730082/illegalargumentexception-invalid-int-os-with-samsung-tts
            }
        } else {
            // no extra voice options on older SDKs...
        }

        promise.resolve(voiceArray);
    }

    @ReactMethod
    public void getOutputs(Promise promise) {
        WritableArray outputsArray = Arguments.createArray();

        outputsArray.pushString(OUTPUT_PHONE_SPEAKER);

        if (audioManager.isBluetoothA2dpOn() || audioManager.isBluetoothScoOn()) {
            outputsArray.pushString(OUTPUT_BLUETOOTH);
        }

        if (audioManager.isWiredHeadsetOn()) {
            outputsArray.pushString(OUTPUT_HEADPHONES);
        }

        promise.resolve(outputsArray);
    }

    @ReactMethod
    public boolean isSpeaking(Promise promise) {
        if (tts.isSpeaking() || isPlaying) {
            promise.resolve(true);
        } else {
            promise.resolve(false);
        }
    }

    @ReactMethod
    public boolean stop() {
        if (tts.isSpeaking()) {
            tts.stop();
        } else if (isPlaying) {
            at.stop();
            isPlaying = false;
            at.release();
        }

        // TODO: send events, we can just use the last utterance in the map.
        // sendEvent(SPEECH_END_EVENT, utterance, options);
        // mUtteranceMap.remove(utteranceId);
    }

    private Boolean duckAudio() {
        int duckType = AudioManager.AUDIOFOCUS_GAIN_TRANSIENT_MAY_DUCK;

        if (Build.VERSION.SDK_INT >= 26) {
            AudioAttributes mPlaybackAttributes = new AudioAttributes.Builder().setUsage(AudioAttributes.USAGE_MEDIA)
                    .setContentType(AudioAttributes.CONTENT_TYPE_SPEECH).build();
            mAudioFocusRequest = new AudioFocusRequest.Builder(duckType).setAudioAttributes(mPlaybackAttributes)
                    .setAcceptsDelayedFocusGain(true).setOnAudioFocusChangeListener(afChangeListener).build();

            int result = audioManager.requestAudioFocus(mAudioFocusRequest);
            return result == AudioManager.AUDIOFOCUS_REQUEST_GRANTED;
        } else {
            int result = audioManager.requestAudioFocus(afChangeListener, AudioManager.STREAM_MUSIC, duckType);

            return result == AudioManager.AUDIOFOCUS_REQUEST_GRANTED;
        }
    }

    private void releaseDucking() {
        if (Build.VERSION.SDK_INT >= 26) {
            audioManager.abandonAudioFocusRequest(mAudioFocusRequest);
        } else {
            audioManager.abandonAudioFocus(afChangeListener);
        }
    }

    private void sendEvent(String eventName, String utterance, @Nullable ReadableMap options) {

        boolean shouldDuck = options != null && options.hasKey("ducking") ? (boolean) options.getBoolean("ducking")
                : true;

        switch (eventName) {
        case SPEECH_END_EVENT:
        case SPEECH_ERROR_EVENT:
            if (shouldDuck) {
                releaseDucking();
            }
            break;
        case SPEECH_START_EVENT:
            if (shouldDuck) {
                duckAudio();
                setAudioOutput(options);
            }
        default:
            // do nothing
        }

        WritableMap emittableOptions = Arguments.createMap();
        emittableOptions.merge(options);
        getReactApplicationContext().getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit(eventName,
                emittableOptions);
    }

    private void setAudioOutput(ReadableMap options) {
        if (options != null && options.hasKey("preferredOutput")) {
            String audioPort = options.getString("preferredOutput");
            switch (audioPort) {
            case OUTPUT_BLUETOOTH:
                audioManager.setMode(AudioManager.MODE_IN_COMMUNICATION);
                audioManager.startBluetoothSco();
                audioManager.setBluetoothScoOn(true);
                break;
            case OUTPUT_HEADPHONES:
                if (audioManager.isBluetoothScoOn() || audioManager.isBluetoothA2dpOn()) {
                    audioManager.setMode(AudioManager.MODE_IN_CALL);
                } else {
                    audioManager.setMode(AudioManager.MODE_NORMAL);
                }
                audioManager.stopBluetoothSco();
                audioManager.setBluetoothScoOn(false);
                audioManager.setSpeakerphoneOn(false);
                audioManager.setWiredHeadsetOn(true);
                break;
            case OUTPUT_PHONE_SPEAKER:
                if (audioManager.isBluetoothScoOn() || audioManager.isBluetoothA2dpOn()) {
                    audioManager.setMode(AudioManager.MODE_IN_CALL);
                } else {
                    audioManager.setMode(AudioManager.MODE_NORMAL);
                }
                audioManager.stopBluetoothSco();
                audioManager.setBluetoothScoOn(false);
                audioManager.setSpeakerphoneOn(true);
                break;
            default:
                break;
            }
        }
    }
}