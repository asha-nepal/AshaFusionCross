/**
 * Copyright 2016-2017 Yuichiro Tsuchiya
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
jest.unmock('../remove-active-patient');
jest.unmock('../../actions');

import { put, call } from 'redux-saga/effects';
import PouchDB from 'lib/pouchdb';
import {
  requestRemovePatient,
  successRemovePatient,
  failureRemovePatient,
  alertError,
} from '../../actions';
import {
  removeActivePatient,
} from '../remove-active-patient';

describe('removeActivePatient', () => {
  it('calls db.bulkDocs to remove patient and all related records at once', () => {
    const db = new PouchDB();
    const cb = jest.fn();
    const mockPatient = {
      _id: 'patient_1234',
      _rev: '2-hogehoge',
      hoge: 'fuga',
    };
    const mockRecords = [
      {
        _id: 'record_1234_8888',
        _rev: '2-yoyo',
        yo: 'ho',
      },
      {
        _id: 'record_1234_9999',
        _rev: '2-yoyoyoyo',
        yo: 'hoho',
      },
    ];
    const mockResponse = [
      { id: 'patient_1234', ok: true, rev: 'revrevrev' },
      { id: 'record_1234_8888', ok: true, rev: 'revrevrev' },
      { id: 'record_1234_9999', ok: true, rev: 'revrevrev' },
    ];

    const saga = removeActivePatient(db, cb);

    expect(saga.next().value)
      .toEqual(put(requestRemovePatient()));

    saga.next();
    saga.next(mockPatient);
    expect(saga.next(mockRecords).value)
      .toEqual(call([db, db.bulkDocs], [
        {
          _id: 'patient_1234',
          _rev: '2-hogehoge',
          hoge: 'fuga',
          _deleted: true,
        },
        {
          _id: 'record_1234_8888',
          _rev: '2-yoyo',
          yo: 'ho',
          _deleted: true,
        },
        {
          _id: 'record_1234_9999',
          _rev: '2-yoyoyoyo',
          yo: 'hoho',
          _deleted: true,
        },
      ]));

    saga.next(mockResponse);

    expect(saga.next().value)
      .toEqual(put(successRemovePatient()));

    expect(cb).toBeCalled();

    expect(saga.next())
      .toEqual({ done: true, value: undefined });
  });

  it('does not handle unpushed records', () => {
    const db = new PouchDB();
    const mockPatient = {
      _id: 'patient_1234',
      _rev: '2-hogehoge',
      hoge: 'fuga',
    };
    const mockRecords = [
      {
        _id: 'record_1234_8888',
        yo: 'ho',
      },
      {
        _id: 'record_1234_9999',
        _rev: '2-yoyoyoyo',
        yo: 'hoho',
      },
    ];

    const saga = removeActivePatient(db);

    expect(saga.next().value)
      .toEqual(put(requestRemovePatient()));

    saga.next();
    saga.next(mockPatient);
    expect(saga.next(mockRecords).value)
      .toEqual(call([db, db.bulkDocs], [
        {
          _id: 'patient_1234',
          _rev: '2-hogehoge',
          hoge: 'fuga',
          _deleted: true,
        },
        {
          _id: 'record_1234_9999',
          _rev: '2-yoyoyoyo',
          yo: 'hoho',
          _deleted: true,
        },
      ]));
  });

  it('alerts if db.bulkDocs throws an error', () => {
    const db = new PouchDB();
    const mockError = {};
    const saga = removeActivePatient(db);

    expect(saga.next().value)
      .toEqual(put(requestRemovePatient()));

    saga.next();
    saga.next();
    saga.next();
    expect(saga.throw(mockError).value)
      .toEqual(put(alertError('Failed removing patient data')));

    expect(saga.next().value)
      .toEqual(put(failureRemovePatient(mockError)));
  });

  it('alerts if db.bulkDocs returns invalid response about removing a patient', () => {
    const db = new PouchDB();
    const mockResponse = [
      { id: 'patient_1234', ok: false },
      { id: 'record_1234_8888', ok: true, rev: 'revrevrev' },
      { id: 'record_1234_9999', ok: true, rev: 'revrevrev' },
    ];

    const saga = removeActivePatient(db);

    expect(saga.next().value)
      .toEqual(put(requestRemovePatient()));

    saga.next();
    saga.next();
    saga.next();

    expect(saga.next(mockResponse).value)
      .toEqual(put(alertError('Failed removing patient data')));
  });

  it('alerts if db.bulkDocs returns error response about removing a patient', () => {
    const db = new PouchDB();
    const mockResponse = [
      { id: 'patient_1234', ok: true, error: true, name: 'forbidden' },
      { id: 'record_1234_8888', ok: true, rev: 'revrevrev' },
      { id: 'record_1234_9999', ok: true, rev: 'revrevrev' },
    ];

    const saga = removeActivePatient(db);

    expect(saga.next().value)
      .toEqual(put(requestRemovePatient()));

    saga.next();
    saga.next();
    saga.next();

    expect(saga.next(mockResponse).value)
      .toEqual(put(alertError('Forbidden')));
  });

  it('ignore invalid response about removing a record', () => {
    const db = new PouchDB();
    const cb = jest.fn();
    const mockResponse = [
      { id: 'patient_1234', ok: true, rev: 'revrevrev' },
      { id: 'record_1234_8888', ok: false },
      { id: 'record_1234_9999', ok: true, rev: 'revrevrev' },
    ];

    const saga = removeActivePatient(db, cb);

    expect(saga.next().value)
      .toEqual(put(requestRemovePatient()));

    saga.next();
    saga.next();
    saga.next();

    saga.next(mockResponse);

    saga.next();

    expect(cb).toBeCalled();
  });
});
