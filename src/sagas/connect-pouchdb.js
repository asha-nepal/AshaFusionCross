import { take, call, fork } from 'redux-saga/effects'
import {
  CONNECT_POUCHDB,
} from '../actions'
import {
  fetchPatientList,
} from './fetch-patient-list'
import {
  connect,
} from '../db'

export function* watchConnectPouchDB() {
  while (true) {
    let {hostname, port, dbname} = yield take(CONNECT_POUCHDB)
    yield call(connect, hostname, port, dbname)
    yield call(fetchPatientList)
  }
}
