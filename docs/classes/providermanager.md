[react-native-speech](../README.md) > [ProviderManager](../classes/providermanager.md)

# Class: ProviderManager

## Hierarchy

**ProviderManager**

## Index

### Constructors

* [constructor](providermanager.md#constructor)

### Properties

* [currentProvider](providermanager.md#currentprovider)
* [nativeProvider](providermanager.md#nativeprovider)
* [providers](providermanager.md#providers)

### Methods

* [addProvider](providermanager.md#addprovider)
* [getProviderForName](providermanager.md#getproviderforname)
* [getProviderNames](providermanager.md#getprovidernames)
* [hasProvider](providermanager.md#hasprovider)
* [removeProvider](providermanager.md#removeprovider)
* [setCurrentProvider](providermanager.md#setcurrentprovider)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new ProviderManager**(providers?: *[Provider](provider.md)[]*, providerToUse?: *`undefined` \| `string`*): [ProviderManager](providermanager.md)

*Defined in [providers/index.ts:22](https://github.com/ericlewis/react-native-speech/blob/e5a34e4/src/providers/index.ts#L22)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` providers | [Provider](provider.md)[] |
| `Optional` providerToUse | `undefined` \| `string` |

**Returns:** [ProviderManager](providermanager.md)

___

## Properties

<a id="currentprovider"></a>

###  currentProvider

**● currentProvider**: *[Provider](provider.md)*

*Defined in [providers/index.ts:17](https://github.com/ericlewis/react-native-speech/blob/e5a34e4/src/providers/index.ts#L17)*

___
<a id="nativeprovider"></a>

###  nativeProvider

**● nativeProvider**: *[NativeProvider](nativeprovider.md)* =  new NativeProvider(null)

*Defined in [providers/index.ts:20](https://github.com/ericlewis/react-native-speech/blob/e5a34e4/src/providers/index.ts#L20)*

___
<a id="providers"></a>

### `<Private>` providers

**● providers**: *`object`*

*Defined in [providers/index.ts:22](https://github.com/ericlewis/react-native-speech/blob/e5a34e4/src/providers/index.ts#L22)*

#### Type declaration

[key: `string`]: [Provider](provider.md)

___

## Methods

<a id="addprovider"></a>

###  addProvider

▸ **addProvider**(provider: *[Provider](provider.md)*): `void`

*Defined in [providers/index.ts:81](https://github.com/ericlewis/react-native-speech/blob/e5a34e4/src/providers/index.ts#L81)*

Register a new provider

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| provider | [Provider](provider.md) |   |

**Returns:** `void`

___
<a id="getproviderforname"></a>

###  getProviderForName

▸ **getProviderForName**(name: *`string`*): [Provider](provider.md)

*Defined in [providers/index.ts:117](https://github.com/ericlewis/react-native-speech/blob/e5a34e4/src/providers/index.ts#L117)*

Returns a provider for a given (class) name

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| name | `string` |   |

**Returns:** [Provider](provider.md)

___
<a id="getprovidernames"></a>

###  getProviderNames

▸ **getProviderNames**(): `string`[]

*Defined in [providers/index.ts:73](https://github.com/ericlewis/react-native-speech/blob/e5a34e4/src/providers/index.ts#L73)*

Returns a list of all the provider class names

**Returns:** `string`[]

___
<a id="hasprovider"></a>

###  hasProvider

▸ **hasProvider**(provider?: *[Provider](provider.md) \| `string`*): `boolean`

*Defined in [providers/index.ts:103](https://github.com/ericlewis/react-native-speech/blob/e5a34e4/src/providers/index.ts#L103)*

Check if we are managing a particular provider

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| `Optional` provider | [Provider](provider.md) \| `string` |   |

**Returns:** `boolean`

___
<a id="removeprovider"></a>

###  removeProvider

▸ **removeProvider**(provider: *[Provider](provider.md)*): `void`

*Defined in [providers/index.ts:90](https://github.com/ericlewis/react-native-speech/blob/e5a34e4/src/providers/index.ts#L90)*

Remove an old provider

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| provider | [Provider](provider.md) |   |

**Returns:** `void`

___
<a id="setcurrentprovider"></a>

###  setCurrentProvider

▸ **setCurrentProvider**(providerName: *`string`*, setDefault?: *`boolean`*): `void`

*Defined in [providers/index.ts:56](https://github.com/ericlewis/react-native-speech/blob/e5a34e4/src/providers/index.ts#L56)*

Change the active provider, optionally set to default too.

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| providerName | `string` | - |
| `Default value` setDefault | `boolean` | true |

**Returns:** `void`

___

