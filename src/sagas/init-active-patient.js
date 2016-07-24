import { take, put, call } from 'redux-saga/effects';
import Chance from 'chance';
import {
  INIT_ACTIVE_PATIENT,
  setActivePatient,
  resetActiveRecords,
} from '../actions';

const chance = new Chance();
const idStringPool = '0123456789abcefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'; // URLセーフな文字のみ

export function* initActivePatient() {
  const id = chance.string({ pool: idStringPool, length: 16 });
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
