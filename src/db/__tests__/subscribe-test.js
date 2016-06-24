jest.unmock('../subscribe')

import { subscribe, trigger, clear } from '../subscribe'

describe('subscribe()', () => {
  it('registers callbacks and fire them if trigger() is called', () => {
    const cb1 = jest.fn()
    const cb2 = jest.fn()

    const unsubscribe1 = subscribe(cb1)
    const unsubscribe2 = subscribe(cb2)

    expect(cb1).not.toBeCalled()
    expect(cb2).not.toBeCalled()

    trigger()

    expect(cb1).toBeCalled()
    expect(cb2).toBeCalled()

    unsubscribe1()

    trigger()

    expect(cb1.mock.calls.length).toBe(1)
    expect(cb2.mock.calls.length).toBe(2)
  })

  it('can set keys to specify which callbacks are to be called', () => {
    const cball = jest.fn()
    const cbA1 = jest.fn()
    const cbA2 = jest.fn()
    const cbB1 = jest.fn()
    const cbB2 = jest.fn()

    const unsubscribeall = subscribe(cball)
    const unsubscribeA1  = subscribe(cbA1, 'A')
    const unsubscribeA2  = subscribe(cbA2, 'A')
    const unsubscribeB1  = subscribe(cbB1, 'B')
    const unsubscribeB2  = subscribe(cbB2, 'B')

    trigger('A')

    expect(cball.mock.calls.length).toBe(1)
    expect(cbA1.mock.calls.length).toBe(1)
    expect(cbA2.mock.calls.length).toBe(1)
    expect(cbB1.mock.calls.length).toBe(0)
    expect(cbB2.mock.calls.length).toBe(0)

    trigger('B')
    expect(cball.mock.calls.length).toBe(2)
    expect(cbA1.mock.calls.length).toBe(1)
    expect(cbA2.mock.calls.length).toBe(1)
    expect(cbB1.mock.calls.length).toBe(1)
    expect(cbB2.mock.calls.length).toBe(1)

    trigger()
    expect(cball.mock.calls.length).toBe(3)
    expect(cbA1.mock.calls.length).toBe(2)
    expect(cbA2.mock.calls.length).toBe(2)
    expect(cbB1.mock.calls.length).toBe(2)
    expect(cbB2.mock.calls.length).toBe(2)

    unsubscribeA1()
    trigger()
    expect(cball.mock.calls.length).toBe(4)
    expect(cbA1.mock.calls.length).toBe(2)
    expect(cbA2.mock.calls.length).toBe(3)
    expect(cbB1.mock.calls.length).toBe(3)
    expect(cbB2.mock.calls.length).toBe(3)
  })
})

describe('trigger()', () => {
  it('can be called with arguments', () => {
    const cbA = jest.fn()
    const cball = jest.fn()

    subscribe(cbA, 'A')
    subscribe(cball)

    trigger(null, 'yoho', 1)
    expect(cbA).toBeCalledWith('yoho', 1)
    expect(cball).toBeCalledWith('yoho', 1)

    trigger('A', 'foo', 100)
    expect(cbA).toBeCalledWith('foo', 100)
    expect(cball).toBeCalledWith('foo', 100)

    trigger('B', 'bar', 200)
    expect(cbA).not.toBeCalledWith('bar', 200)
    expect(cball).toBeCalledWith('bar', 200)
  })
})

describe('clear()', () => {
  it('deletes all callbacks', () => {
    const cb1 = jest.fn()
    const cb2 = jest.fn()

    subscribe(cb1)
    subscribe(cb2)

    expect(cb1).not.toBeCalled()
    expect(cb2).not.toBeCalled()

    trigger()
    expect(cb1.mock.calls.length).toBe(1)
    expect(cb2.mock.calls.length).toBe(1)

    clear()

    trigger()
    expect(cb1.mock.calls.length).toBe(1)
    expect(cb2.mock.calls.length).toBe(1)
  })
})
