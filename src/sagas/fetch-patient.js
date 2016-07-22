import { takeLatest } from 'redux-saga';
import { put, call } from 'redux-saga/effects';
import { actions as formActions } from 'react-redux-form';
import {
  FETCH_PATIENT,
  requestFetchPatient,
  successFetchPatient,
  failureFetchPatient,
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

export function* fetchPatient(action) {
  yield put(requestFetchPatient());
  try {
    const patient = yield call(pouchFetchPatient, action.patientId);
    const records = yield call(pouchFetchRecords, action.patientId);
    yield put(formActions.change('activePatient', patient));
    yield put(formActions.change('activeRecords', records));
    yield put(successFetchPatient());
    if (records && records.length > 0) {
      yield put(selectActiveRecord(records[records.length - 1]._id));
    }
  } catch (error) {
    yield put(failureFetchPatient(error));
  }
}

export function* watchFetchPatient() {
  yield* takeLatest(FETCH_PATIENT, fetchPatient);
}
