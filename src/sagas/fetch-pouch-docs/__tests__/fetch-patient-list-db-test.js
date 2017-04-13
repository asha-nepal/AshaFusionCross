/* eslint-env jest */
/* eslint-env jasmine */

jest.disableAutomock();
jest.unmock('pouchdb');
jest.unmock('../fetch-patient-list');

import PouchDB from 'pouchdb';
PouchDB.plugin(require('pouchdb-adapter-memory'));
import {
  pouchFetchPatientList,
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
