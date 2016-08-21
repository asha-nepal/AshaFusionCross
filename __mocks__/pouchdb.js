/* eslint-env jest */

import EventEmitter from 'events';

export default class {
  changes() {
    return new EventEmitter();
  }

  allDocs = jest.fn();
  get = jest.fn();
  put = jest.fn();
}
