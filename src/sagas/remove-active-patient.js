import { take, put, call, select } from 'redux-saga/effects';
import {
  REMOVE_ACTIVE_PATIENT,
  requestRemovePatient,
  successRemovePatient,
  failureRemovePatient,
  alertInfo,
  alertError,
} from '../actions';

export function* removeActivePatient(db: PouchInstance, cb: ?() => void) {
  yield put(requestRemovePatient());

  const patient = yield select(state => state.activePatient);
  const records = yield select(state => state.activeRecords);

  const docsToRemove = [
    {
      ...patient,
      _deleted: true,
    },
    ...(records || []).filter(record => record._rev).map(record => ({
      ...record,
      _deleted: true,
    })),
  ];

  try {
    const res = yield call([db, db.bulkDocs], docsToRemove);

    // Patientさえ削除できていれば良い．Patient削除の成否をチェック
    if (res[0].error) {
      throw res[0];
    } else if (!res[0].ok) {
      throw new Error('Invalid response');
    }

    yield put(alertInfo('Patient data and related records removed'));

    if (typeof cb === 'function') { cb(); }

    yield put(successRemovePatient());
  } catch (error) {
    const errmsg = error.name === 'forbidden' ? 'Forbidden' : 'Failed removing patient data';
    yield put(alertError(errmsg));
    yield put(failureRemovePatient(error));
  }
}

export function* watchRemoveActivePatient() {
  while (true) {
    const { payload } = yield take(REMOVE_ACTIVE_PATIENT);
    const db = yield select(state => state.db.instance);
    yield call(removeActivePatient, db, payload.cb);
  }
}
