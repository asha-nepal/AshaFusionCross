/* eslint-env jest */

import EventEmitter from 'events';

export default class {
  static plugin = jest.fn();

  changes() {
    return new EventEmitter();
  }

  allDocs = jest.fn();
  bulkDocs = jest.fn();
  get = jest.fn();
  put = jest.fn();
}

export const plugin = jest.fn();  // Work around: "static plugin = jest.fn()" does not work
