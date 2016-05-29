import { takeLatest, takeEvery } from 'redux-saga'
import { take, put, call, fork, select } from 'redux-saga/effects'
import {
  FETCH_PATIENT_LIST,
  requestFetchPatientList,
  successFetchPatientList,
  failureFetchPatientList,

  FETCH_PATIENT,
  requestFetchPatient,
  successFetchPatient,
  failureFetchPatient,
} from '../actions'
import { db } from '../db'

function pouchFetchPatientList() {
  return db.allDocs({include_docs: true})
    .then(res => res.rows.map(r => r.doc))
}

export function* fetchPatientList() {
  yield put(requestFetchPatientList())
  try {
    const patientList = yield call(pouchFetchPatientList)
    yield put(successFetchPatientList(patientList))
  } catch (error) {
    yield put(failureFetchPatientList(error))
  }
}

export function* watchFetchPatientList() {
  yield* takeLatest(FETCH_PATIENT_LIST, fetchPatientList)
}

function pouchFetchPatient(patientId) {
  return db.get(patientId)
    .then(res => res)
}

export function* fetchPatient(action) {
  yield put(requestFetchPatient())
  try {
    const patient = yield call(pouchFetchPatient, action.patientId)
    yield put(successFetchPatient(patient))
  } catch (error) {
    yield put(failureFetchPatient(error))
  }
}

export function* watchFetchPatient() {
  yield* takeLatest(FETCH_PATIENT, fetchPatient)
}

export default function* rootSaga() {
  yield fork(watchFetchPatientList)
  yield fork(watchFetchPatient)
}
