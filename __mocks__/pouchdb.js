/* eslint-env jest */

import EventEmitter from 'events';

export default class {
  changes() {
    return new EventEmitter();
  }

  put = jest.fn();
}
