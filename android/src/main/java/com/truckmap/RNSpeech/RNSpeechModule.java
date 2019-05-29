//
//  RNSpeechModule.java
//  RNSpeech
//
//  Created by Eric Lewis on 5/24/19.
//  Copyright © 2019 TruckMap. All rights reserved.
//

package com.truckmap.RNSpeech;

import android.os.Build;
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

    public RNSpeechModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public void initialize() {
        // nothing yet
    }

    @Override
    public void onCatalystInstanceDestroy() {
        // nothing yet
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
        // do nothing yet
    }

    @ReactMethod
    public void speak(String utterance, ReadableMap options) {
        // do nothing yet
    }

    @ReactMethod
    public void getVoices(Promise promise) {
        promise.resolve(null);
    }

    @ReactMethod
    public void getAudioSources(Promise promise) {
        promise.resolve(null);
    }

    private void sendEvent(ReactApplicationContext reactContext,
                       String eventName,
                       @Nullable WritableMap params) {
        reactContext
            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
            .emit(eventName, params);
    }
}