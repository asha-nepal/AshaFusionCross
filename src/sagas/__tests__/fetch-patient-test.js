/* eslint-env jest */

jest.unmock('redux-saga/effects');
jest.unmock('../../actions');
jest.unmock('../fetch-patient');

import { put, call } from 'redux-saga/effects';
import PouchDB from 'lib/pouchdb';

import {
  requestFetchPatient,
  successFetchPatient,
  failureFetchPatient,
  changeActivePatient,
  changeActiveRecords,
  selectActiveRecord,
  setActiveRecordPristine,
  alertInfo,
  alertError,
} from '../../actions';
import {
  fetchPatient,
} from '../fetch-patient';

describe('fetchPatient saga', () => {
  it('calls db.get() with specified id then set current active-record', () => {
    const db = new PouchDB();
    const mockPatientId = 'patient_1234';
    const mockFetchedPatient = {
      _id: 'patient_1234',
      hoge: 'fuga',
    };
    const mockFetchedRecordDocs = {
      total_rows: 123,
      offset: 42,
      rows: [
        { _id: 'record_1234_1000', doc: { _id: 'record_1234_1000', foo: 'bar' } },
        { _id: 'record_1234_2000', doc: { _id: 'record_1234_2000', yo: 'ho' } },
      ],
    };

    const saga = fetchPatient(db, mockPatientId);

    expect(saga.next().value)
      .toEqual(put(requestFetchPatient()));

    expect(saga.next().value)
      .toEqual(call([db, db.get], mockPatientId));

    expect(saga.next(mockFetchedPatient).value)
      .toEqual(call([db, db.allDocs], {
        startkey: 'record_1234_',
        endkey: 'record_1234_\uffff',
        include_docs: true,
      }));

    expect(saga.next(mockFetchedRecordDocs).value)
      .toEqual(put(changeActivePatient(mockFetchedPatient, { silent: true })));

    expect(saga.next().value)
      .toEqual(
        put(changeActiveRecords(mockFetchedRecordDocs.rows.map(r => r.doc), { silent: true }))
      );

    expect(saga.next().value)
      .toEqual(put(setActiveRecordPristine(0)));
    expect(saga.next().value)
      .toEqual(put(setActiveRecordPristine(1)));

    expect(saga.next().value)
      .toEqual(put(alertInfo('Patient data and records loaded')));

    expect(saga.next().value)
      .toEqual(put(successFetchPatient()));

    expect(saga.next().value)
      .toEqual(put(selectActiveRecord('record_1234_2000')));
  });

  it('handles error at fetching patient', () => {
    const db = new PouchDB();
    const mockPatientId = 'patient_1234';
    const mockError = {};

    const saga = fetchPatient(db, mockPatientId);

    expect(saga.next().value)
      .toEqual(put(requestFetchPatient()));

    expect(saga.next().value)
      .toEqual(call([db, db.get], mockPatientId));

    expect(saga.throw(mockError).value)
      .toEqual(put(alertError('Failed loading patient data and records')));

    expect(saga.next().value)
      .toEqual(put(failureFetchPatient(mockError)));
  });

  it('handles error at fetching records', () => {
    const db = new PouchDB();
    const mockPatientId = 'patient_1234';
    const mockError = {};
    const mockFetchedPatient = {
      _id: 'patient_1234',
      hoge: 'fuga',
    };

    const saga = fetchPatient(db, mockPatientId);

    expect(saga.next().value)
      .toEqual(put(requestFetchPatient()));

    expect(saga.next().value)
      .toEqual(call([db, db.get], mockPatientId));

    expect(saga.next(mockFetchedPatient).value)
      .toEqual(call([db, db.allDocs], {
        startkey: 'record_1234_',
        endkey: 'record_1234_\uffff',
        include_docs: true,
      }));

    expect(saga.throw(mockError).value)
      .toEqual(put(alertError('Failed loading patient data and records')));

    expect(saga.next().value)
      .toEqual(put(failureFetchPatient(mockError)));
  });
});
