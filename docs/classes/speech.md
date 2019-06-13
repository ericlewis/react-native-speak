[react-native-speech-eel-test](../README.md) > [Speech](../classes/speech.md)

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

⊕ **new Speech**(providers?: *[Provider](provider.md)[]*): [Speech](speech.md)

*Defined in [index.ts:76](https://github.com/ericlewis/react-native-speech/blob/2b63c1d/src/index.ts#L76)*

Creates a new instance of Speech Note: You should not try to use multiple instances of this

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` providers | [Provider](provider.md)[] |

**Returns:** [Speech](speech.md)

___

## Properties

<a id="constants"></a>

###  constants

**● constants**: *[Constants](../interfaces/constants.md)* = 
    Platform.OS === 'ios'
      ? RNSpeech.getConstants()
      : ((RNSpeech as unknown) as Constants)

*Defined in [index.ts:70](https://github.com/ericlewis/react-native-speech/blob/2b63c1d/src/index.ts#L70)*

Exported constants from native

___
<a id="events"></a>

###  events

**● events**: *`EventEmitter`* =  new NativeEventEmitter(RNSpeech)

*Implementation of [SpeechModuleInterface](../interfaces/speechmoduleinterface.md).[events](../interfaces/speechmoduleinterface.md#events)*

*Defined in [index.ts:65](https://github.com/ericlewis/react-native-speech/blob/2b63c1d/src/index.ts#L65)*

Native event emitter

___
<a id="providermanager"></a>

### `<Private>` providerManager

**● providerManager**: *[ProviderManager](providermanager.md)*

*Defined in [index.ts:75](https://github.com/ericlewis/react-native-speech/blob/2b63c1d/src/index.ts#L75)*

___
<a id="queue"></a>

### `<Private>` queue

**● queue**: *[Queue](queue.md)<[SpeechUtterance](../interfaces/speechutterance.md)>* =  new Queue<SpeechUtterance>()

*Defined in [index.ts:76](https://github.com/ericlewis/react-native-speech/blob/2b63c1d/src/index.ts#L76)*

___

## Methods

<a id="fallback"></a>

### `<Private>` fallback

▸ **fallback**(originalError: *`Error`*, utterance: *`string`*, options: *[SpeechOptions](../interfaces/speechoptions.md)*): `void`

*Defined in [index.ts:228](https://github.com/ericlewis/react-native-speech/blob/2b63c1d/src/index.ts#L228)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| originalError | `Error` |
| utterance | `string` |
| options | [SpeechOptions](../interfaces/speechoptions.md) |

**Returns:** `void`

___
<a id="getcurrentprovider"></a>

###  getCurrentProvider

▸ **getCurrentProvider**(): `string`

*Defined in [index.ts:109](https://github.com/ericlewis/react-native-speech/blob/2b63c1d/src/index.ts#L109)*

Returns the active providers name

**Returns:** `string`

___
<a id="getoutputs"></a>

###  getOutputs

▸ **getOutputs**(): `Promise`<`string`[]>

*Defined in [index.ts:95](https://github.com/ericlewis/react-native-speech/blob/2b63c1d/src/index.ts#L95)*

Returns a list of available outputs in human readable format

**Returns:** `Promise`<`string`[]>

___
<a id="getproviders"></a>

###  getProviders

▸ **getProviders**(): `string`[]

*Defined in [index.ts:116](https://github.com/ericlewis/react-native-speech/blob/2b63c1d/src/index.ts#L116)*

Returns a list of available provider names

**Returns:** `string`[]

___
<a id="getvoices"></a>

###  getVoices

▸ **getVoices**(): `Promise`<`any`>

*Defined in [index.ts:123](https://github.com/ericlewis/react-native-speech/blob/2b63c1d/src/index.ts#L123)*

Returns a list of available voices for the current provider

**Returns:** `Promise`<`any`>

___
<a id="getvoicesforprovider"></a>

###  getVoicesForProvider

▸ **getVoicesForProvider**(name: *`string`*): `Promise`<`any`>

*Defined in [index.ts:130](https://github.com/ericlewis/react-native-speech/blob/2b63c1d/src/index.ts#L130)*

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

*Defined in [index.ts:208](https://github.com/ericlewis/react-native-speech/blob/2b63c1d/src/index.ts#L208)*

**Returns:** `void`

___
<a id="queuelistener"></a>

### `<Private>` queueListener

▸ **queueListener**(eventName: *[EventName](../#eventname)*, _: *`any`[]*, item?: *`any`*): `void`

*Defined in [index.ts:219](https://github.com/ericlewis/react-native-speech/blob/2b63c1d/src/index.ts#L219)*

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

*Defined in [index.ts:102](https://github.com/ericlewis/react-native-speech/blob/2b63c1d/src/index.ts#L102)*

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

*Defined in [index.ts:146](https://github.com/ericlewis/react-native-speech/blob/2b63c1d/src/index.ts#L146)*

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

▸ **speakWithProvider**(provider: *[Provider](provider.md)*, utterance: *`string`*, options: *[SpeechOptions](../interfaces/speechoptions.md)*): `Promise`<`void`>

*Defined in [index.ts:168](https://github.com/ericlewis/react-native-speech/blob/2b63c1d/src/index.ts#L168)*

Use an arbitrary provider to speak protected so you can extend this class and use it however you like

**Parameters:**

| Name | Type |
| ------ | ------ |
| provider | [Provider](provider.md) |
| utterance | `string` |
| options | [SpeechOptions](../interfaces/speechoptions.md) |

**Returns:** `Promise`<`void`>

___
<a id="stop"></a>

###  stop

▸ **stop**(): `void`

*Defined in [index.ts:137](https://github.com/ericlewis/react-native-speech/blob/2b63c1d/src/index.ts#L137)*

Stops speaking/audio playback

**Returns:** `void`

___

