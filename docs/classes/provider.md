[react-native-speech-eel-test](../README.md) > [Provider](../classes/provider.md)

# Class: Provider

## Hierarchy

**Provider**

↳  [GoogleProvider](googleprovider.md)

↳  [NativeProvider](nativeprovider.md)

↳  [PollyProvider](pollyprovider.md)

## Implements

* [ProviderInterface](../interfaces/providerinterface.md)

## Index

### Constructors

* [constructor](provider.md#constructor)

### Properties

* [accessToken](provider.md#accesstoken)
* [native](provider.md#native)
* [baseURL](provider.md#baseurl)

### Methods

* [getAudioContent](provider.md#getaudiocontent)
* [getBaseURL](provider.md#getbaseurl)
* [getClassName](provider.md#getclassname)
* [getSSML](provider.md#getssml)
* [getVoiceIdSlug](provider.md#getvoiceidslug)
* [getVoices](provider.md#getvoices)
* [isEqualToProvider](provider.md#isequaltoprovider)
* [isValidVoiceId](provider.md#isvalidvoiceid)
* [optionsCompatible](provider.md#optionscompatible)
* [playAudioContent](provider.md#playaudiocontent)
* [sluggifyVoiceId](provider.md#sluggifyvoiceid)
* [speak](provider.md#speak)
* [stripVoiceIdSlug](provider.md#stripvoiceidslug)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new Provider**(accessToken: *`string` \| `null`*): [Provider](provider.md)

*Defined in [providers/BaseProvider.ts:18](https://github.com/ericlewis/react-native-speech/blob/f509ee8/src/providers/BaseProvider.ts#L18)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| accessToken | `string` \| `null` |

**Returns:** [Provider](provider.md)

___

## Properties

<a id="accesstoken"></a>

### `<Protected>` accessToken

**● accessToken**: *`string` \| `null`*

*Defined in [providers/BaseProvider.ts:17](https://github.com/ericlewis/react-native-speech/blob/f509ee8/src/providers/BaseProvider.ts#L17)*

___
<a id="native"></a>

### `<Protected>` native

**● native**: *[NativeSpeechModuleInterface](../interfaces/nativespeechmoduleinterface.md)* =  RNSpeak

*Defined in [providers/BaseProvider.ts:18](https://github.com/ericlewis/react-native-speech/blob/f509ee8/src/providers/BaseProvider.ts#L18)*

___
<a id="baseurl"></a>

### `<Static>``<Protected>` baseURL

**● baseURL**: *`string`*

*Defined in [providers/BaseProvider.ts:16](https://github.com/ericlewis/react-native-speech/blob/f509ee8/src/providers/BaseProvider.ts#L16)*

___

## Methods

<a id="getaudiocontent"></a>

### `<Optional>` getAudioContent

▸ **getAudioContent**(utterance: *`string`*, options: *[SpeechOptions](../interfaces/speechoptions.md)*): `Promise`<`any`>

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

*Defined in [providers/BaseProvider.ts:50](https://github.com/ericlewis/react-native-speech/blob/f509ee8/src/providers/BaseProvider.ts#L50)*

Convenience method for getting the class name we use this as a UUID essentially

**Returns:** `string`

___
<a id="getssml"></a>

### `<Protected>` getSSML

▸ **getSSML**(utterance: *`string`*, options: *[SpeechOptions](../interfaces/speechoptions.md)*): `string`

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

*Defined in [providers/BaseProvider.ts:86](https://github.com/ericlewis/react-native-speech/blob/f509ee8/src/providers/BaseProvider.ts#L86)*

VoiceId prefix, used to ensure we aren't accidentally setting voiceId's that can't work with a provider

**Returns:** `string`

___
<a id="getvoices"></a>

### `<Abstract>` getVoices

▸ **getVoices**(): `Promise`<`any`>

*Defined in [providers/BaseProvider.ts:24](https://github.com/ericlewis/react-native-speech/blob/f509ee8/src/providers/BaseProvider.ts#L24)*

**Returns:** `Promise`<`any`>

___
<a id="isequaltoprovider"></a>

###  isEqualToProvider

▸ **isEqualToProvider**(provider: *[Provider](provider.md)*): `boolean`

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

*Defined in [providers/BaseProvider.ts:93](https://github.com/ericlewis/react-native-speech/blob/f509ee8/src/providers/BaseProvider.ts#L93)*

Adds slug to voiceId, ignores if the slug has already been added

**Parameters:**

| Name | Type |
| ------ | ------ |
| voiceId | `string` |

**Returns:** `string`

___
<a id="speak"></a>

### `<Optional>` speak

▸ **speak**(utterance: *`string`*, options: *[SpeechOptions](../interfaces/speechoptions.md)*): `void`

*Defined in [providers/BaseProvider.ts:31](https://github.com/ericlewis/react-native-speech/blob/f509ee8/src/providers/BaseProvider.ts#L31)*

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

*Defined in [providers/BaseProvider.ts:110](https://github.com/ericlewis/react-native-speech/blob/f509ee8/src/providers/BaseProvider.ts#L110)*

String the voiceId slug, also enforces correctness

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| voiceId | `string` |   |

**Returns:** `string`

___

