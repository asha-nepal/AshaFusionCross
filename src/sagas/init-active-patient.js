import { take, put, call } from 'redux-saga/effects';
import {
  INIT_ACTIVE_PATIENT,
  changeActivePatient,
  resetActiveRecords,
} from '../actions';
import {
  createId,
} from '../utils';

export function* initActivePatient() {
  const id = createId(16);
  yield put(changeActivePatient({
    _id: `patient_${id}`,
    type: 'patient',
  }, {
    silent: true,
  }));
  yield put(resetActiveRecords());
}

export function* watchInitActivePatient() {
  while (true) {
    yield take(INIT_ACTIVE_PATIENT);
    yield call(initActivePatient);
  }
}
