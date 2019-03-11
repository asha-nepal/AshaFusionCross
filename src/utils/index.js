/**
 * Copyright 2017 Yuichiro Tsuchiya
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* @flow */

import base64 from 'base64-js';

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

export const capitalize = (str: string) => (
  str.length === 0 ? str : str.charAt(0).toUpperCase() + str.substring(1)
);

export const approximateFloat = (value: number, precision: ?number): number => {
  if (precision == null) return value;

  const e = Math.pow(10, precision);
  return Math.round(value * e) / e;
};
