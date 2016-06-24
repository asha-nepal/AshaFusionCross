/* @flow */

let callbacks = []

export const subscribe = (cb: Function, key: string) => {
  const entity: {cb: ?Function, key: string} = {
    cb,
    key,
  }
  callbacks.push(entity)

  return () => {
    entity.cb = undefined
  }
}

export const trigger = (key: string, ...args: Array<void>) => {
  callbacks.forEach(entity => {
    if (entity.cb === 'function')
      if (!key || !entity.key || key === entity.key)
        entity.cb.apply(null, args)
  })
}

export const clear = () => {
  callbacks = []
}
