[react-native-speech](../README.md) > [NativeSpeechModuleInterface](../interfaces/nativespeechmoduleinterface.md)

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
* [saveProviderAsDefault](nativespeechmoduleinterface.md#saveproviderasdefault)
* [speak](nativespeechmoduleinterface.md#speak)

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

*Defined in [NativeSpeechModule.ts:61](https://github.com/ericlewis/react-native-speech/blob/e5a34e4/src/NativeSpeechModule.ts#L61)*

#### Type declaration
▸(): [Constants](constants.md)

**Returns:** [Constants](constants.md)

___
<a id="getoutputs"></a>

###  getOutputs

**● getOutputs**: *`function`*

*Defined in [NativeSpeechModule.ts:72](https://github.com/ericlewis/react-native-speech/blob/e5a34e4/src/NativeSpeechModule.ts#L72)*

#### Type declaration
▸(): `Promise`<`string`[]>

**Returns:** `Promise`<`string`[]>

___
<a id="getvoices"></a>

###  getVoices

**● getVoices**: *`function`*

*Defined in [NativeSpeechModule.ts:82](https://github.com/ericlewis/react-native-speech/blob/e5a34e4/src/NativeSpeechModule.ts#L82)*

Get the native voices.

#### Type declaration
▸(): `Promise`<[Voice](voice.md)[]>

**Returns:** `Promise`<[Voice](voice.md)[]>

___
<a id="isspeaking"></a>

###  isSpeaking

**● isSpeaking**: *`function`*

*Defined in [NativeSpeechModule.ts:92](https://github.com/ericlewis/react-native-speech/blob/e5a34e4/src/NativeSpeechModule.ts#L92)*

Wether or not we are currently playing audio or speaking from the native synth

#### Type declaration
▸(): `boolean`

**Returns:** `boolean`

___
<a id="playaudiocontent"></a>

###  playAudioContent

**● playAudioContent**: *`function`*

*Defined in [NativeSpeechModule.ts:66](https://github.com/ericlewis/react-native-speech/blob/e5a34e4/src/NativeSpeechModule.ts#L66)*

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
<a id="saveproviderasdefault"></a>

###  saveProviderAsDefault

**● saveProviderAsDefault**: *`function`*

*Defined in [NativeSpeechModule.ts:87](https://github.com/ericlewis/react-native-speech/blob/e5a34e4/src/NativeSpeechModule.ts#L87)*

Persists the provider, will be used at next launch

#### Type declaration
▸(name: *`string`*): `void`

**Parameters:**

| Name | Type |
| ------ | ------ |
| name | `string` |

**Returns:** `void`

___
<a id="speak"></a>

###  speak

**● speak**: *`function`*

*Defined in [NativeSpeechModule.ts:77](https://github.com/ericlewis/react-native-speech/blob/e5a34e4/src/NativeSpeechModule.ts#L77)*

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

