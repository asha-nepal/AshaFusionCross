/* @flow */

import Chance from 'chance';

const chance = new Chance();
const idStringPool = '0123456789abcefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'; // URLセーフな文字のみ

export function createId(length: number = 16) {
  return chance.string({ pool: idStringPool, length });
}

// https://facebook.github.io/react/blog/2015/12/16/ismounted-antipattern.html
export const makeCancelable = (promise: Promise) => {
  let hasCanceled_ = false;

  const wrappedPromise = new Promise((resolve, reject) => {
    promise.then((val) =>
      (hasCanceled_ ? reject({ isCanceled: true }) : resolve(val))
    );
    promise.catch((error) =>
      (hasCanceled_ ? reject({ isCanceled: true }) : reject(error))
    );
  });

  return {
    promise: wrappedPromise,
    cancel() {
      hasCanceled_ = true;
    },
  };
};
