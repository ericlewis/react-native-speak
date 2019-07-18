[react-native-speak](../README.md) > [Speech](../classes/speech.md)

# Class: Speech

## Hierarchy

**Speech**

## Implements

* [SpeechModuleInterface](../interfaces/speechmoduleinterface.md)

## Index

### Constructors

* [constructor](speech.md#constructor)

### Properties

* [constants](speech.md#constants)
* [events](speech.md#events)
* [providerManager](speech.md#providermanager)
* [queue](speech.md#queue)

### Methods

* [fallback](speech.md#fallback)
* [getCurrentProvider](speech.md#getcurrentprovider)
* [getOutputs](speech.md#getoutputs)
* [getProviders](speech.md#getproviders)
* [getVoices](speech.md#getvoices)
* [getVoicesForProvider](speech.md#getvoicesforprovider)
* [playbackEndedListener](speech.md#playbackendedlistener)
* [queueListener](speech.md#queuelistener)
* [setCurrentProvider](speech.md#setcurrentprovider)
* [speak](speech.md#speak)
* [speakWithProvider](speech.md#speakwithprovider)
* [stop](speech.md#stop)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new Speech**(providers?: *`Provider`[]*, defaultProviderName?: *`undefined` \| `string`*): [Speech](speech.md)

*Defined in [index.ts:73](https://github.com/ericlewis/react-native-speech/blob/30f561b/src/index.ts#L73)*

Creates a new instance of Speech Can optionally the name for default provider Note: You should not try to use multiple instances of this

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` providers | `Provider`[] |
| `Optional` defaultProviderName | `undefined` \| `string` |

**Returns:** [Speech](speech.md)

___

## Properties

<a id="constants"></a>

###  constants

**● constants**: *[Constants](../interfaces/constants.md)* = 
    Platform.OS === 'ios'
      ? RNSpeak.getConstants()
      : ((RNSpeak as unknown) as Constants)

*Defined in [index.ts:67](https://github.com/ericlewis/react-native-speech/blob/30f561b/src/index.ts#L67)*

Exported constants from native

___
<a id="events"></a>

###  events

**● events**: *`EventEmitter`* =  new NativeEventEmitter(RNSpeak)

*Implementation of [SpeechModuleInterface](../interfaces/speechmoduleinterface.md).[events](../interfaces/speechmoduleinterface.md#events)*

*Defined in [index.ts:62](https://github.com/ericlewis/react-native-speech/blob/30f561b/src/index.ts#L62)*

Native event emitter

___
<a id="providermanager"></a>

### `<Private>` providerManager

**● providerManager**: *[ProviderManager](providermanager.md)*

*Defined in [index.ts:72](https://github.com/ericlewis/react-native-speech/blob/30f561b/src/index.ts#L72)*

___
<a id="queue"></a>

### `<Private>` queue

**● queue**: *[Queue](queue.md)<[SpeechUtterance](../interfaces/speechutterance.md)>* =  new Queue<SpeechUtterance>()

*Defined in [index.ts:73](https://github.com/ericlewis/react-native-speech/blob/30f561b/src/index.ts#L73)*

___

## Methods

<a id="fallback"></a>

### `<Private>` fallback

▸ **fallback**(originalError: *`Error`*, utterance: *`string`*, options: *[SpeechOptions](../interfaces/speechoptions.md)*): `any`

*Defined in [index.ts:234](https://github.com/ericlewis/react-native-speech/blob/30f561b/src/index.ts#L234)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| originalError | `Error` |
| utterance | `string` |
| options | [SpeechOptions](../interfaces/speechoptions.md) |

**Returns:** `any`

___
<a id="getcurrentprovider"></a>

###  getCurrentProvider

▸ **getCurrentProvider**(): `string`

*Defined in [index.ts:107](https://github.com/ericlewis/react-native-speech/blob/30f561b/src/index.ts#L107)*

Returns the active providers name

**Returns:** `string`

___
<a id="getoutputs"></a>

###  getOutputs

▸ **getOutputs**(): `Promise`<`string`[]>

*Defined in [index.ts:93](https://github.com/ericlewis/react-native-speech/blob/30f561b/src/index.ts#L93)*

Returns a list of available outputs in human readable format

**Returns:** `Promise`<`string`[]>

___
<a id="getproviders"></a>

###  getProviders

▸ **getProviders**(): `string`[]

*Defined in [index.ts:114](https://github.com/ericlewis/react-native-speech/blob/30f561b/src/index.ts#L114)*

Returns a list of available provider names

**Returns:** `string`[]

___
<a id="getvoices"></a>

###  getVoices

▸ **getVoices**(): `Promise`<`any`>

*Defined in [index.ts:121](https://github.com/ericlewis/react-native-speech/blob/30f561b/src/index.ts#L121)*

Returns a list of available voices for the current provider

**Returns:** `Promise`<`any`>

___
<a id="getvoicesforprovider"></a>

###  getVoicesForProvider

▸ **getVoicesForProvider**(name: *`string`*): `Promise`<`any`>

*Defined in [index.ts:128](https://github.com/ericlewis/react-native-speech/blob/30f561b/src/index.ts#L128)*

Returns a list of available voices for a given providers name

**Parameters:**

| Name | Type |
| ------ | ------ |
| name | `string` |

**Returns:** `Promise`<`any`>

___
<a id="playbackendedlistener"></a>

### `<Private>` playbackEndedListener

▸ **playbackEndedListener**(): `void`

*Defined in [index.ts:214](https://github.com/ericlewis/react-native-speech/blob/30f561b/src/index.ts#L214)*

**Returns:** `void`

___
<a id="queuelistener"></a>

### `<Private>` queueListener

▸ **queueListener**(eventName: *[EventName](../#eventname)*, _: *`any`[]*, item?: *`any`*): `void`

*Defined in [index.ts:225](https://github.com/ericlewis/react-native-speech/blob/30f561b/src/index.ts#L225)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| eventName | [EventName](../#eventname) |
| _ | `any`[] |
| `Optional` item | `any` |

**Returns:** `void`

___
<a id="setcurrentprovider"></a>

###  setCurrentProvider

▸ **setCurrentProvider**(name: *`string`*): `void`

*Defined in [index.ts:100](https://github.com/ericlewis/react-native-speech/blob/30f561b/src/index.ts#L100)*

Sets the active provider (persisted across launches)

**Parameters:**

| Name | Type |
| ------ | ------ |
| name | `string` |

**Returns:** `void`

___
<a id="speak"></a>

###  speak

▸ **speak**(utterance: *`string` \| `string`[]*, options?: *[SpeechOptions](../interfaces/speechoptions.md)*): `Promise`<`void`>

*Defined in [index.ts:144](https://github.com/ericlewis/react-native-speech/blob/30f561b/src/index.ts#L144)*

Note: speakInstantly option is ignored if you add a batch of utterances

**Parameters:**

| Name | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| utterance | `string` \| `string`[] | - |  \- |
| `Default value` options | [SpeechOptions](../interfaces/speechoptions.md) |  {} |   |

**Returns:** `Promise`<`void`>

___
<a id="speakwithprovider"></a>

### `<Protected>` speakWithProvider

▸ **speakWithProvider**(provider: *`Provider`*, utterance: *`string`*, options: *[SpeechOptions](../interfaces/speechoptions.md)*): `Promise`<`any`>

*Defined in [index.ts:166](https://github.com/ericlewis/react-native-speech/blob/30f561b/src/index.ts#L166)*

Use an arbitrary provider to speak protected so you can extend this class and use it however you like

**Parameters:**

| Name | Type |
| ------ | ------ |
| provider | `Provider` |
| utterance | `string` |
| options | [SpeechOptions](../interfaces/speechoptions.md) |

**Returns:** `Promise`<`any`>

___
<a id="stop"></a>

###  stop

▸ **stop**(): `void`

*Defined in [index.ts:135](https://github.com/ericlewis/react-native-speech/blob/30f561b/src/index.ts#L135)*

Stops speaking/audio playback

**Returns:** `void`

___

