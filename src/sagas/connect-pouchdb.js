import { take, call, select } from 'redux-saga/effects';
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
    yield take(CONNECT_POUCHDB);
    const config = yield select(state => state.pouchConfig);
    yield call(connect, config);
    yield call(fetchPatientList);
  }
}
