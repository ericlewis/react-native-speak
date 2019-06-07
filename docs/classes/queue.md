[react-native-speech](../README.md) > [Queue](../classes/queue.md)

# Class: Queue

## Type parameters
#### T 
## Hierarchy

**Queue**

## Index

### Constructors

* [constructor](queue.md#constructor)

### Properties

* [callback](queue.md#callback)
* [data](queue.md#data)
* [ADDED_ITEM](queue.md#added_item)
* [REMOVED_ITEM](queue.md#removed_item)

### Methods

* [add](queue.md#add)
* [addListener](queue.md#addlistener)
* [batchAdd](queue.md#batchadd)
* [fireCallbackAndReturn](queue.md#firecallbackandreturn)
* [first](queue.md#first)
* [flush](queue.md#flush)
* [isEmpty](queue.md#isempty)
* [itemAtIndex](queue.md#itematindex)
* [last](queue.md#last)
* [remove](queue.md#remove)
* [removeListener](queue.md#removelistener)
* [size](queue.md#size)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new Queue**(data?: *`T`[]*): [Queue](queue.md)

*Defined in [Queue.ts:13](https://github.com/ericlewis/react-native-speech/blob/e5a34e4/src/Queue.ts#L13)*

Creates a new queue

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| `Optional` data | `T`[] |  optionally provide an initial array of items |

**Returns:** [Queue](queue.md)

___

## Properties

<a id="callback"></a>

### `<Private>``<Optional>` callback

**● callback**: *[QueueCallback](../#queuecallback)*

*Defined in [Queue.ts:13](https://github.com/ericlewis/react-native-speech/blob/e5a34e4/src/Queue.ts#L13)*

___
<a id="data"></a>

### `<Private>` data

**● data**: *`T`[]*

*Defined in [Queue.ts:12](https://github.com/ericlewis/react-native-speech/blob/e5a34e4/src/Queue.ts#L12)*

___
<a id="added_item"></a>

### `<Static>` ADDED_ITEM

**● ADDED_ITEM**: *[EventName](../#eventname)* = "ADDED_ITEM"

*Defined in [Queue.ts:9](https://github.com/ericlewis/react-native-speech/blob/e5a34e4/src/Queue.ts#L9)*

___
<a id="removed_item"></a>

### `<Static>` REMOVED_ITEM

**● REMOVED_ITEM**: *[EventName](../#eventname)* = "REMOVED_ITEM"

*Defined in [Queue.ts:10](https://github.com/ericlewis/react-native-speech/blob/e5a34e4/src/Queue.ts#L10)*

___

## Methods

<a id="add"></a>

###  add

▸ **add**(item: *`T`*, beginning?: *`boolean`*): `T`

*Defined in [Queue.ts:45](https://github.com/ericlewis/react-native-speech/blob/e5a34e4/src/Queue.ts#L45)*

Adds item to the queue Defaults to adding items to the beginning of the queue

**Parameters:**

| Name | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| item | `T` | - |  item to be added to the queue |
| `Default value` beginning | `boolean` | true |  (optional) add to the 0 index. If false, adds after the last item. |

**Returns:** `T`
the item added

___
<a id="addlistener"></a>

###  addListener

▸ **addListener**(callback: *[QueueCallback](../#queuecallback)*): `void`

*Defined in [Queue.ts:113](https://github.com/ericlewis/react-native-speech/blob/e5a34e4/src/Queue.ts#L113)*

Listen for add / remove events Note: you can only have 1 listener at a time

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| callback | [QueueCallback](../#queuecallback) |  function to fire when adding / removing items |

**Returns:** `void`

___
<a id="batchadd"></a>

###  batchAdd

▸ **batchAdd**(items: *`T`[]*, beginning?: *`boolean`*): `T`

*Defined in [Queue.ts:30](https://github.com/ericlewis/react-native-speech/blob/e5a34e4/src/Queue.ts#L30)*

Add a batch of items to the queue Defaults to adding items to the beginning of the queue

**Parameters:**

| Name | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| items | `T`[] | - |  array of items to be added to the queue |
| `Default value` beginning | `boolean` | true |  (optional) add to the 0 index. If false, adds after the last item. |

**Returns:** `T`
null

___
<a id="firecallbackandreturn"></a>

### `<Private>` fireCallbackAndReturn

▸ **fireCallbackAndReturn**(name: *[EventName](../#eventname)*, item?: *[T]()*): `T` \| `undefined`

*Defined in [Queue.ts:127](https://github.com/ericlewis/react-native-speech/blob/e5a34e4/src/Queue.ts#L127)*

Simplifies the callback, returns the changed item too.

**Parameters:**

| Name | Type |
| ------ | ------ |
| name | [EventName](../#eventname) |
| `Optional` item | [T]() |

**Returns:** `T` \| `undefined`

___
<a id="first"></a>

###  first

▸ **first**(): `T`

*Defined in [Queue.ts:72](https://github.com/ericlewis/react-native-speech/blob/e5a34e4/src/Queue.ts#L72)*

**Returns:** `T`
first item in queue

___
<a id="flush"></a>

###  flush

▸ **flush**(): `void`

*Defined in [Queue.ts:65](https://github.com/ericlewis/react-native-speech/blob/e5a34e4/src/Queue.ts#L65)*

Resets the queue TODO: should this fire an event

**Returns:** `void`

___
<a id="isempty"></a>

###  isEmpty

▸ **isEmpty**(): `boolean`

*Defined in [Queue.ts:104](https://github.com/ericlewis/react-native-speech/blob/e5a34e4/src/Queue.ts#L104)*

**Returns:** `boolean`
if the queue is still needed

___
<a id="itematindex"></a>

###  itemAtIndex

▸ **itemAtIndex**(index: *`number`*): `T`

*Defined in [Queue.ts:86](https://github.com/ericlewis/react-native-speech/blob/e5a34e4/src/Queue.ts#L86)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| index | `number` |

**Returns:** `T`

___
<a id="last"></a>

###  last

▸ **last**(): `T`

*Defined in [Queue.ts:79](https://github.com/ericlewis/react-native-speech/blob/e5a34e4/src/Queue.ts#L79)*

**Returns:** `T`
last item in queue

___
<a id="remove"></a>

###  remove

▸ **remove**(lastItem?: *`boolean`*): `T` \| `undefined`

*Defined in [Queue.ts:56](https://github.com/ericlewis/react-native-speech/blob/e5a34e4/src/Queue.ts#L56)*

Removes an item from the queue Default is to remove the last item

**Parameters:**

| Name | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `Default value` lastItem | `boolean` | true |  (optional) remove the last item if true. If false, it removes the _first_ item. |

**Returns:** `T` \| `undefined`
the item removed

___
<a id="removelistener"></a>

###  removeListener

▸ **removeListener**(): `void`

*Defined in [Queue.ts:120](https://github.com/ericlewis/react-native-speech/blob/e5a34e4/src/Queue.ts#L120)*

Stop listening / release ref

**Returns:** `void`

___
<a id="size"></a>

###  size

▸ **size**(): `number`

*Defined in [Queue.ts:97](https://github.com/ericlewis/react-native-speech/blob/e5a34e4/src/Queue.ts#L97)*

**Returns:** `number`
number of items in queue

___

