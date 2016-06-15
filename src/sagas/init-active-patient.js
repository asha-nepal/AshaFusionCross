import { takeLatest, takeEvery } from 'redux-saga'
import { take, put, call, fork, select } from 'redux-saga/effects'
import Chance from 'chance'
import {
  INIT_ACTIVE_PATIENT,
  updateActivePatient,
  setActiveRecords,
} from '../actions'

const chance = new Chance()
const idStringPool = '0123456789abcefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ' // URLセーフな文字のみ

export function* initActivePatient() {
  const id = chance.string({pool: idStringPool, length: 16})
  yield put(updateActivePatient({
    _id: `patient_${id}`,
    type: 'patient',
  }))
  yield put(setActiveRecords([]))
}

export function* watchInitActivePatient() {
  yield* takeLatest(INIT_ACTIVE_PATIENT, initActivePatient)
}
