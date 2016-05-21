import { takeLatest, takeEvery } from 'redux-saga'
import { take, put, call, fork, select } from 'redux-saga/effects'
import {
  FETCH_PATIENT_LIST,
  requestFetchPatientList,
  successFetchPatientList,
  failureFetchPatientList,

  FETCH_PATIENT_DATA,
  requestFetchPatientData,
  successFetchPatientData,
  failureFetchPatientData,
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

function pouchFetchPatientData(patientId) {
  return db.get(patientId)
    .then(res => res)
}

export function* fetchPatientData(action) {
  yield put(requestFetchPatientData())
  try {
    const patientData = yield call(pouchFetchPatientData, action.patientId)
    yield put(successFetchPatientData(patientData))
  } catch (error) {
    yield put(failureFetchPatientData(error))
  }
}

export function* watchFetchPatientData() {
  yield* takeLatest(FETCH_PATIENT_DATA, fetchPatientData)
}

export default function* rootSaga() {
  yield fork(watchFetchPatientList)
  yield fork(watchFetchPatientData)
}
