export class Node<K, V> {
  key: K;
  value: V;
  prev: Node<K, V> | null = null;
  next: Node<K, V> | null = null;

  constructor(key: K, value: V) {
    this.key = key;
    this.value = value;
  }
}

export class Cache<K, V> {
  private capacity: number;
  private cache: Map<K, Node<K, V>>;
  private head: Node<K, V> | null = null;
  private tail: Node<K, V> | null = null;

  constructor(capacity: number) {
    if (capacity <= 0) {
      throw new Error("Capacity must be positive");
    }
    this.capacity = capacity;
    this.cache = new Map();
  }

  get(key: K): V | -1 {
    if (!this.cache.has(key)) {
      return -1;
    }
    const node = this.cache.get(key)!;
    this.moveToHead(node);
    return node.value;
  }

  put(key: K, value: V): void {
    if (this.cache.has(key)) {
      const node = this.cache.get(key)!;
      node.value = value;
      this.moveToHead(node);
      return;
    }

    if (this.cache.size >= this.capacity) {
      this.removeTail();
    }

    const newNode = new Node(key, value);
    this.cache.set(key, newNode);
    this.addToHead(newNode);
  }

  private moveToHead(node: Node<K, V>): void {
    if (this.head === node) return;

    // Remove from current position
    if (node.prev) node.prev.next = node.next;
    if (node.next) node.next.prev = node.prev;
    if (this.tail === node && node.prev) this.tail = node.prev;

    // Add to head
    node.prev = null;
    node.next = this.head;
    if (this.head) this.head.prev = node;
    this.head = node;

    if (!this.tail) this.tail = node;
  }

  private addToHead(node: Node<K, V>): void {
    node.prev = null;
    node.next = this.head;
    if (this.head) this.head.prev = node;
    this.head = node;
    if (!this.tail) this.tail = node;
  }

  private removeTail(): void {
    if (!this.tail) return;
    const keyToRemove = this.tail.key;
    this.cache.delete(keyToRemove);

    if (this.tail.prev) {
      this.tail.prev.next = null;
      this.tail = this.tail.prev;
    } else {
      this.head = null;
      this.tail = null;
    }
  }

  // Helper method for testing/debugging
  getAllValues(): [K, V][] {
    const values: [K, V][] = [];
    let curr = this.head;
    while (curr) {
      values.push([curr.key, curr.value]);
      curr = curr.next;
    }
    return values;
  }
}
