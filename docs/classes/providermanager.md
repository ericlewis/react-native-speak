[react-native-speak-eel-test](../README.md) > [ProviderManager](../classes/providermanager.md)

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

⊕ **new ProviderManager**(providers?: *[Provider](provider.md)[]*, defaultProvider?: *`undefined` \| `string`*): [ProviderManager](providermanager.md)

*Defined in [providers/index.ts:20](https://github.com/ericlewis/react-native-speak/blob/f509ee8/src/providers/index.ts#L20)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` providers | [Provider](provider.md)[] |
| `Optional` defaultProvider | `undefined` \| `string` |

**Returns:** [ProviderManager](providermanager.md)

___

## Properties

<a id="currentprovider"></a>

###  currentProvider

**● currentProvider**: *[Provider](provider.md)*

*Defined in [providers/index.ts:15](https://github.com/ericlewis/react-native-speak/blob/f509ee8/src/providers/index.ts#L15)*

___
<a id="nativeprovider"></a>

###  nativeProvider

**● nativeProvider**: *[NativeProvider](nativeprovider.md)* =  new NativeProvider(null)

*Defined in [providers/index.ts:18](https://github.com/ericlewis/react-native-speak/blob/f509ee8/src/providers/index.ts#L18)*

___
<a id="providers"></a>

### `<Private>` providers

**● providers**: *`object`*

*Defined in [providers/index.ts:20](https://github.com/ericlewis/react-native-speak/blob/f509ee8/src/providers/index.ts#L20)*

#### Type declaration

[key: `string`]: [Provider](provider.md)

___

## Methods

<a id="addprovider"></a>

###  addProvider

▸ **addProvider**(provider: *[Provider](provider.md)*): `void`

*Defined in [providers/index.ts:59](https://github.com/ericlewis/react-native-speak/blob/f509ee8/src/providers/index.ts#L59)*

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

*Defined in [providers/index.ts:95](https://github.com/ericlewis/react-native-speak/blob/f509ee8/src/providers/index.ts#L95)*

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

*Defined in [providers/index.ts:51](https://github.com/ericlewis/react-native-speak/blob/f509ee8/src/providers/index.ts#L51)*

Returns a list of all the provider class names

**Returns:** `string`[]

___
<a id="hasprovider"></a>

###  hasProvider

▸ **hasProvider**(provider?: *[Provider](provider.md) \| `string`*): `boolean`

*Defined in [providers/index.ts:81](https://github.com/ericlewis/react-native-speak/blob/f509ee8/src/providers/index.ts#L81)*

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

*Defined in [providers/index.ts:68](https://github.com/ericlewis/react-native-speak/blob/f509ee8/src/providers/index.ts#L68)*

Remove an old provider

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| provider | [Provider](provider.md) |   |

**Returns:** `void`

___
<a id="setcurrentprovider"></a>

###  setCurrentProvider

▸ **setCurrentProvider**(providerName: *`string`*): `void`

*Defined in [providers/index.ts:39](https://github.com/ericlewis/react-native-speak/blob/f509ee8/src/providers/index.ts#L39)*

Change the active provider, optionally set to default too.

**Parameters:**

| Name | Type |
| ------ | ------ |
| providerName | `string` |

**Returns:** `void`

___

