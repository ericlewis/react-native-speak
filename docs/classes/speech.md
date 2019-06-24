[react-native-speak-eel-test](../README.md) > [Speech](../classes/speech.md)

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

⊕ **new Speech**(providers?: *[Provider](provider.md)[]*, defaultProviderName?: *`undefined` \| `string`*): [Speech](speech.md)

*Defined in [index.ts:76](https://github.com/ericlewis/react-native-speak/blob/f509ee8/src/index.ts#L76)*

Creates a new instance of Speech Can optionally the name for default provider Note: You should not try to use multiple instances of this

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` providers | [Provider](provider.md)[] |
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

*Defined in [index.ts:70](https://github.com/ericlewis/react-native-speak/blob/f509ee8/src/index.ts#L70)*

Exported constants from native

___
<a id="events"></a>

###  events

**● events**: *`EventEmitter`* =  new NativeEventEmitter(RNSpeak)

*Implementation of [SpeechModuleInterface](../interfaces/speechmoduleinterface.md).[events](../interfaces/speechmoduleinterface.md#events)*

*Defined in [index.ts:65](https://github.com/ericlewis/react-native-speak/blob/f509ee8/src/index.ts#L65)*

Native event emitter

___
<a id="providermanager"></a>

### `<Private>` providerManager

**● providerManager**: *[ProviderManager](providermanager.md)*

*Defined in [index.ts:75](https://github.com/ericlewis/react-native-speak/blob/f509ee8/src/index.ts#L75)*

___
<a id="queue"></a>

### `<Private>` queue

**● queue**: *[Queue](queue.md)<[SpeechUtterance](../interfaces/speechutterance.md)>* =  new Queue<SpeechUtterance>()

*Defined in [index.ts:76](https://github.com/ericlewis/react-native-speak/blob/f509ee8/src/index.ts#L76)*

___

## Methods

<a id="fallback"></a>

### `<Private>` fallback

▸ **fallback**(originalError: *`Error`*, utterance: *`string`*, options: *[SpeechOptions](../interfaces/speechoptions.md)*): `void`

*Defined in [index.ts:229](https://github.com/ericlewis/react-native-speak/blob/f509ee8/src/index.ts#L229)*

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

*Defined in [index.ts:110](https://github.com/ericlewis/react-native-speak/blob/f509ee8/src/index.ts#L110)*

Returns the active providers name

**Returns:** `string`

___
<a id="getoutputs"></a>

###  getOutputs

▸ **getOutputs**(): `Promise`<`string`[]>

*Defined in [index.ts:96](https://github.com/ericlewis/react-native-speak/blob/f509ee8/src/index.ts#L96)*

Returns a list of available outputs in human readable format

**Returns:** `Promise`<`string`[]>

___
<a id="getproviders"></a>

###  getProviders

▸ **getProviders**(): `string`[]

*Defined in [index.ts:117](https://github.com/ericlewis/react-native-speak/blob/f509ee8/src/index.ts#L117)*

Returns a list of available provider names

**Returns:** `string`[]

___
<a id="getvoices"></a>

###  getVoices

▸ **getVoices**(): `Promise`<`any`>

*Defined in [index.ts:124](https://github.com/ericlewis/react-native-speak/blob/f509ee8/src/index.ts#L124)*

Returns a list of available voices for the current provider

**Returns:** `Promise`<`any`>

___
<a id="getvoicesforprovider"></a>

###  getVoicesForProvider

▸ **getVoicesForProvider**(name: *`string`*): `Promise`<`any`>

*Defined in [index.ts:131](https://github.com/ericlewis/react-native-speak/blob/f509ee8/src/index.ts#L131)*

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

*Defined in [index.ts:209](https://github.com/ericlewis/react-native-speak/blob/f509ee8/src/index.ts#L209)*

**Returns:** `void`

___
<a id="queuelistener"></a>

### `<Private>` queueListener

▸ **queueListener**(eventName: *[EventName](../#eventname)*, _: *`any`[]*, item?: *`any`*): `void`

*Defined in [index.ts:220](https://github.com/ericlewis/react-native-speak/blob/f509ee8/src/index.ts#L220)*

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

*Defined in [index.ts:103](https://github.com/ericlewis/react-native-speak/blob/f509ee8/src/index.ts#L103)*

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

*Defined in [index.ts:147](https://github.com/ericlewis/react-native-speak/blob/f509ee8/src/index.ts#L147)*

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

*Defined in [index.ts:169](https://github.com/ericlewis/react-native-speak/blob/f509ee8/src/index.ts#L169)*

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

*Defined in [index.ts:138](https://github.com/ericlewis/react-native-speak/blob/f509ee8/src/index.ts#L138)*

Stops speaking/audio playback

**Returns:** `void`

___

