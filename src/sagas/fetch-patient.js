import { take, put, call, select } from 'redux-saga/effects';
import {
  FETCH_PATIENT,
  requestFetchPatient,
  successFetchPatient,
  failureFetchPatient,
  changeActivePatient,
  changeActiveRecords,
  selectActiveRecord,
  alertInfo,
  alertError,
} from '../actions';

export function* fetchPatient(db: PouchInstance, patientId: string) {
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
    yield put(changeActivePatient(patient, { silent: true }));
    yield put(changeActiveRecords(records, { silent: true }));
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
    const db = yield select(state => state.db.instance);
    yield call(fetchPatient, db, patientId);
  }
}
