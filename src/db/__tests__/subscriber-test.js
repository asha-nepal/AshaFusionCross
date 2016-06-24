/* @flow */

jest.unmock('../subscriber')

//import { subscribe, trigger, clear } from '../subscribe'
import Subscriber from '../subscriber'

describe('subscribe()', () => {
  it('registers callbacks and fire them if trigger() is called', () => {
    const subscriber = new Subscriber()

    const cb1 = jest.fn()
    const cb2 = jest.fn()

    const unsubscribe1 = subscriber.subscribe(cb1)
    const unsubscribe2 = subscriber.subscribe(cb2)

    expect(cb1).not.toBeCalled()
    expect(cb2).not.toBeCalled()

    subscriber.trigger()

    expect(cb1).toBeCalled()
    expect(cb2).toBeCalled()

    unsubscribe1()

    subscriber.trigger()

    expect(cb1.mock.calls.length).toBe(1)
    expect(cb2.mock.calls.length).toBe(2)
  })

  it('can set keys to specify which callbacks are to be called', () => {
    const subscriber = new Subscriber()

    const cball = jest.fn()
    const cbA1 = jest.fn()
    const cbA2 = jest.fn()
    const cbB1 = jest.fn()
    const cbB2 = jest.fn()

    const unsubscribeall = subscriber.subscribe(cball)
    const unsubscribeA1  = subscriber.subscribe('A', cbA1)
    const unsubscribeA2  = subscriber.subscribe('A', cbA2)
    const unsubscribeB1  = subscriber.subscribe('B', cbB1)
    const unsubscribeB2  = subscriber.subscribe('B', cbB2)

    subscriber.trigger('A')

    expect(cball.mock.calls.length).toBe(1)
    expect(cbA1.mock.calls.length).toBe(1)
    expect(cbA2.mock.calls.length).toBe(1)
    expect(cbB1.mock.calls.length).toBe(0)
    expect(cbB2.mock.calls.length).toBe(0)

    subscriber.trigger('B')
    expect(cball.mock.calls.length).toBe(2)
    expect(cbA1.mock.calls.length).toBe(1)
    expect(cbA2.mock.calls.length).toBe(1)
    expect(cbB1.mock.calls.length).toBe(1)
    expect(cbB2.mock.calls.length).toBe(1)

    subscriber.trigger()
    expect(cball.mock.calls.length).toBe(3)
    expect(cbA1.mock.calls.length).toBe(2)
    expect(cbA2.mock.calls.length).toBe(2)
    expect(cbB1.mock.calls.length).toBe(2)
    expect(cbB2.mock.calls.length).toBe(2)

    unsubscribeA1()
    subscriber.trigger()
    expect(cball.mock.calls.length).toBe(4)
    expect(cbA1.mock.calls.length).toBe(2)
    expect(cbA2.mock.calls.length).toBe(3)
    expect(cbB1.mock.calls.length).toBe(3)
    expect(cbB2.mock.calls.length).toBe(3)
  })
})

describe('trigger()', () => {
  it('can be called with arguments', () => {
    const subscriber = new Subscriber()

    const cbA = jest.fn()
    const cball = jest.fn()

    subscriber.subscribe('A', cbA)
    subscriber.subscribe(cball)

    subscriber.trigger(null, 'yoho', 1)
    expect(cbA).toBeCalledWith('yoho', 1)
    expect(cball).toBeCalledWith('yoho', 1)

    subscriber.trigger('A', 'foo', 100)
    expect(cbA).toBeCalledWith('foo', 100)
    expect(cball).toBeCalledWith('foo', 100)

    subscriber.trigger('B', 'bar', 200)
    expect(cbA).not.toBeCalledWith('bar', 200)
    expect(cball).toBeCalledWith('bar', 200)
  })
})

describe('clear()', () => {
  it('deletes all callbacks', () => {
    const subscriber = new Subscriber()

    const cb1 = jest.fn()
    const cb2 = jest.fn()

    subscriber.subscribe(cb1)
    subscriber.subscribe(cb2)

    expect(cb1).not.toBeCalled()
    expect(cb2).not.toBeCalled()

    subscriber.trigger()
    expect(cb1.mock.calls.length).toBe(1)
    expect(cb2.mock.calls.length).toBe(1)

    subscriber.clear()

    subscriber.trigger()
    expect(cb1.mock.calls.length).toBe(1)
    expect(cb2.mock.calls.length).toBe(1)
  })
})
