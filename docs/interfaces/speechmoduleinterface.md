[react-native-speak](../README.md) > [SpeechModuleInterface](../interfaces/speechmoduleinterface.md)

# Interface: SpeechModuleInterface

The interface for the JS Module

## Hierarchy

**SpeechModuleInterface**

## Implemented by

* [Speech](../classes/speech.md)

## Index

### Properties

* [events](speechmoduleinterface.md#events)
* [getCurrentProvider](speechmoduleinterface.md#getcurrentprovider)
* [getOutputs](speechmoduleinterface.md#getoutputs)
* [getProviders](speechmoduleinterface.md#getproviders)
* [getVoices](speechmoduleinterface.md#getvoices)
* [getVoicesForProvider](speechmoduleinterface.md#getvoicesforprovider)
* [setCurrentProvider](speechmoduleinterface.md#setcurrentprovider)
* [speak](speechmoduleinterface.md#speak)

---

## Properties

<a id="events"></a>

###  events

**● events**: *`NativeEventEmitter`*

*Defined in [index.ts:14](https://github.com/ericlewis/react-native-speech/blob/6acb1ef/src/index.ts#L14)*

___
<a id="getcurrentprovider"></a>

###  getCurrentProvider

**● getCurrentProvider**: *`function`*

*Defined in [index.ts:44](https://github.com/ericlewis/react-native-speech/blob/6acb1ef/src/index.ts#L44)*

Returns the active providers name

#### Type declaration
▸(): `string`

**Returns:** `string`

___
<a id="getoutputs"></a>

###  getOutputs

**● getOutputs**: *`function`*

*Defined in [index.ts:19](https://github.com/ericlewis/react-native-speech/blob/6acb1ef/src/index.ts#L19)*

Returns a list of available outputs in human readable format

#### Type declaration
▸(key: *`string`*): `Promise`<`string`[]>

**Parameters:**

| Name | Type |
| ------ | ------ |
| key | `string` |

**Returns:** `Promise`<`string`[]>

___
<a id="getproviders"></a>

###  getProviders

**● getProviders**: *`function`*

*Defined in [index.ts:49](https://github.com/ericlewis/react-native-speech/blob/6acb1ef/src/index.ts#L49)*

Returns a list of available provider names

#### Type declaration
▸(): `string`[]

**Returns:** `string`[]

___
<a id="getvoices"></a>

###  getVoices

**● getVoices**: *`function`*

*Defined in [index.ts:24](https://github.com/ericlewis/react-native-speech/blob/6acb1ef/src/index.ts#L24)*

Returns a list of available voices for the current provider

#### Type declaration
▸(key: *`string`*): `Promise`<[Voice](voice.md)[]>

**Parameters:**

| Name | Type |
| ------ | ------ |
| key | `string` |

**Returns:** `Promise`<[Voice](voice.md)[]>

___
<a id="getvoicesforprovider"></a>

###  getVoicesForProvider

**● getVoicesForProvider**: *`function`*

*Defined in [index.ts:29](https://github.com/ericlewis/react-native-speech/blob/6acb1ef/src/index.ts#L29)*

Returns a list of available voices for a given providers name

#### Type declaration
▸(name: *`string`*): `Promise`<[Voice](voice.md)[]>

**Parameters:**

| Name | Type |
| ------ | ------ |
| name | `string` |

**Returns:** `Promise`<[Voice](voice.md)[]>

___
<a id="setcurrentprovider"></a>

###  setCurrentProvider

**● setCurrentProvider**: *`function`*

*Defined in [index.ts:39](https://github.com/ericlewis/react-native-speech/blob/6acb1ef/src/index.ts#L39)*

Sets the active provider (persisted across launches)

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

*Defined in [index.ts:34](https://github.com/ericlewis/react-native-speech/blob/6acb1ef/src/index.ts#L34)*

Convenience method for fetching & playing a given utterance

#### Type declaration
▸(utterance: *`string`*, options: *[SpeechOptions](speechoptions.md)*): `Promise`<`any`>

**Parameters:**

| Name | Type |
| ------ | ------ |
| utterance | `string` |
| options | [SpeechOptions](speechoptions.md) |

**Returns:** `Promise`<`any`>

___

