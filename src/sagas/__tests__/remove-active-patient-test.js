/* eslint-env jest, jasmine */

jest.unmock('redux-saga/effects');
jest.unmock('../remove-active-patient');
jest.unmock('../../actions');

import PouchDB from 'pouchdb';
import { put, call } from 'redux-saga/effects';
import { browserHistory } from 'react-router';
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
      .toEqual(call([browserHistory, browserHistory.push], '/'));

    expect(saga.next().value)
      .toEqual(put(successRemovePatient()));

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
    const mockResponse = [
      { id: 'patient_1234', ok: true, rev: 'revrevrev' },
      { id: 'record_1234_8888', ok: false },
      { id: 'record_1234_9999', ok: true, rev: 'revrevrev' },
    ];

    const saga = removeActivePatient(db);

    expect(saga.next().value)
      .toEqual(put(requestRemovePatient()));

    saga.next();
    saga.next();
    saga.next();

    saga.next(mockResponse);

    expect(saga.next().value)
      .toEqual(call([browserHistory, browserHistory.push], '/'));
  });
});
