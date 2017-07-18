/* eslint-env jest, jasmine */

jest.unmock('redux-saga/effects');
jest.unmock('../index');
jest.mock('../handle-changes', () => jest.fn());

import { call } from 'redux-saga/effects';
import {
  formatHostname,
  watchOnPouchChanges,
} from '../index';
import handlePouchChanges from '../handle-changes';

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
