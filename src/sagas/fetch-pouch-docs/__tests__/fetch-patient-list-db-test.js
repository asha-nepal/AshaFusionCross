/* eslint-env jest */
/* eslint-env jasmine */

jest.disableAutomock();
jest.unmock('pouchdb');
jest.unmock('../fetch-patient-list');

import PouchDB from 'pouchdb';
PouchDB.plugin(require('pouchdb-adapter-memory'));
import {
  pouchFetchPatientList,
  reduceRecordsAndSetLastRecordUpdatedAt,
} from '../fetch-patient-list';

const objectContaining = jasmine.objectContaining;

describe('pouchFetchPatientList', () => {
  let db;

  beforeEach(() => {
    db = new PouchDB('test', { adapter: 'memory' });
  });

  afterEach((done) => {
    db.destroy().then(done);
  });

  it('fetches patients and records and set patient.$last_record_updated_at', (done) => {
    db.query = jest.fn(db.query);
    db.put = jest.fn(db.put);

    db.bulkDocs([
      { _id: 'patient_aaa' },
      { _id: 'record_aaa_0', $updated_at: 1234 },
      { _id: 'record_aaa_1', $updated_at: 5678 },
      { _id: 'patient_zzz' },
    ])
    // First time
    .then(() => pouchFetchPatientList(db))
    .then(records => {
      expect(records).toEqual([
        objectContaining({ _id: 'patient_aaa', $last_record_updated_at: 5678 }),
        objectContaining({ _id: 'patient_zzz' }),
      ]);
      expect(db.query.mock.calls.length).toBe(2);
      expect(db.put).toBeCalled();

      db.query.mockClear();
      db.put.mockClear();
    })
    // Second time
    .then(() => pouchFetchPatientList(db))
    .then(records => {
      expect(records).toEqual([
        objectContaining({ _id: 'patient_aaa', $last_record_updated_at: 5678 }),
        objectContaining({ _id: 'patient_zzz' }),
      ]);
      expect(db.query.mock.calls.length).toBe(1);
      expect(db.put).not.toBeCalled();

      db.query.mockClear();
      db.put.mockClear();
    })
    .catch(err => done.fail(err))
    .then(done);
  });
});

describe('reduceRecordsAndSetLastRecordUpdatedAt', () => {
  it('sets patient.$last_record_updated_at', () => {
    // It is assumed that PouchDB.query() returns the result of the following form
    const pouchFetchResult = {
      rows: [
        {
          key: ['patient_1', null, null],
          doc: { _id: 'patient_1' },
        },
        {
          key: ['record_1_1', 1100, 1101],
          doc: {},
        },
        {
          key: ['record_1_2', 1200, 1201],
          doc: {},
        },
        {
          key: ['patient_2', null, null],
          doc: { _id: 'patient_2' },
        },
        {
          key: ['record_2_1', 2100, null],
          doc: {},
        },
        {
          key: ['record_2_2', 2200, null],
          doc: {},
        },
      ],
    };

    const result = reduceRecordsAndSetLastRecordUpdatedAt(pouchFetchResult);

    const expected = [
      { _id: 'patient_1', $last_record_updated_at: 1201 },
      { _id: 'patient_2', $last_record_updated_at: 2200 },
    ];

    expect(result).toEqual(expected);
  });
});
