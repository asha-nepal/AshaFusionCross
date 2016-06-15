import { takeLatest, takeEvery } from 'redux-saga'
import { take, put, call, fork, select } from 'redux-saga/effects'
import {
  FETCH_PATIENT,
  requestFetchPatient,
  successFetchPatient,
  failureFetchPatient,
} from '../actions'

import { db } from '../db'

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

export function* fetchPatient(action) {
  yield put(requestFetchPatient())
  try {
    const patient = yield call(pouchFetchPatient, action.patientId)
    const records = yield call(pouchFetchRecords, action.patientId)
    yield put(successFetchPatient(patient, records))
  } catch (error) {
    yield put(failureFetchPatient(error))
  }
}

export function* watchFetchPatient() {
  yield* takeLatest(FETCH_PATIENT, fetchPatient)
}
