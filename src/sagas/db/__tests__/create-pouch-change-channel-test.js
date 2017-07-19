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
