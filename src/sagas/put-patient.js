import { takeLatest, takeEvery } from 'redux-saga'
import { take, put, call, fork, select } from 'redux-saga/effects'
import {
  PUT_PATIENT,
  requestPutPatient,
  successPutPatient,
  failurePutPatient,
} from '../actions'

import { db } from '../db'

export function pouchPutPatient(patient) {
  return db.put(patient)
    .then(res => res)
}

export function* putPatient(action) {
  yield put(requestPutPatient())
  try {
    yield call(pouchPutPatient, action.patient)
    yield put(successPutPatient())
  } catch (error) {
    yield put(failurePutPatient(error))
  }
}

export function* watchPutPatient() {
  yield* takeLatest(PUT_PATIENT, putPatient)
}
