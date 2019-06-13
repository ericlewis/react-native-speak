[react-native-speech-eel-test](../README.md) > [NativeProvider](../classes/nativeprovider.md)

# Class: NativeProvider

Native speech synth provider It is the simplest provider, with no audioContent

## Hierarchy

 [Provider](provider.md)

**↳ NativeProvider**

## Implements

* [ProviderInterface](../interfaces/providerinterface.md)

## Index

### Constructors

* [constructor](nativeprovider.md#constructor)

### Properties

* [accessToken](nativeprovider.md#accesstoken)
* [native](nativeprovider.md#native)
* [baseURL](nativeprovider.md#baseurl)

### Methods

* [getAudioContent](nativeprovider.md#getaudiocontent)
* [getBaseURL](nativeprovider.md#getbaseurl)
* [getClassName](nativeprovider.md#getclassname)
* [getSSML](nativeprovider.md#getssml)
* [getVoiceIdSlug](nativeprovider.md#getvoiceidslug)
* [getVoices](nativeprovider.md#getvoices)
* [isEqualToProvider](nativeprovider.md#isequaltoprovider)
* [isValidVoiceId](nativeprovider.md#isvalidvoiceid)
* [optionsCompatible](nativeprovider.md#optionscompatible)
* [playAudioContent](nativeprovider.md#playaudiocontent)
* [sluggifyVoiceId](nativeprovider.md#sluggifyvoiceid)
* [speak](nativeprovider.md#speak)
* [stripVoiceIdSlug](nativeprovider.md#stripvoiceidslug)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new NativeProvider**(accessToken: *`string` \| `null`*): [NativeProvider](nativeprovider.md)

*Inherited from [Provider](provider.md).[constructor](provider.md#constructor)*

*Defined in [providers/BaseProvider.ts:18](https://github.com/ericlewis/react-native-speech/blob/f509ee8/src/providers/BaseProvider.ts#L18)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| accessToken | `string` \| `null` |

**Returns:** [NativeProvider](nativeprovider.md)

___

## Properties

<a id="accesstoken"></a>

### `<Protected>` accessToken

**● accessToken**: *`string` \| `null`*

*Inherited from [Provider](provider.md).[accessToken](provider.md#accesstoken)*

*Defined in [providers/BaseProvider.ts:17](https://github.com/ericlewis/react-native-speech/blob/f509ee8/src/providers/BaseProvider.ts#L17)*

___
<a id="native"></a>

### `<Protected>` native

**● native**: *[NativeSpeechModuleInterface](../interfaces/nativespeechmoduleinterface.md)* =  RNSpeech

*Inherited from [Provider](provider.md).[native](provider.md#native)*

*Defined in [providers/BaseProvider.ts:18](https://github.com/ericlewis/react-native-speech/blob/f509ee8/src/providers/BaseProvider.ts#L18)*

___
<a id="baseurl"></a>

### `<Static>``<Protected>` baseURL

**● baseURL**: *`string`*

*Inherited from [Provider](provider.md).[baseURL](provider.md#baseurl)*

*Defined in [providers/BaseProvider.ts:16](https://github.com/ericlewis/react-native-speech/blob/f509ee8/src/providers/BaseProvider.ts#L16)*

___

## Methods

<a id="getaudiocontent"></a>

### `<Optional>` getAudioContent

▸ **getAudioContent**(utterance: *`string`*, options: *[SpeechOptions](../interfaces/speechoptions.md)*): `Promise`<`any`>

*Inherited from [Provider](provider.md).[getAudioContent](provider.md#getaudiocontent)*

*Defined in [providers/BaseProvider.ts:26](https://github.com/ericlewis/react-native-speech/blob/f509ee8/src/providers/BaseProvider.ts#L26)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| utterance | `string` |
| options | [SpeechOptions](../interfaces/speechoptions.md) |

**Returns:** `Promise`<`any`>

___
<a id="getbaseurl"></a>

### `<Protected>` getBaseURL

▸ **getBaseURL**(endpoint: *`string`*): `string`

*Inherited from [Provider](provider.md).[getBaseURL](provider.md#getbaseurl)*

*Defined in [providers/BaseProvider.ts:119](https://github.com/ericlewis/react-native-speech/blob/f509ee8/src/providers/BaseProvider.ts#L119)*

Convenience method for request URL

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| endpoint | `string` |   |

**Returns:** `string`

___
<a id="getclassname"></a>

###  getClassName

▸ **getClassName**(): `string`

*Inherited from [Provider](provider.md).[getClassName](provider.md#getclassname)*

*Defined in [providers/BaseProvider.ts:50](https://github.com/ericlewis/react-native-speech/blob/f509ee8/src/providers/BaseProvider.ts#L50)*

Convenience method for getting the class name we use this as a UUID essentially

**Returns:** `string`

___
<a id="getssml"></a>

### `<Protected>` getSSML

▸ **getSSML**(utterance: *`string`*, options: *[SpeechOptions](../interfaces/speechoptions.md)*): `string`

*Inherited from [Provider](provider.md).[getSSML](provider.md#getssml)*

*Defined in [providers/BaseProvider.ts:130](https://github.com/ericlewis/react-native-speech/blob/f509ee8/src/providers/BaseProvider.ts#L130)*

Generate's an SSML wrapped utterance string based on the options provided SSML is fairly standardized (w3c) so we shouldn't have too much trouble with basic wrapping for adjustments.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| utterance | `string` |  \- |
| options | [SpeechOptions](../interfaces/speechoptions.md) |   |

**Returns:** `string`

___
<a id="getvoiceidslug"></a>

### `<Protected>` getVoiceIdSlug

▸ **getVoiceIdSlug**(): `string`

*Inherited from [Provider](provider.md).[getVoiceIdSlug](provider.md#getvoiceidslug)*

*Defined in [providers/BaseProvider.ts:86](https://github.com/ericlewis/react-native-speech/blob/f509ee8/src/providers/BaseProvider.ts#L86)*

VoiceId prefix, used to ensure we aren't accidentally setting voiceId's that can't work with a provider

**Returns:** `string`

___
<a id="getvoices"></a>

###  getVoices

▸ **getVoices**(): `Promise`<[Voice](../interfaces/voice.md)[]>

*Overrides [Provider](provider.md).[getVoices](provider.md#getvoices)*

*Defined in [providers/NativeProvider.ts:9](https://github.com/ericlewis/react-native-speech/blob/f509ee8/src/providers/NativeProvider.ts#L9)*

**Returns:** `Promise`<[Voice](../interfaces/voice.md)[]>

___
<a id="isequaltoprovider"></a>

###  isEqualToProvider

▸ **isEqualToProvider**(provider: *[Provider](provider.md)*): `boolean`

*Inherited from [Provider](provider.md).[isEqualToProvider](provider.md#isequaltoprovider)*

*Defined in [providers/BaseProvider.ts:58](https://github.com/ericlewis/react-native-speech/blob/f509ee8/src/providers/BaseProvider.ts#L58)*

Check if this provider is the same as the one passed

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| provider | [Provider](provider.md) |   |

**Returns:** `boolean`

___
<a id="isvalidvoiceid"></a>

### `<Protected>` isValidVoiceId

▸ **isValidVoiceId**(voiceId: *`string`*): `boolean`

*Inherited from [Provider](provider.md).[isValidVoiceId](provider.md#isvalidvoiceid)*

*Defined in [providers/BaseProvider.ts:102](https://github.com/ericlewis/react-native-speech/blob/f509ee8/src/providers/BaseProvider.ts#L102)*

Verify the voiceId

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| voiceId | `string` |   |

**Returns:** `boolean`

___
<a id="optionscompatible"></a>

###  optionsCompatible

▸ **optionsCompatible**(options: *[SpeechOptions](../interfaces/speechoptions.md)*): `void`

*Inherited from [Provider](provider.md).[optionsCompatible](provider.md#optionscompatible)*

*Defined in [providers/BaseProvider.ts:66](https://github.com/ericlewis/react-native-speech/blob/f509ee8/src/providers/BaseProvider.ts#L66)*

Check if the options are compatible with the provider Mostly a precheck to ensure that we have no problems with voiceId

**Parameters:**

| Name | Type |
| ------ | ------ |
| options | [SpeechOptions](../interfaces/speechoptions.md) |

**Returns:** `void`

___
<a id="playaudiocontent"></a>

###  playAudioContent

▸ **playAudioContent**(content: *`string`*, utterance: *`string`*, options: *[SpeechOptions](../interfaces/speechoptions.md)*): `void`

*Inherited from [Provider](provider.md).[playAudioContent](provider.md#playaudiocontent)*

*Defined in [providers/BaseProvider.ts:38](https://github.com/ericlewis/react-native-speech/blob/f509ee8/src/providers/BaseProvider.ts#L38)*

Plays a base64 encoded string on the native platform

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| content | `string` |  base64 encoded string |
| utterance | `string` |
| options | [SpeechOptions](../interfaces/speechoptions.md) |   |

**Returns:** `void`

___
<a id="sluggifyvoiceid"></a>

### `<Protected>` sluggifyVoiceId

▸ **sluggifyVoiceId**(voiceId: *`string`*): `string`

*Inherited from [Provider](provider.md).[sluggifyVoiceId](provider.md#sluggifyvoiceid)*

*Defined in [providers/BaseProvider.ts:93](https://github.com/ericlewis/react-native-speech/blob/f509ee8/src/providers/BaseProvider.ts#L93)*

Adds slug to voiceId, ignores if the slug has already been added

**Parameters:**

| Name | Type |
| ------ | ------ |
| voiceId | `string` |

**Returns:** `string`

___
<a id="speak"></a>

###  speak

▸ **speak**(utterance: *`string`*, options: *[SpeechOptions](../interfaces/speechoptions.md)*): `void`

*Overrides [Provider](provider.md).[speak](provider.md#speak)*

*Defined in [providers/NativeProvider.ts:17](https://github.com/ericlewis/react-native-speech/blob/f509ee8/src/providers/NativeProvider.ts#L17)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| utterance | `string` |
| options | [SpeechOptions](../interfaces/speechoptions.md) |

**Returns:** `void`

___
<a id="stripvoiceidslug"></a>

### `<Protected>` stripVoiceIdSlug

▸ **stripVoiceIdSlug**(voiceId: *`string`*): `string`

*Inherited from [Provider](provider.md).[stripVoiceIdSlug](provider.md#stripvoiceidslug)*

*Defined in [providers/BaseProvider.ts:110](https://github.com/ericlewis/react-native-speech/blob/f509ee8/src/providers/BaseProvider.ts#L110)*

String the voiceId slug, also enforces correctness

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| voiceId | `string` |   |

**Returns:** `string`

___

