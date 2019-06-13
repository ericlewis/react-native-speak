[react-native-speech-eel-test](../README.md) > [ProviderInterface](../interfaces/providerinterface.md)

# Interface: ProviderInterface

## Hierarchy

**ProviderInterface**

## Implemented by

* [GoogleProvider](../classes/googleprovider.md)
* [NativeProvider](../classes/nativeprovider.md)
* [PollyProvider](../classes/pollyprovider.md)
* [Provider](../classes/provider.md)

## Index

### Properties

* [getAudioContent](providerinterface.md#getaudiocontent)
* [getVoices](providerinterface.md#getvoices)
* [playAudioContent](providerinterface.md#playaudiocontent)
* [speak](providerinterface.md#speak)

---

## Properties

<a id="getaudiocontent"></a>

### `<Optional>` getAudioContent

**● getAudioContent**: *`undefined` \| `function`*

*Defined in [providers/BaseProvider.ts:6](https://github.com/ericlewis/react-native-speech/blob/f509ee8/src/providers/BaseProvider.ts#L6)*

___
<a id="getvoices"></a>

###  getVoices

**● getVoices**: *`function`*

*Defined in [providers/BaseProvider.ts:5](https://github.com/ericlewis/react-native-speech/blob/f509ee8/src/providers/BaseProvider.ts#L5)*

#### Type declaration
▸(): `Promise`<[Voice](voice.md)[]>

**Returns:** `Promise`<[Voice](voice.md)[]>

___
<a id="playaudiocontent"></a>

###  playAudioContent

**● playAudioContent**: *`function`*

*Defined in [providers/BaseProvider.ts:7](https://github.com/ericlewis/react-native-speech/blob/f509ee8/src/providers/BaseProvider.ts#L7)*

#### Type declaration
▸(content: *`string`*, utterance: *`string`*, options: *[SpeechOptions](speechoptions.md)*): `void`

**Parameters:**

| Name | Type |
| ------ | ------ |
| content | `string` |
| utterance | `string` |
| options | [SpeechOptions](speechoptions.md) |

**Returns:** `void`

___
<a id="speak"></a>

### `<Optional>` speak

**● speak**: *`undefined` \| `function`*

*Defined in [providers/BaseProvider.ts:12](https://github.com/ericlewis/react-native-speech/blob/f509ee8/src/providers/BaseProvider.ts#L12)*

___

