import { take, put, call } from 'redux-saga/effects';
import {
  INIT_ACTIVE_PATIENT,
  setActivePatient,
  resetActiveRecords,
} from '../actions';
import {
  createId,
} from '../utils';

export function* initActivePatient() {
  const id = createId(16);
  yield put(setActivePatient({
    _id: `patient_${id}`,
    type: 'patient',
  }));
  yield put(resetActiveRecords());
}

export function* watchInitActivePatient() {
  while (true) {
    yield take(INIT_ACTIVE_PATIENT);
    yield call(initActivePatient);
  }
}
