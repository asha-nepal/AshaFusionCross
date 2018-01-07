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

jest.unmock('redux-saga/effects');
jest.unmock('../put-active-record');
jest.unmock('../../actions');
jest.unmock('mockdate');

import deepFreeze from 'deep-freeze';
import MockDate from 'mockdate';
import { put, call } from 'redux-saga/effects';
import PouchDB from 'lib/pouchdb';

import {
  requestPutRecord,
  successPutRecord,
  failurePutRecord,
  changeActiveRecord,
  setActiveRecordPristine,
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
    const db = new PouchDB();
    const mockIndex = 42;
    const mockRecord = {
      _id: 'record_mocked',
      hoge: 'hoge',
    };
    deepFreeze(mockRecord);
    const mockResponse = {
      ok: true,
      id: 'record_mocked',
      rev: '2-a147c1a7e2a186da6f0797743a95e240',
    };
    const mockAuth = {};

    const saga = putActiveRecord(db, mockIndex);

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

    expect(saga.next(mockResponse).value)
      .toEqual(put(changeActiveRecord(mockIndex, {
        ...mockRecord,
        _rev: '2-a147c1a7e2a186da6f0797743a95e240',
      }, {
        silent: true,
      })));

    expect(saga.next().value)
      .toEqual(put(setActiveRecordPristine(mockIndex)));

    expect(saga.next().value)
      .toEqual(put(alertInfo('Record updated')));

    expect(saga.next().value)
      .toEqual(put(successPutRecord()));

    expect(saga.next())
      .toEqual({ done: true, value: undefined });
  });

  it('does not update $created_at if already exists', () => {
    const db = new PouchDB();
    const mockRecord = {
      _id: 'record_mocked',
      $created_at: 1000,
      hoge: 'hoge',
    };
    deepFreeze(mockRecord);
    const mockAuth = {};

    const saga = putActiveRecord(db);

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
  });

  it('adds $created_by and $updated_by if logged in', () => {
    const db = new PouchDB();
    const mockRecord = {
      _id: 'record_mocked',
      hoge: 'hoge',
    };
    deepFreeze(mockRecord);

    const mockAuth = {
      loggedInUser: 'dummyuser',
    };
    deepFreeze(mockAuth);

    const saga = putActiveRecord(db);

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
  });

  it('does not update $created_by if already exists', () => {
    const db = new PouchDB();
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

    const saga = putActiveRecord(db);

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
    const db = new PouchDB();
    const mockRecord = {
      _id: 'record_mocked',
      hoge: 'hoge',
    };
    deepFreeze(mockRecord);

    const mockAuth = {};
    deepFreeze(mockAuth);

    const saga = putActiveRecord(db);

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
    const db = new PouchDB();
    const mockRecord = {};
    const mockAuth = {};
    const mockError = {};

    const saga = putActiveRecord(db);

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

  it('shows forbidden message for 403 error', () => {
    const db = new PouchDB();
    const mockRecord = {};
    const mockAuth = {};
    const mockError = {
      name: 'forbidden',
    };

    const saga = putActiveRecord(db);

    expect(saga.next().value)
      .toEqual(put(requestPutRecord()));

    saga.next();
    saga.next(mockAuth);
    saga.next(mockRecord);

    expect(saga.throw(mockError).value)
      .toEqual(put(alertError('Forbidden')));

    expect(saga.next().value)
      .toEqual(put(failurePutRecord(mockError)));
  });

  it('handles invalid response as error', () => {
    const db = new PouchDB();
    const mockRecord = {
      _id: 'record_mocked',
      hoge: 'hoge',
    };
    deepFreeze(mockRecord);
    const mockAuth = {};
    const mockResponse = { ok: false };

    const saga = putActiveRecord(db);

    expect(saga.next().value)
      .toEqual(put(requestPutRecord()));

    saga.next();
    saga.next();
    saga.next(mockAuth);

    expect(saga.next(mockResponse).value)
      .toEqual(put(alertError('Failed updating record')));

    expect(saga.next().value)
      .toEqual(put(failurePutRecord(new Error('Invalid response'))));

    expect(saga.next())
      .toEqual({ done: true, value: undefined });
  });
});
