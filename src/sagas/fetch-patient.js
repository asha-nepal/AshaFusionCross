import { take, put, call } from 'redux-saga/effects';
import {
  FETCH_PATIENT,
  requestFetchPatient,
  successFetchPatient,
  failureFetchPatient,
  setActivePatient,
  setActiveRecords,
  selectActiveRecord,
  alertInfo,
  alertError,
} from '../actions';

import { db } from '../db';

export function* fetchPatient(patientId) {
  yield put(requestFetchPatient());
  try {
    // Prepare queries
    const patientIdBody = patientId.replace(/^patient_/, '');
    const idPrefix = `record_${patientIdBody}_`;
    const recordsQuery = {
      startkey: idPrefix,
      endkey: `${idPrefix}\uffff`,
      include_docs: true,
    };

    // call fetching APIs
    const patient = yield call([db, db.get], patientId);
    const recordDocs = yield call([db, db.allDocs], recordsQuery);
    const records = recordDocs.rows.map(r => r.doc);
    yield put(setActivePatient(patient));
    yield put(setActiveRecords(records));
    yield put(alertInfo('Patient data and records loaded'));
    yield put(successFetchPatient());
    if (records && records.length > 0) {
      yield put(selectActiveRecord(records[records.length - 1]._id));
    }
  } catch (error) {
    yield put(alertError('Failed loading patient data and records'));
    yield put(failureFetchPatient(error));
  }
}

export function* watchFetchPatient() {
  while (true) {
    const { patientId } = yield take(FETCH_PATIENT);
    yield call(fetchPatient, patientId);
  }
}
