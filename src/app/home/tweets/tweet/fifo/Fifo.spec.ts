import { Fifo, Idable } from './Fifo';

describe('Fifo', () => {

  const idable = (obj: string): Idable => ({ id: Date.now(), payload: obj } as Idable);
  const A = idable('A');
  const B = idable('B');
  const C = idable('C');
  const D = idable('D');
  const E = idable('E');

  it('should be created only with size', () => {
    expect(new Fifo(3)).toBeDefined();
  });

  it('should return its length', () => {
    const queue = new Fifo(3);

    queue.push(A);
    expect(queue.length).toEqual(1);

    queue.push(B);
    expect(queue.length).toEqual(2);
  });

  it('should limit the given size on the Fifo', () => {
    const queue = new Fifo(3);

    queue.push(A, B, C, D);
    expect(queue.length).toEqual(3);
    expect(queue.get(0)).toEqual(B);
    expect(queue.get(1)).toEqual(C);
    expect(queue.get(2)).toEqual(D);
  });

  it('should truncate content given in argument according to the given size', () => {
    const queue = new Fifo(3, A, B, C, D, E);

    expect(queue.length).toEqual(3);
    expect(queue.get(0)).toEqual(A);
    expect(queue.get(1)).toEqual(B);
    expect(queue.get(2)).toEqual(C);
  });

  it('should notify before push all elements', async () => {
    const handlerCallParam = [];
    const queue = new Fifo(3, A, B, C);
    queue.beforePush = (_param) => {
      handlerCallParam.push(_param);
      return Promise.resolve();
    };

    await queue.push(D);

    expect(handlerCallParam).toContain(A);
    expect(handlerCallParam).toContain(B);
    expect(handlerCallParam).toContain(C);
  });

  xit('should notify after shift all elements', async () => {
    const handlerCalls = [];
    const queue = new Fifo(3, A, B, C);
    queue.afterPush= (_param) => {
      handlerCalls.push(_param);
      return Promise.resolve();
    };

    await queue.push(D);

    expect(handlerCalls).toContain(B);
    expect(handlerCalls).toContain(C);
    expect(handlerCalls).toContain(D);
  });
});
