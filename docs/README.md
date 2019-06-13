
react-native-speech
===================

A wonderful TTS (text-to-speech) library for [React Native](https://github.com/facebook/react-native).

TOC
---

*   [Installation](#installation)
*   [Linking](#linking)
*   [Usage](#usage)
*   [API](#api)

Installation
------------

Using npm:

```shell
npm install --save react-native-speech
```

or using yarn:

```shell
yarn add react-native-speech
```

Linking
-------

### Automatic

```shell
react-native link react-native-speech
```

_For iOS users using Pods:_ You need to run `pod install` after running the above link command inside your `ios` folder.

### Manual

iOS (via CocoaPods)

Add the following line to your build targets in your `Podfile`

`pod 'RNSpeech', :path => '../node_modules/react-native-speech'`

Then run `pod install`

iOS (without CocoaPods)

In XCode, in the project navigator:

*   Right click _Libraries_
*   Add Files to _\[your project's name\]_
*   Go to `node_modules/react-native-speech`
*   Add the `.xcodeproj` file

In XCode, in the project navigator, select your project.

*   Add the `libRNSpeech.a` from the _RNSpeech_ project to your project's _Build Phases ➜ Link Binary With Libraries_
*   Click `.xcodeproj` file you added before in the project navigator and go the _Build Settings_ tab. Make sure _All_ is toggled on (instead of _Basic_).
*   Look for _Header Search Paths_ and make sure it contains both `$(SRCROOT)/../react-native/React` and `$(SRCROOT)/../../React`
*   Mark both as recursive (should be OK by default).

Run your project (Cmd+R)

Android

*   **_optional_** in `android/build.gradle`:

```gradle
...
  ext {
    // dependency versions
    googlePlayServicesVersion = "<Your play services version>" // default: "+"
    compileSdkVersion = "<Your compile SDK version>" // default: 23
    buildToolsVersion = "<Your build tools version>" // default: "25.0.2"
    targetSdkVersion = "<Your target SDK version>" // default: 22
  }
...
```

*   in `android/app/build.gradle`:

```diff
dependencies {
    ...
    implementation "com.facebook.react:react-native:+"  // From node_modules
+   implementation project(':react-native-speech')
}
```

*   in `android/settings.gradle`:

```diff
...
include ':app'
+ include ':react-native-speech'
+ project(':react-native-speech').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-speech/android')
```

*   in `MainApplication.java`:

```diff
+ import com.truckmap.RNSpeech.RNSpeech;

  public class MainApplication extends Application implements ReactApplication {
    //......

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
+         new RNSpeech(),
          new MainReactPackage()
      );
    }

    ......
  }
```

NOTE: If you faced with this error: `Could not resolve all files for configuration ':react-native-speech:debugCompileClasspath'.`, in `build.gradle` put `google()` in the first line (according to [https://stackoverflow.com/a/50748249](https://stackoverflow.com/a/50748249))

*   in `android/build.gradle`:

```diff
allprojects {
    repositories {
+       google()
        ...
    }
}
```

Usage
-----

```js
import Speech from 'react-native-speech';
```

API
---

Method

Return Type

iOS

Android

[speak()](#speak)

`Promise<any>`

✅

✅

* * *

### speak()

```
speak(text: string)
```

Speaks a phrase.

**Examples**

```js
Speech.speak("hello world!"); // speaks the given phrase.
```

* * *

Events
------

### onSpeechStart

Fired when speech has started.

**Examples**

```js
import { NativeEventEmitter, NativeModules } from 'react-native'
const speechEventEmitter = new NativeEventEmitter(NativeModules.RNSpeech)

speechEventEmitter.addListener('onSpeechStart', () => {
  // callback when finished
});
```

* * *

### onSpeechEnd

Fired when speech has ended.

**Examples**

```js
import { NativeEventEmitter, NativeModules } from 'react-native'
const speechEventEmitter = new NativeEventEmitter(NativeModules.RNSpeech)

speechEventEmitter.addListener('onSpeechEnd', () => {
  // callback when finished
});
```

* * *

### onSpeechError

Fired when an error is found in the speech pipeline. (TBD)

**Examples**

```js
import { NativeEventEmitter, NativeModules } from 'react-native'
const speechEventEmitter = new NativeEventEmitter(NativeModules.RNSpeech)

speechEventEmitter.addListener('onSpeechError', error => {
  console.error(error);
});
```

* * *

Release Notes
-------------

See the [CHANGELOG.md](/CHANGELOG.md).

Contributing
------------

Please see the [`contributing guide`](/CONTRIBUTING.md).

## Index

### Classes

* [GoogleProvider](classes/googleprovider.md)
* [NativeProvider](classes/nativeprovider.md)
* [PollyProvider](classes/pollyprovider.md)
* [Provider](classes/provider.md)
* [ProviderManager](classes/providermanager.md)
* [Queue](classes/queue.md)
* [Speech](classes/speech.md)

### Interfaces

* [Constants](interfaces/constants.md)
* [NativeSpeechModuleInterface](interfaces/nativespeechmoduleinterface.md)
* [ProviderInterface](interfaces/providerinterface.md)
* [SpeechModuleInterface](interfaces/speechmoduleinterface.md)
* [SpeechOptions](interfaces/speechoptions.md)
* [SpeechUtterance](interfaces/speechutterance.md)
* [Voice](interfaces/voice.md)

### Type aliases

* [EventName](#eventname)
* [QueueCallback](#queuecallback)

### Variables

* [RNSpeech](#rnspeech)

---

## Type aliases

<a id="eventname"></a>

###  EventName

**Ƭ EventName**: *"ADDED_ITEM" \| "REMOVED_ITEM"*

*Defined in [Queue.ts:1](https://github.com/ericlewis/react-native-speech/blob/f509ee8/src/Queue.ts#L1)*

___
<a id="queuecallback"></a>

###  QueueCallback

**Ƭ QueueCallback**: *`function`*

*Defined in [Queue.ts:2](https://github.com/ericlewis/react-native-speech/blob/f509ee8/src/Queue.ts#L2)*

#### Type declaration
▸<`T`>(eventName: *[EventName](#eventname)*, data: *`T`[]*, item?: *[T]()*): `void`

**Type parameters:**

#### T 
**Parameters:**

| Name | Type |
| ------ | ------ |
| eventName | [EventName](#eventname) |
| data | `T`[] |
| `Optional` item | [T]() |

**Returns:** `void`

___

## Variables

<a id="rnspeech"></a>

### `<Const>` RNSpeech

**● RNSpeech**: *[NativeSpeechModuleInterface](interfaces/nativespeechmoduleinterface.md)* =  NativeModules.RNSpeech

*Defined in [NativeSpeechModule.ts:94](https://github.com/ericlewis/react-native-speech/blob/f509ee8/src/NativeSpeechModule.ts#L94)*

___

