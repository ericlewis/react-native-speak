export type EventName = 'ADDED_ITEM' | 'REMOVED_ITEM';
export type QueueCallback = <T>(
  eventName: EventName,
  data: T[],
  item?: T
) => void;

export default class Queue<T> {
  public static ADDED_ITEM: EventName = 'ADDED_ITEM';
  public static REMOVED_ITEM: EventName = 'REMOVED_ITEM';

  private data: T[];
  private callback?: QueueCallback;

  /**
   * Creates a new queue
   * @param data optionally provide an initial array of items
   */
  constructor(data?: T[]) {
    this.data = data || [];
  }

  /**
   * Add a batch of items to the queue
   * Defaults to adding items to the beginning of the queue
   * @param items array of items to be added to the queue
   * @param beginning (optional) add to the 0 index. If false, adds after the last item.
   * @returns null
   */
  public batchAdd(items: T[], beginning = true): T {
    this.data = beginning ? [...items, ...this.data] : [...this.data, ...items];
    return this.fireCallbackAndReturn(
      Queue.ADDED_ITEM,
      beginning ? this.first() : this.last()
    )!;
  }

  /**
   * Adds item to the queue
   * Defaults to adding items to the beginning of the queue
   * @param item item to be added to the queue
   * @param beginning (optional) add to the 0 index. If false, adds after the last item.
   * @returns the item added
   */
  public add(item: T, beginning = true): T {
    beginning ? this.data.unshift(item) : this.data.push(item);
    return this.fireCallbackAndReturn(Queue.ADDED_ITEM, item)!;
  }

  /**
   * Removes an item from the queue
   * Default is to remove the last item
   * @param lastItem (optional) remove the last item if true. If false, it removes the *first* item.
   * @returns the item removed
   */
  public remove(lastItem = true): T | undefined {
    const result = lastItem ? this.data.pop() : this.data.shift();
    return this.fireCallbackAndReturn(Queue.REMOVED_ITEM, result);
  }

  /**
   * Resets the queue
   * TODO: should this fire an event?
   */
  public flush() {
    this.data = [];
  }

  /**
   * @returns first item in queue
   */
  public first(): T {
    return this.data[0];
  }

  /**
   * @returns last item in queue
   */
  public last(): T {
    return this.data[this.data.length - 1];
  }

  /**
   *
   */
  public itemAtIndex(index: number): T {
    if (index >= this.size() || index < 0) {
      throw new Error('Queue error: out of bounds');
    }

    return this.data[index];
  }

  /**
   * @returns number of items in queue
   */
  public size(): number {
    return this.data.length;
  }

  /**
   * @returns if the queue is still needed
   */
  public isEmpty(): boolean {
    return this.data.length <= 0;
  }

  /**
   * Listen for add / remove events
   * Note: you can only have 1 listener at a time
   * @param callback function to fire when adding / removing items
   */
  public addListener(callback: QueueCallback): void {
    this.callback = callback;
  }

  /**
   * Stop listening / release ref
   */
  public removeListener(): void {
    this.callback = undefined;
  }

  /**
   * Simplifies the callback, returns the changed item too.
   */
  private fireCallbackAndReturn(name: EventName, item?: T): T | undefined {
    if (this.callback) {
      this.callback(name, this.data, item);
    }

    return item;
  }
}
