import CapedQueue from './CapedQueue';

describe('CapedQueue', () => {

  it('should be created only with size', () => {
    expect(new CapedQueue(3)).toBeDefined();
  });

  it('should return its length', () => {
    const queue = new CapedQueue(3);

    queue.push({});
    expect(queue.length).toEqual(1);

    queue.push({});
    expect(queue.length).toEqual(2);
  });

  it('should limit the given size on the CapedQueue', () => {
    const queue = new CapedQueue(3);

    queue.push('A').push('B').push('C').push('D');
    expect(queue.length).toEqual(3);
    expect(queue.get(0)).toEqual('B');
    expect(queue.get(1)).toEqual('C');
    expect(queue.get(2)).toEqual('D');
  });

  it('should truncate content given in argument according to the given size', () => {
    const queue = new CapedQueue(3, ['A', 'B', 'C', 'D', 'E']);

    expect(queue.length).toEqual(3);
    expect(queue.get(0)).toEqual('A');
    expect(queue.get(1)).toEqual('B');
    expect(queue.get(2)).toEqual('C');
  });

  it('should notify before shift all elements', () => {
    const handlerCalls = [];
    const queue = new CapedQueue(3, ['A', 'B', 'C']);
    queue.beforeShift.subscribe((_param) => {
      handlerCalls.push(_param);
    });

    queue.push('D');

    expect(handlerCalls).toContain('A');
    expect(handlerCalls).toContain('B');
    expect(handlerCalls).toContain('C');
    expect(handlerCalls).toContain('D');
  });

  it('should notify after shift all elements', () => {
    const handlerCalls = [];
    const queue = new CapedQueue(3, ['A', 'B', 'C']);
    queue.afterShift.subscribe((_param) => {
      handlerCalls.push(_param);
    });

    queue.push('D');

    expect(handlerCalls).toContain('B');
    expect(handlerCalls).toContain('C');
    expect(handlerCalls).toContain('D');
  });
});
