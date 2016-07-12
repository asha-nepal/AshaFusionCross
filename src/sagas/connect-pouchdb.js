import { take, call } from 'redux-saga/effects';
import {
  CONNECT_POUCHDB,
} from '../actions';
import {
  fetchPatientList,
} from './fetch-patient-list';
import {
  connect,
} from '../db';

export function* watchConnectPouchDB() {
  while (true) {
    const { config } = yield take(CONNECT_POUCHDB);
    yield call(connect, config);
    yield call(fetchPatientList);
  }
}
