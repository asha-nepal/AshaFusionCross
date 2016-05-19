import { takeLatest, takeEvery } from 'redux-saga'
import { take, put, call, fork, select } from 'redux-saga/effects'
import {
  FETCH_PATIENT_LIST,
  requestFetchPatientList,
  successFetchPatientList,
  failureFetchPatientList,
  setPatientList,
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

export default function* rootSaga() {
  yield* takeLatest(FETCH_PATIENT_LIST, fetchPatientList);
}
