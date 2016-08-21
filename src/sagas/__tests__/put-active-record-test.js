/* eslint-env jest, jasmine */

jest.unmock('redux-saga/effects');
jest.unmock('../put-active-record');
jest.unmock('../../actions');
jest.unmock('mockdate');

import deepFreeze from 'deep-freeze';
import MockDate from 'mockdate';
import { put, call } from 'redux-saga/effects';

import { db } from '../../db';
import {
  requestPutRecord,
  successPutRecord,
  failurePutRecord,
  alertInfo,
  alertError,
} from '../../actions';
import {
  putActiveRecord,
} from '../put-active-record';

describe('PUT_ACTIVE_RECORD', () => {
  const mockCurrentTime = 1234567890123;

  beforeEach(() => {
    MockDate.set(mockCurrentTime);
  });

  afterEach(() => {
    MockDate.reset();
  });

  it('calls db.put(record) with $created_at and $updated_at', () => {
    const mockRecord = {
      _id: 'record_mocked',
      hoge: 'hoge',
    };
    deepFreeze(mockRecord);

    const saga = putActiveRecord();

    expect(saga.next().value)
      .toEqual(put(requestPutRecord()));

    saga.next();

    expect(saga.next(mockRecord).value)
      .toEqual(call([db, db.put], {
        ...mockRecord,
        $created_at: mockCurrentTime,
        $updated_at: mockCurrentTime,
      }));

    expect(saga.next().value)
      .toEqual(put(alertInfo('Record updated')));

    expect(saga.next().value)
      .toEqual(put(successPutRecord()));

    expect(saga.next())
      .toEqual({ done: true, value: undefined });
  });

  it('does not update $created_at if already exists', () => {
    const mockRecord = {
      _id: 'record_mocked',
      $created_at: 1000,
      hoge: 'hoge',
    };
    deepFreeze(mockRecord);

    const saga = putActiveRecord();

    expect(saga.next().value)
      .toEqual(put(requestPutRecord()));

    saga.next();

    expect(saga.next(mockRecord).value)
      .toEqual(call([db, db.put], {
        ...mockRecord,
        $updated_at: mockCurrentTime,
      }));

    expect(saga.next().value)
      .toEqual(put(alertInfo('Record updated')));

    expect(saga.next().value)
      .toEqual(put(successPutRecord()));

    expect(saga.next())
      .toEqual({ done: true, value: undefined });
  });

  it('handles error', () => {
    const mockRecord = {};
    const mockError = {};

    const saga = putActiveRecord();

    expect(saga.next().value)
      .toEqual(put(requestPutRecord()));

    saga.next();

    saga.next(mockRecord);

    expect(saga.throw(mockError).value)
      .toEqual(put(alertError('Failed updating record')));

    expect(saga.next().value)
      .toEqual(put(failurePutRecord(mockError)));
  });
});
