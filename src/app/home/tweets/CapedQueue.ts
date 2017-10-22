import { EventEmitter } from '@angular/core';

export default class CapedQueue<T> {
  public content: T[];
  public beforeShift: EventEmitter<T> = new EventEmitter();
  public afterShift: EventEmitter<T> = new EventEmitter();

  constructor(private size: number,
              _content: T[] = []) {
    this.content = _content.slice(0, size);
  }

  push(item: T) {
    this.content.push(item);
    while (this.content.length > this.size) {
      this.content.forEach((i) => this.beforeShift.emit(i));
      this.content.shift();
      this.content.forEach((i) => this.afterShift.emit(i));
    }
    return this;
  }

  get length(): number {
    return this.content.length;
  }

  get(index): T {
    return this.content[index];
  }
}
