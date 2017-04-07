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

  afterEach(() => {
    db.destroy();
  });

  it('fetches patients and records and set patient.$last_record_updated_at', (done) => {
    db.bulkDocs([
      { _id: 'patient_aaa' },
      { _id: 'record_aaa_0', $updated_at: 1234 },
      { _id: 'record_aaa_1', $updated_at: 5678 },
      { _id: 'patient_zzz' },
    ])
    .then(() => pouchFetchPatientList(db))
    .then(records => {
      expect(records).toEqual([
        objectContaining({ _id: 'patient_aaa', $last_record_updated_at: 5678 }),
        objectContaining({ _id: 'patient_zzz' }),
      ]);
    })
    .catch(err => done.fail(err))
    .then(done);
  });
});
