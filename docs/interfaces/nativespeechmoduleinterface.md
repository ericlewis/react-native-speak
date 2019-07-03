[react-native-speak](../README.md) > [NativeSpeechModuleInterface](../interfaces/nativespeechmoduleinterface.md)

# Interface: NativeSpeechModuleInterface

The interface for interacting with the native side of things

## Hierarchy

 `EventSubscriptionVendor`

**↳ NativeSpeechModuleInterface**

## Index

### Properties

* [getConstants](nativespeechmoduleinterface.md#getconstants)
* [getOutputs](nativespeechmoduleinterface.md#getoutputs)
* [getVoices](nativespeechmoduleinterface.md#getvoices)
* [isSpeaking](nativespeechmoduleinterface.md#isspeaking)
* [playAudioContent](nativespeechmoduleinterface.md#playaudiocontent)
* [speak](nativespeechmoduleinterface.md#speak)
* [stop](nativespeechmoduleinterface.md#stop)

### Methods

* [addSubscription](nativespeechmoduleinterface.md#addsubscription)
* [constructor](nativespeechmoduleinterface.md#constructor)
* [getSubscriptionsForType](nativespeechmoduleinterface.md#getsubscriptionsfortype)
* [removeAllSubscriptions](nativespeechmoduleinterface.md#removeallsubscriptions)
* [removeSubscription](nativespeechmoduleinterface.md#removesubscription)

---

## Properties

<a id="getconstants"></a>

###  getConstants

**● getConstants**: *`function`*

*Defined in [types/NativeSpeechModule.ts:67](https://github.com/ericlewis/react-native-speech/blob/6acb1ef/src/types/NativeSpeechModule.ts#L67)*

#### Type declaration
▸(): [Constants](constants.md)

**Returns:** [Constants](constants.md)

___
<a id="getoutputs"></a>

###  getOutputs

**● getOutputs**: *`function`*

*Defined in [types/NativeSpeechModule.ts:78](https://github.com/ericlewis/react-native-speech/blob/6acb1ef/src/types/NativeSpeechModule.ts#L78)*

#### Type declaration
▸(): `Promise`<`string`[]>

**Returns:** `Promise`<`string`[]>

___
<a id="getvoices"></a>

###  getVoices

**● getVoices**: *`function`*

*Defined in [types/NativeSpeechModule.ts:88](https://github.com/ericlewis/react-native-speech/blob/6acb1ef/src/types/NativeSpeechModule.ts#L88)*

Get the native voices.

#### Type declaration
▸(): `Promise`<[Voice](voice.md)[]>

**Returns:** `Promise`<[Voice](voice.md)[]>

___
<a id="isspeaking"></a>

###  isSpeaking

**● isSpeaking**: *`function`*

*Defined in [types/NativeSpeechModule.ts:93](https://github.com/ericlewis/react-native-speech/blob/6acb1ef/src/types/NativeSpeechModule.ts#L93)*

Wether or not we are currently playing audio or speaking from the native synth

#### Type declaration
▸(): `Promise`<`boolean`>

**Returns:** `Promise`<`boolean`>

___
<a id="playaudiocontent"></a>

###  playAudioContent

**● playAudioContent**: *`function`*

*Defined in [types/NativeSpeechModule.ts:72](https://github.com/ericlewis/react-native-speech/blob/6acb1ef/src/types/NativeSpeechModule.ts#L72)*

Play LINEAR16 audio encoded in base64

#### Type declaration
▸(base64AudioContent: *`string`*, utterance: *`string`*, options: *[SpeechOptions](speechoptions.md)*): `void`

**Parameters:**

| Name | Type |
| ------ | ------ |
| base64AudioContent | `string` |
| utterance | `string` |
| options | [SpeechOptions](speechoptions.md) |

**Returns:** `void`

___
<a id="speak"></a>

###  speak

**● speak**: *`function`*

*Defined in [types/NativeSpeechModule.ts:83](https://github.com/ericlewis/react-native-speech/blob/6acb1ef/src/types/NativeSpeechModule.ts#L83)*

Use the native synth to communicate

#### Type declaration
▸(utterance: *`string`*, options: *[SpeechOptions](speechoptions.md)*): `void`

**Parameters:**

| Name | Type |
| ------ | ------ |
| utterance | `string` |
| options | [SpeechOptions](speechoptions.md) |

**Returns:** `void`

___
<a id="stop"></a>

###  stop

**● stop**: *`function`*

*Defined in [types/NativeSpeechModule.ts:98](https://github.com/ericlewis/react-native-speech/blob/6acb1ef/src/types/NativeSpeechModule.ts#L98)*

Stops speaking/audio playback

#### Type declaration
▸(): `void`

**Returns:** `void`

___

## Methods

<a id="addsubscription"></a>

###  addSubscription

▸ **addSubscription**(eventType: *`string`*, subscription: *`EventSubscription`*): `EventSubscription`

*Inherited from EventSubscriptionVendor.addSubscription*

*Defined in /Users/ericlewis/Work/react-native-speech/node_modules/@types/react-native/index.d.ts:94*

Adds a subscription keyed by an event type.

**Parameters:**

| Name | Type |
| ------ | ------ |
| eventType | `string` |
| subscription | `EventSubscription` |

**Returns:** `EventSubscription`

___
<a id="constructor"></a>

###  constructor

▸ **constructor**(): `EventSubscriptionVendor`

*Inherited from EventSubscriptionVendor.constructor*

*Defined in /Users/ericlewis/Work/react-native-speech/node_modules/@types/react-native/index.d.ts:88*

**Returns:** `EventSubscriptionVendor`

___
<a id="getsubscriptionsfortype"></a>

###  getSubscriptionsForType

▸ **getSubscriptionsForType**(eventType: *`string`*): `EventSubscription`[]

*Inherited from EventSubscriptionVendor.getSubscriptionsForType*

*Defined in /Users/ericlewis/Work/react-native-speech/node_modules/@types/react-native/index.d.ts:119*

Returns the array of subscriptions that are currently registered for the given event type.

Note: This array can be potentially sparse as subscriptions are deleted from it when they are removed.

**Parameters:**

| Name | Type |
| ------ | ------ |
| eventType | `string` |

**Returns:** `EventSubscription`[]

___
<a id="removeallsubscriptions"></a>

###  removeAllSubscriptions

▸ **removeAllSubscriptions**(eventType?: *`undefined` \| `string`*): `void`

*Inherited from EventSubscriptionVendor.removeAllSubscriptions*

*Defined in /Users/ericlewis/Work/react-native-speech/node_modules/@types/react-native/index.d.ts:102*

Removes a bulk set of the subscriptions.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| `Optional` eventType | `undefined` \| `string` |  Optional name of the event type whose registered supscriptions to remove, if null remove all subscriptions. |

**Returns:** `void`

___
<a id="removesubscription"></a>

###  removeSubscription

▸ **removeSubscription**(subscription: *`any`*): `void`

*Inherited from EventSubscriptionVendor.removeSubscription*

*Defined in /Users/ericlewis/Work/react-native-speech/node_modules/@types/react-native/index.d.ts:109*

Removes a specific subscription. Instead of calling this function, call `subscription.remove()` directly.

**Parameters:**

| Name | Type |
| ------ | ------ |
| subscription | `any` |

**Returns:** `void`

___

