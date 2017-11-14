import { Queue, Idable } from './Queue';

describe('Queue', () => {

  const idable = (obj: string): Idable => ({ id: Date.now(), payload: obj } as Idable);
  const A = idable('A');
  const B = idable('B');
  const C = idable('C');
  const D = idable('D');
  const E = idable('E');

  it('should be created only with size', () => {
    expect(new Queue(3)).toBeDefined();
  });

  it('should return its length', async () => {
    const queue = new Queue(3);

    await queue.push(A);
    expect(queue.length).toEqual(1);

    await queue.push(B);
    expect(queue.length).toEqual(2);
  });

  it('should limit the given size on the Queue', async () => {
    const queue = new Queue(3);

    await queue.push(A, B, C, D);
    expect(queue.length).toEqual(3);
    expect(queue.get(0)).toEqual(B);
    expect(queue.get(1)).toEqual(C);
    expect(queue.get(2)).toEqual(D);
  });

  it('should truncate content given in argument according to the given size', () => {
    const queue = new Queue(3, A, B, C, D, E);

    expect(queue.length).toEqual(3);
    expect(queue.get(0)).toEqual(A);
    expect(queue.get(1)).toEqual(B);
    expect(queue.get(2)).toEqual(C);
  });

  it('should notify before push all elements', async () => {
    let params = [];
    const queue = new Queue(3, A, B, C);
    queue.beforePush = (_param) => {
      params = _param;
      return Promise.resolve();
    };

    await queue.push(D);

    expect(params).toContain(A);
    expect(params).toContain(B);
    expect(params).toContain(C);
  });

  it('should notify after add all elements', async () => {
    let params = [];
    const queue = new Queue(3, A, B, C);
    queue.afterPush= (_param) => {
      params = _param;
      return Promise.resolve();
    };

    await queue.push(D);

    expect(params).toContain(A);
    expect(params).toContain(B);
    expect(params).toContain(C);
    expect(params).toContain(D);
  });

  it('should notify after shift all elements', async () => {
    let params = [];
    const queue = new Queue(3, A, B, C);
    queue.afterShift= (_param) => {
      params = _param;
      return Promise.resolve();
    };

    await queue.push(D);

    expect(params).toContain(B);
    expect(params).toContain(C);
    expect(params).toContain(D);
  });
});
