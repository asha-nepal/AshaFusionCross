/* @flow */

export default class PubSub {
  callbacks: Object;
  nextind: number;

  constructor() {
    this.clear();
  }

  subscribe(arg1: Function | string, arg2: ?Function): Function {
    let cb: Function;
    let key: ?string;
    if (typeof arg1 === 'function') {
      cb = arg1;
      key = undefined;
    } else if (typeof arg1 === 'string' && typeof arg2 === 'function') {
      cb = arg2;
      key = arg1;
    } else {
      throw new TypeError();
    }

    const entity: {cb: Function, key: ?string} = {
      cb,
      key,
    };

    const ind = this.nextind;
    this.callbacks[ind] = entity;
    this.nextind++;

    return () => { delete this.callbacks[ind]; };
  }

  publish(key: string, ...args: Array<void>) {
    Object.keys(this.callbacks).forEach(ind => {
      const entity = this.callbacks[ind];

      if (!key || !entity.key || key === entity.key) {
        entity.cb.apply(null, args);
      }
    });
  }

  clear() {
    this.callbacks = {};
    this.nextind = 0;
  }
}
