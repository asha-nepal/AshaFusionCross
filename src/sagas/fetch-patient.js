import { take, put, call } from 'redux-saga/effects';
import {
  FETCH_PATIENT,
  requestFetchPatient,
  successFetchPatient,
  failureFetchPatient,
  setActivePatient,
  setActiveRecords,
  selectActiveRecord,
} from '../actions';

import { db } from '../db';

function pouchFetchPatient(patientId) {
  return db.get(patientId)
    .then(res => res);
}

function pouchFetchRecords(patientId) {
  const patientIdBody = patientId.replace(/^patient_/, '');
  const idPrefix = `record_${patientIdBody}_`;
  return db.allDocs({
    startkey: idPrefix,
    endkey: `${idPrefix}\uffff`,
    include_docs: true,
  })
  .then(res => res.rows.map(r => r.doc));
}

export function* fetchPatient(patientId) {
  yield put(requestFetchPatient());
  try {
    const patient = yield call(pouchFetchPatient, patientId);
    const records = yield call(pouchFetchRecords, patientId);
    yield put(setActivePatient(patient));
    yield put(setActiveRecords(records));
    yield put(successFetchPatient());
    if (records && records.length > 0) {
      yield put(selectActiveRecord(records[records.length - 1]._id));
    }
  } catch (error) {
    yield put(failureFetchPatient(error));
  }
}

export function* watchFetchPatient() {
  while (true) {
    const { patientId } = yield take(FETCH_PATIENT);
    yield call(fetchPatient, patientId);
  }
}
