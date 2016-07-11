/* eslint-env jest */

jest.unmock('../pubsub');

import PubSub from '../pubsub';

describe('subscribe()', () => {
  it('registers callbacks and fire them if publish() is called', () => {
    const pubsub = new PubSub();

    const cb1 = jest.fn();
    const cb2 = jest.fn();

    const unsubscribe1 = pubsub.subscribe(cb1);
    const unsubscribe2 = pubsub.subscribe(cb2);

    expect(cb1).not.toBeCalled();
    expect(cb2).not.toBeCalled();

    pubsub.publish();

    expect(cb1).toBeCalled();
    expect(cb2).toBeCalled();

    unsubscribe1();

    pubsub.publish();

    expect(cb1.mock.calls.length).toBe(1);
    expect(cb2.mock.calls.length).toBe(2);
  });

  it('can set keys to specify which callbacks are to be called', () => {
    const pubsub = new PubSub();

    const cball = jest.fn();
    const cbA1 = jest.fn();
    const cbA2 = jest.fn();
    const cbB1 = jest.fn();
    const cbB2 = jest.fn();

    const unsubscribeall = pubsub.subscribe(cball);
    const unsubscribeA1  = pubsub.subscribe('A', cbA1);
    const unsubscribeA2  = pubsub.subscribe('A', cbA2);
    const unsubscribeB1  = pubsub.subscribe('B', cbB1);
    const unsubscribeB2  = pubsub.subscribe('B', cbB2);

    pubsub.publish('A');

    expect(cball.mock.calls.length).toBe(1);
    expect(cbA1.mock.calls.length).toBe(1);
    expect(cbA2.mock.calls.length).toBe(1);
    expect(cbB1.mock.calls.length).toBe(0);
    expect(cbB2.mock.calls.length).toBe(0);

    pubsub.publish('B');
    expect(cball.mock.calls.length).toBe(2);
    expect(cbA1.mock.calls.length).toBe(1);
    expect(cbA2.mock.calls.length).toBe(1);
    expect(cbB1.mock.calls.length).toBe(1);
    expect(cbB2.mock.calls.length).toBe(1);

    pubsub.publish();
    expect(cball.mock.calls.length).toBe(3);
    expect(cbA1.mock.calls.length).toBe(2);
    expect(cbA2.mock.calls.length).toBe(2);
    expect(cbB1.mock.calls.length).toBe(2);
    expect(cbB2.mock.calls.length).toBe(2);

    unsubscribeA1();
    pubsub.publish();
    expect(cball.mock.calls.length).toBe(4);
    expect(cbA1.mock.calls.length).toBe(2);
    expect(cbA2.mock.calls.length).toBe(3);
    expect(cbB1.mock.calls.length).toBe(3);
    expect(cbB2.mock.calls.length).toBe(3);
  });
});

describe('publish()', () => {
  it('can be called with arguments', () => {
    const pubsub = new PubSub();

    const cbA = jest.fn();
    const cball = jest.fn();

    pubsub.subscribe('A', cbA);
    pubsub.subscribe(cball);

    pubsub.publish(null, 'yoho', 1);
    expect(cbA).toBeCalledWith('yoho', 1);
    expect(cball).toBeCalledWith('yoho', 1);

    pubsub.publish('A', 'foo', 100);
    expect(cbA).toBeCalledWith('foo', 100);
    expect(cball).toBeCalledWith('foo', 100);

    pubsub.publish('B', 'bar', 200);
    expect(cbA).not.toBeCalledWith('bar', 200);
    expect(cball).toBeCalledWith('bar', 200);
  });
});

describe('clear()', () => {
  it('deletes all callbacks', () => {
    const pubsub = new PubSub();

    const cb1 = jest.fn();
    const cb2 = jest.fn();

    pubsub.subscribe(cb1);
    pubsub.subscribe(cb2);

    expect(cb1).not.toBeCalled();
    expect(cb2).not.toBeCalled();

    pubsub.publish();
    expect(cb1.mock.calls.length).toBe(1);
    expect(cb2.mock.calls.length).toBe(1);

    pubsub.clear();

    pubsub.publish();
    expect(cb1.mock.calls.length).toBe(1);
    expect(cb2.mock.calls.length).toBe(1);
  });
});
