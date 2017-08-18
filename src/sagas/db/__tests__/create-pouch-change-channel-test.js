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

import EventEmitter from 'events';

jest.unmock('../create-pouch-change-channel');

import { eventChannel } from 'redux-saga';
import createPouchChangeChannel from '../create-pouch-change-channel';

const emit = jest.fn();
eventChannel.mockImplementation((factory) => {
  factory(emit);
});

describe('createPouchChangeChannel', () => {
  beforeEach(() => {
    const db = jest.fn();
    db.changes = jest.fn();

    const feed = new EventEmitter();
    feed.cancel = jest.fn();
    db.changes.mockReturnValue(feed);

    this.db = db;
    this.feed = feed;
  });

  it('retries after ETIMEDOUT error', () => {
    // First db.changes() starts
    createPouchChangeChannel(this.db);
    expect(this.db.changes.mock.calls.length).toBe(1);

    // Next db.changes() starts when ETIMEDOUT occurs
    const errorTimedout = new Error('ETIMEDOUT');
    errorTimedout.code = 'ETIMEDOUT';
    this.feed.emit('error', errorTimedout);

    expect(this.db.changes.mock.calls.length).toBe(2);
    expect(this.feed.cancel.mock.calls.length).toBe(1);
    expect(emit).not.toBeCalled();
  });

  it('emits at change event', () => {
    createPouchChangeChannel(this.db);

    this.feed.emit('change', { foo: 'bar' });

    expect(emit).toBeCalledWith({
      type: 'change',
      payload: {
        change: { foo: 'bar' },
      },
    });
  });
});
