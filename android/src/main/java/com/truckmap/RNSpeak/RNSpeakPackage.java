//
//  RNSpeakPackage.java
//  RNSpeak
//
//  Created by Eric Lewis on 5/24/19.
//  Copyright © 2019 TruckMap. All rights reserved.
//

package com.truckmap.RNSpeak;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class RNSpeakPackage implements ReactPackage {

  @Override
  public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
    List<NativeModule> modules = new ArrayList<>();

    modules.add(new RNSpeakModule(reactContext));

    return modules;
  }

  @Override
  public List<ViewManager> createViewManagers(
      ReactApplicationContext reactContext) {
    return Collections.emptyList();
  }

}