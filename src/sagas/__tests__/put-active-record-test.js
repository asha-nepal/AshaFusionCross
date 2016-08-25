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
    const mockAuth = {};

    const saga = putActiveRecord();

    expect(saga.next().value)
      .toEqual(put(requestPutRecord()));

    saga.next();

    saga.next(mockRecord);

    expect(saga.next(mockAuth).value)
      .toEqual(call([db, db.put], {
        ...mockRecord,
        $created_at: mockCurrentTime,
        $updated_at: mockCurrentTime,
        $created_by: null,
        $updated_by: null,
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
    const mockAuth = {};

    const saga = putActiveRecord();

    expect(saga.next().value)
      .toEqual(put(requestPutRecord()));

    saga.next();
    saga.next(mockRecord);

    expect(saga.next(mockAuth).value)
      .toEqual(call([db, db.put], {
        ...mockRecord,
        $updated_at: mockCurrentTime,
        $created_by: null,
        $updated_by: null,
      }));

    expect(saga.next().value)
      .toEqual(put(alertInfo('Record updated')));

    expect(saga.next().value)
      .toEqual(put(successPutRecord()));

    expect(saga.next())
      .toEqual({ done: true, value: undefined });
  });

  it('adds $created_by and $updated_by if logged in', () => {
    const mockRecord = {
      _id: 'record_mocked',
      hoge: 'hoge',
    };
    deepFreeze(mockRecord);

    const mockAuth = {
      loggedInUser: 'dummyuser',
    };
    deepFreeze(mockAuth);

    const saga = putActiveRecord();

    expect(saga.next().value)
      .toEqual(put(requestPutRecord()));

    saga.next();
    saga.next(mockRecord);

    expect(saga.next(mockAuth).value)
      .toEqual(call([db, db.put], {
        ...mockRecord,
        $created_at: mockCurrentTime,
        $updated_at: mockCurrentTime,
        $created_by: 'dummyuser',
        $updated_by: 'dummyuser',
      }));

    expect(saga.next().value)
      .toEqual(put(alertInfo('Record updated')));

    expect(saga.next().value)
      .toEqual(put(successPutRecord()));

    expect(saga.next())
      .toEqual({ done: true, value: undefined });
  });

  it('does not update $created_by if already exists', () => {
    const mockRecord = {
      _id: 'record_mocked',
      $created_at: 1000,
      $created_by: 'originalcreator',
      hoge: 'hoge',
    };
    deepFreeze(mockRecord);
    const mockAuth = {
      loggedInUser: 'dummyuser',
    };

    const saga = putActiveRecord();

    expect(saga.next().value)
      .toEqual(put(requestPutRecord()));

    saga.next();
    saga.next(mockRecord);

    expect(saga.next(mockAuth).value)
      .toEqual(call([db, db.put], {
        ...mockRecord,
        $updated_at: mockCurrentTime,
        $updated_by: 'dummyuser',
      }));
  });

  it('$created_by and $updated_by are null if undefined', () => {
    const mockRecord = {
      _id: 'record_mocked',
      hoge: 'hoge',
    };
    deepFreeze(mockRecord);

    const mockAuth = {};
    deepFreeze(mockAuth);

    const saga = putActiveRecord();

    expect(saga.next().value)
      .toEqual(put(requestPutRecord()));

    saga.next();
    saga.next(mockRecord);

    expect(saga.next(mockAuth).value)
      .toEqual(call([db, db.put], {
        ...mockRecord,
        $created_at: mockCurrentTime,
        $updated_at: mockCurrentTime,
        $created_by: null,
        $updated_by: null,
      }));
  });

  it('handles error', () => {
    const mockRecord = {};
    const mockAuth = {};
    const mockError = {};

    const saga = putActiveRecord();

    expect(saga.next().value)
      .toEqual(put(requestPutRecord()));

    saga.next();

    saga.next(mockAuth);

    saga.next(mockRecord);

    expect(saga.throw(mockError).value)
      .toEqual(put(alertError('Failed updating record')));

    expect(saga.next().value)
      .toEqual(put(failurePutRecord(mockError)));
  });
});
