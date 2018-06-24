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

/* eslint-env jest, jasmine */

import { call } from 'redux-saga/effects';
import {
  formatHostname,
  watchOnPouchChanges,
} from '../index';
import handlePouchChanges from '../handle-pouch-changes';

jest.unmock('redux-saga/effects');
jest.unmock('../index');
jest.mock('../handle-pouch-changes', () => jest.fn());

describe('formatHostname', () => {
  it('does nothing if scheme provided', () => {
    expect(formatHostname('http://example.com'))
      .toEqual('http://example.com');
    expect(formatHostname('https://example.com'))
      .toEqual('https://example.com');
    expect(formatHostname('https://example.com:6789'))
      .toEqual('https://example.com:6789');
  });

  it('adds http:// if protocol not provided', () => {
    expect(formatHostname('example.com'))
      .toEqual('http://example.com');
    expect(formatHostname('example.com:6789'))
      .toEqual('http://example.com:6789');
  });

  it('removes "/" at the end', () => {
    expect(formatHostname('example.com/'))
      .toEqual('http://example.com');
    expect(formatHostname('http://example.com/'))
      .toEqual('http://example.com');
    expect(formatHostname('http://example.com:6789/'))
      .toEqual('http://example.com:6789');
  });
});

describe('watchOnPouchChanges', () => {
  it('updates patient or record data when changes event emitted', () => {
    const db = jest.fn();

    const saga = watchOnPouchChanges(db);

    const channelRetval = {
      type: 'change',
      payload: {
        change: { foo: 'bar' },
      },
    };

    saga.next();
    saga.next(jest.fn());
    expect(saga.next(channelRetval).value)
      .toEqual(call(handlePouchChanges, { foo: 'bar' }));
  });
});
