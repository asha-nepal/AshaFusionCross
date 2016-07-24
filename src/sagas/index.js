import { fork } from 'redux-saga/effects';

import { watchFetchPatientList } from './fetch-patient-list';
import { watchFetchPatient } from './fetch-patient';
import { watchPutActivePatient } from './put-active-patient';
import { watchPutActiveRecord } from './put-active-record';
import { watchInitActivePatient } from './init-active-patient';
import { watchAddNewActiveRecord } from './add-new-active-record';
import { watchConnectPouchDB } from './connect-pouchdb';
import { watchPushAlert } from './alerts';

export default function* rootSaga() {
  yield fork(watchFetchPatientList);
  yield fork(watchFetchPatient);
  yield fork(watchPutActivePatient);
  yield fork(watchPutActiveRecord);
  yield fork(watchInitActivePatient);
  yield fork(watchAddNewActiveRecord);
  yield fork(watchConnectPouchDB);
  yield fork(watchPushAlert);
}
