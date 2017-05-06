import { take, put, call } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import {
  INIT_ACTIVE_PATIENT,
  requestFetchPatient,
  successFetchPatient,
  changeActivePatient,
  resetActiveRecords,
} from '../actions';
import randomstringPromise from 'randomstring';

export function* initActivePatient() {
  // FIXME:
  // requestFetchPatient, delay, and successFetchPatient are just work-around
  // to solve https://github.com/asha-nepal/AshaFusionCross/issues/419
  yield put(requestFetchPatient());
  yield call(delay, 100);

  const id = yield call(randomstringPromise, 16);
  yield put(changeActivePatient({
    _id: `patient_${id}`,
    type: 'patient',
  }, {
    silent: true,
  }));
  yield put(resetActiveRecords());

  yield put(successFetchPatient());
}

export function* watchInitActivePatient() {
  while (true) {
    yield take(INIT_ACTIVE_PATIENT);
    yield call(initActivePatient);
  }
}
