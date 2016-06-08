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

  PUT_PATIENT,
  requestPutPatient,
  successPutPatient,
  failurePutPatient,

  PUT_RECORD,
  requestPutRecord,
  successPutRecord,
  failurePutRecord,
} from '../actions'
import { db } from '../db'

function pouchFetchPatientList() {
  return db.allDocs({
      include_docs: true,
      startkey: 'patient_',
      endkey: 'patient_\uffff',
    })
    .then(res => res.rows.map(r => r.doc))
}

function* fetchPatientList() {
  yield put(requestFetchPatientList())
  try {
    const patientList = yield call(pouchFetchPatientList)
    yield put(successFetchPatientList(patientList))
  } catch (error) {
    yield put(failureFetchPatientList(error))
  }
}

function* watchFetchPatientList() {
  yield* takeLatest(FETCH_PATIENT_LIST, fetchPatientList)
}

function pouchFetchPatient(patientId) {
  return db.get(patientId)
    .then(res => res)
}

function pouchFetchRecords(patientId) {
  const patientIdBody = patientId.replace(/^patient_/, '')
  const idPrefix = `record_${patientIdBody}_`
  return db.allDocs({
      startkey: idPrefix,
      endkey: idPrefix + '\uffff',
      include_docs: true,
    })
    .then(res => res.rows.map(r => r.doc))
}

function* fetchPatient(action) {
  yield put(requestFetchPatient())
  try {
    const patient = yield call(pouchFetchPatient, action.patientId)
    const records = yield call(pouchFetchRecords, action.patientId)
    yield put(successFetchPatient(patient, records))
  } catch (error) {
    yield put(failureFetchPatient(error))
  }
}

function* watchFetchPatient() {
  yield* takeLatest(FETCH_PATIENT, fetchPatient)
}

function pouchPutPatient(patient) {
  return db.put(patient)
    .then(res => res)
}

function* putPatient(action) {
  yield put(requestPutPatient())
  try {
    yield call(pouchPutPatient, action.patient)
    yield put(successPutPatient())
  } catch (error) {
    yield put(failurePutPatient(error))
  }
}

function* watchPutPatient() {
  yield* takeEvery(PUT_PATIENT, putPatient)
}

const pouchPutRecord = pouchPutPatient

function* putRecord(action) {
  yield put(requestPutRecord())
  try {
    yield call(pouchPutRecord, action.record)
    yield put(successPutRecord())
  } catch (error) {
    yield put(failurePutRecord(error))
  }
}

function* watchPutRecord() {
  yield* takeEvery(PUT_RECORD, putRecord)
}

export default function* rootSaga() {
  yield fork(watchFetchPatientList)
  yield fork(watchFetchPatient)
  yield fork(watchPutPatient)
  yield fork(watchPutRecord)
}
