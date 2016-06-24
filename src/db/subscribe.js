/* @flow */

let callbacks
let nextind

export const subscribe = (cb: Function, key: string) => {
  const entity: {cb: ?Function, key: string} = {
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
