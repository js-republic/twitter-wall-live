export interface Idable {
  id: number;
}

type ShiftHandler = (T) => Promise<any>

export class Fifo<T extends Idable> {
  public content: T[];
  public beforePush?: ShiftHandler;
  public afterPush?: ShiftHandler;
  public afterShift?: ShiftHandler;

  constructor(private size: number,
              ..._content: T[]) {
    this.content = _content.slice(0, size);
  }

  async push(...item: T[]) {
    await this.invokeHandlerIfExist(this.beforePush);
    this.content.push(...item);
    await this.invokeHandlerIfExist(this.afterPush);
    while (this.content.length > this.size) {
      this.content.shift();
    }
    await this.invokeHandlerIfExist(this.afterShift);
  }

  async invokeHandlerIfExist (handler:ShiftHandler){
    await handler ? handler(this.content) : Promise.resolve();
  }

  get length(): number {
    return this.content.length;
  }

  get(index): T {
    return this.content[index];
  }

  getIndex(searchedItem: T): number {
    return this.content.findIndex(item => searchedItem.id === item.id);
  }
}
