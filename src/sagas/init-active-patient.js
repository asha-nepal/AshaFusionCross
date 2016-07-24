import { takeLatest } from 'redux-saga';
import { put } from 'redux-saga/effects';
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
  yield* takeLatest(INIT_ACTIVE_PATIENT, initActivePatient);
}
