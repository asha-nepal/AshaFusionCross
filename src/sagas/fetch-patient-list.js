import { take, put, call } from 'redux-saga/effects';
import {
  FETCH_PATIENT_LIST,
  requestFetchPatientList,
  successFetchPatientList,
  failureFetchPatientList,
  alertInfo,
  alertError,
} from '../actions';

import { db } from '../db';

function pouchFetchPatientList() {
  return db.allDocs({
    include_docs: true,
    startkey: 'patient_',
    endkey: 'patient_\uffff',
  })
  .then(res => res.rows.map(r => r.doc));
}

export function* fetchPatientList() {
  yield put(requestFetchPatientList());
  try {
    const patientList = yield call(pouchFetchPatientList);
    yield put(alertInfo('Patient list loaded'));
    yield put(successFetchPatientList(patientList));
  } catch (error) {
    yield put(alertError('Failed loading patient list'));
    yield put(failureFetchPatientList(error));
  }
}

export function* watchFetchPatientList() {
  while (true) {
    yield take(FETCH_PATIENT_LIST);
    yield call(fetchPatientList);
  }
}
