import { take, put, call, select } from 'redux-saga/effects';
import {
  FETCH_PATIENT_LIST,
  requestFetchPatientList,
  successFetchPatientList,
  failureFetchPatientList,
  alertInfo,
  alertError,
} from '../actions';

function pouchFetchPatientList(db: PouchInstance) {
  return db.allDocs({
    include_docs: true,
    startkey: 'patient_',
    endkey: 'patient_\uffff',
  })
  .then(res => res.rows.map(r => r.doc));
}

export function* fetchPatientList(db: PouchInstance) {
  yield put(requestFetchPatientList());
  try {
    const patientList = yield call(pouchFetchPatientList, db);
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
    const db = yield select(state => state.db.instance);
    yield call(fetchPatientList, db);
  }
}
