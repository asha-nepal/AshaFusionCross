/* @flow */

import base64 from 'base64-js';
import randomstring from 'randomstring';

export function createId(length: number = 16) {
  return randomstring.generate(length);
}

// https://facebook.github.io/react/blog/2015/12/16/ismounted-antipattern.html
export const makeCancelable = (promise: Promise<any>) => {
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

const createBTOA = () => {
  if (typeof window !== 'undefined' && typeof window.btoa === 'function') {
    return window.btoa;
  }

  if (typeof Buffer !== 'undefined') {
    return (text: string) => new Buffer(text).toString('base64');
  }

  return base64.fromByteArray;
};

export const btoa = createBTOA();
