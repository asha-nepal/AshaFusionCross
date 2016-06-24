/* @flow */

let callbacks
let nextind

export const subscribe = (arg1: Function | string, arg2: ?Function) => {
  let cb: Function, key: ?string
  if (typeof arg1 === 'function') {
    cb = arg1
    key = undefined
  } else if (typeof arg1 === 'string' && typeof arg2 === 'function') {
    cb = arg2
    key = arg1
  } else {
    throw TypeError()
  }

  const entity: {cb: Function, key: ?string} = {
    cb,
    key,
  }

  const ind = nextind
  callbacks[ind] = entity
  nextind++

  return () => { delete callbacks[ind] }
}

export const trigger = (key: string, ...args: Array<void>) => {
  Object.keys(callbacks).forEach(ind => {
    const entity = callbacks[ind]

    if (!key || !entity.key || key === entity.key)
      entity.cb.apply(null, args)
  })
}

export const clear = () => {
  callbacks = {}
  nextind = 0
}

clear()
