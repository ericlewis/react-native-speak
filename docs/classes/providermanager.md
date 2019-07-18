[react-native-speak](../README.md) > [ProviderManager](../classes/providermanager.md)

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

⊕ **new ProviderManager**(providers?: *`Provider`[]*, defaultProvider?: *`undefined` \| `string`*): [ProviderManager](providermanager.md)

*Defined in [providers/index.ts:15](https://github.com/ericlewis/react-native-speech/blob/30f561b/src/providers/index.ts#L15)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` providers | `Provider`[] |
| `Optional` defaultProvider | `undefined` \| `string` |

**Returns:** [ProviderManager](providermanager.md)

___

## Properties

<a id="currentprovider"></a>

###  currentProvider

**● currentProvider**: *`Provider`*

*Defined in [providers/index.ts:10](https://github.com/ericlewis/react-native-speech/blob/30f561b/src/providers/index.ts#L10)*

___
<a id="nativeprovider"></a>

###  nativeProvider

**● nativeProvider**: *`any`* =  new NativeProvider(null)

*Defined in [providers/index.ts:13](https://github.com/ericlewis/react-native-speech/blob/30f561b/src/providers/index.ts#L13)*

___
<a id="providers"></a>

### `<Private>` providers

**● providers**: *`object`*

*Defined in [providers/index.ts:15](https://github.com/ericlewis/react-native-speech/blob/30f561b/src/providers/index.ts#L15)*

#### Type declaration

[key: `string`]: `Provider`

___

## Methods

<a id="addprovider"></a>

###  addProvider

▸ **addProvider**(provider: *`Provider`*): `void`

*Defined in [providers/index.ts:54](https://github.com/ericlewis/react-native-speech/blob/30f561b/src/providers/index.ts#L54)*

Register a new provider

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| provider | `Provider` |   |

**Returns:** `void`

___
<a id="getproviderforname"></a>

###  getProviderForName

▸ **getProviderForName**(name: *`string`*): `Provider`

*Defined in [providers/index.ts:90](https://github.com/ericlewis/react-native-speech/blob/30f561b/src/providers/index.ts#L90)*

Returns a provider for a given (class) name

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| name | `string` |   |

**Returns:** `Provider`

___
<a id="getprovidernames"></a>

###  getProviderNames

▸ **getProviderNames**(): `string`[]

*Defined in [providers/index.ts:46](https://github.com/ericlewis/react-native-speech/blob/30f561b/src/providers/index.ts#L46)*

Returns a list of all the provider class names

**Returns:** `string`[]

___
<a id="hasprovider"></a>

###  hasProvider

▸ **hasProvider**(provider?: *`Provider` \| `string`*): `boolean`

*Defined in [providers/index.ts:76](https://github.com/ericlewis/react-native-speech/blob/30f561b/src/providers/index.ts#L76)*

Check if we are managing a particular provider

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| `Optional` provider | `Provider` \| `string` |   |

**Returns:** `boolean`

___
<a id="removeprovider"></a>

###  removeProvider

▸ **removeProvider**(provider: *`Provider`*): `void`

*Defined in [providers/index.ts:63](https://github.com/ericlewis/react-native-speech/blob/30f561b/src/providers/index.ts#L63)*

Remove an old provider

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| provider | `Provider` |   |

**Returns:** `void`

___
<a id="setcurrentprovider"></a>

###  setCurrentProvider

▸ **setCurrentProvider**(providerName: *`string`*): `void`

*Defined in [providers/index.ts:34](https://github.com/ericlewis/react-native-speech/blob/30f561b/src/providers/index.ts#L34)*

Change the active provider, optionally set to default too.

**Parameters:**

| Name | Type |
| ------ | ------ |
| providerName | `string` |

**Returns:** `void`

___

