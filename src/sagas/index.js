import { fork } from 'redux-saga/effects';

import { watchFetchPatientList } from './fetch-patient-list';
import { watchFetchPatient } from './fetch-patient';
import { watchPutPatient } from './put-patient';
import { watchPutRecord } from './put-record';
import { watchInitActivePatient } from './init-active-patient';
import { watchAddNewActiveRecord } from './add-new-active-record';
import { watchConnectPouchDB } from './connect-pouchdb';

export default function* rootSaga() {
  yield fork(watchFetchPatientList);
  yield fork(watchFetchPatient);
  yield fork(watchPutPatient);
  yield fork(watchPutRecord);
  yield fork(watchInitActivePatient);
  yield fork(watchAddNewActiveRecord);
  yield fork(watchConnectPouchDB);
}
