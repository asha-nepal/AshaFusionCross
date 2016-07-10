import { take, put, call, select } from 'redux-saga/effects';
import {
  PUT_ACTIVE_PATIENT,
  requestPutPatient,
  successPutPatient,
  failurePutPatient,
} from '../actions';

import { db } from '../db';

export function pouchPutPatient(patient) {
  return db.put(patient)
    .then(res => res);
}

export function* putActivePatient() {
  yield put(requestPutPatient());
  try {
    const patient = yield select(state => state.activePatient);
    yield call(pouchPutPatient, patient);
    yield put(successPutPatient());
  } catch (error) {
    yield put(failurePutPatient(error));
  }
}

export function* watchPutActivePatient() {
  while (true) {
    yield take(PUT_ACTIVE_PATIENT);
    yield call(putActivePatient);
  }
}
