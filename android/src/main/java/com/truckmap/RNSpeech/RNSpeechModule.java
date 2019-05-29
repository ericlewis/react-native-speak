//
//  RNSpeechModule.java
//  RNSpeech
//
//  Created by Eric Lewis on 5/24/19.
//  Copyright © 2019 TruckMap. All rights reserved.
//

package com.truckmap.RNSpeech;

import android.media.AudioFormat;
import android.media.AudioManager;
import android.media.AudioTrack;
import android.os.Build;
import android.util.Base64;
import android.util.Log;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
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

    private ReactApplicationContext mReactContext;

    public RNSpeechModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.mReactContext = reactContext;
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

        return constants;
    }

    @ReactMethod
    public void saveProviderAsDefault(String provider) {
        // do nothing yet
    }

    @ReactMethod
    public void playAudioContent(String base64AudioContent, String utterance, ReadableMap options) {
        byte[] data = Base64.decode(base64AudioContent, Base64.DEFAULT);
        int intSize = AudioTrack.getMinBufferSize(16000, 
                                                AudioFormat.CHANNEL_OUT_MONO, 
                                                AudioFormat.ENCODING_PCM_16BIT);
        AudioTrack at = new AudioTrack(AudioManager.STREAM_MUSIC, 
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
        sendEvent(SPEECH_START_EVENT, null);
        sendEvent(SPEECH_END_EVENT, null);
    }

    @ReactMethod
    public void getVoices(Promise promise) {
        promise.resolve(null);
    }

    @ReactMethod
    public void getAudioSources(Promise promise) {
        promise.resolve(null);
    }

    private void sendEvent(String eventName,
                           @Nullable WritableMap params) {
        mReactContext
            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
            .emit(eventName, params);
    }
}