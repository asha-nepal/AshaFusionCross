import { take, put, call, select } from 'redux-saga/effects';
import { browserHistory } from 'react-router';
import {
  PUT_ACTIVE_PATIENT,
  requestPutPatient,
  successPutPatient,
  failurePutPatient,
  changeActivePatient,
  addNewActiveRecord,
  alertInfo,
  alertError,
} from '../actions';

export function* putActivePatient(db: PouchInstance) {
  yield put(requestPutPatient());

  const patient = yield select(state => state.activePatient);
  const records = yield select(state => state.activeRecords);
  const { loggedInUser } = yield select(state => state.auth);

  const now = (new Date()).getTime();  // Unix Millisecond Timestamp

  try {
    const res = yield call([db, db.put], {
      $created_at: now,
      $created_by: loggedInUser || null,
      ...patient,
      $updated_at: now,
      $updated_by: loggedInUser || null,
    });
    if (!res.ok || res.id !== patient._id) {
      throw new Error('Invalid response');
    }

    yield put(changeActivePatient({
      ...patient,
      _rev: res.rev,
    }, {
      silent: true,
    }));

    yield put(alertInfo('Patient data updated'));

    if (!records || records.length === 0) {
      yield put(addNewActiveRecord(patient._id));
    }

    // Router (No effect on native)
    yield call([browserHistory, browserHistory.replace], `/patient/${patient._id}`);

    yield put(successPutPatient());
  } catch (error) {
    const errmsg = error.name === 'forbidden' ? 'Forbidden' : 'Failed updating patient data';
    yield put(alertError(errmsg));
    yield put(failurePutPatient(error));
  }
}

export function* watchPutActivePatient() {
  while (true) {
    yield take(PUT_ACTIVE_PATIENT);
    const db = yield select(state => state.db.instance);
    yield call(putActivePatient, db);
  }
}
