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
  it('retries after ETIMEDOUT error', () => {
    const db = jest.fn();
    db.changes = jest.fn();

    const feed = new EventEmitter();
    feed.cancel = jest.fn();
    db.changes.mockReturnValue(feed);

    // First db.changes() starts
    createPouchChangeChannel(db);
    expect(db.changes.mock.calls.length).toBe(1);

    // Next db.changes() starts when ETIMEDOUT occurs
    const errorTimedout = new Error('ETIMEDOUT');
    errorTimedout.code = 'ETIMEDOUT';
    feed.emit('error', errorTimedout);

    expect(db.changes.mock.calls.length).toBe(2);
    expect(feed.cancel.mock.calls.length).toBe(1);
    expect(emit).not.toBeCalled();
  });
});
