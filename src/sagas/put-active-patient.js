import { take, put, call, select } from 'redux-saga/effects';
import {
  PUT_ACTIVE_PATIENT,
  requestPutPatient,
  successPutPatient,
  failurePutPatient,
  alertInfo,
  alertError,
} from '../actions';

import { db } from '../db';

export function* putActivePatient() {
  yield put(requestPutPatient());

  const patient = yield select(state => state.activePatient);

  try {
    yield call([db, db.put], patient);
    yield put(alertInfo('Patient data updated'));
    yield put(successPutPatient());
  } catch (error) {
    yield put(alertError('Failed updating patient data'));
    yield put(failurePutPatient(error));
  }
}

export function* watchPutActivePatient() {
  while (true) {
    yield take(PUT_ACTIVE_PATIENT);
    yield call(putActivePatient);
  }
}
