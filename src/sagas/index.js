import { fork, call, put, take, cancel } from 'redux-saga/effects';

import {
  loginSuccess,
  loginError,
  REQUEST_LOGIN,
  REQUEST_LOGOUT,
  LOGIN_ERROR,
  logoutSuccess,
  alertError,
  alertInfo,
} from '../actions';
import { db, startListening, stopListening } from '../db';

import { watchFetchPatientList } from './fetch-patient-list';
import { watchFetchPatient } from './fetch-patient';
import { watchPutActivePatient } from './put-active-patient';
import { watchPutActiveRecord } from './put-active-record';
import { watchInitActivePatient } from './init-active-patient';
import { watchAddNewActiveRecord } from './add-new-active-record';
import { watchConnectPouchDB } from './connect-pouchdb';
import { watchPushAlert } from './alerts';

const authedSagas = [
  watchFetchPatientList,
  watchFetchPatient,
  watchPutActivePatient,
  watchPutActiveRecord,
  watchInitActivePatient,
  watchAddNewActiveRecord,
  watchConnectPouchDB,
];

const authedTasks = new Array(authedSagas.length);

function* authorize(username: string, password: string) {
  const ajaxOpts = {
    ajax: {
      headers: {
        Authorization: `Basic ${window.btoa(`${username}:${password}`)}`,
      },
    },
  };

  try {
    const response = yield call([db, db.login], username, password, ajaxOpts);

    for (let i = 0; i < authedSagas.length; ++i) {
      authedTasks[i] = yield fork(authedSagas[i]);
    }
    startListening();

    // Logged-in process
    yield put(loginSuccess(response));
    yield put(alertInfo('Logged in!'));
  } catch (error) {
    yield put(loginError(error));
    yield put(alertError('Failed to log in'));
  }
}

export default function* rootSaga() {
  yield fork(watchPushAlert);

  // Auth loop
  while (true) {
    const { payload } = yield take(REQUEST_LOGIN);
    yield fork(authorize, payload.username, payload.password);

    yield take([REQUEST_LOGOUT, LOGIN_ERROR]);
    yield call([db, db.logout]);
    yield put(logoutSuccess());
    // Logged-out process
    for (let i = 0; i < authedTasks.length; ++i) {
      if (authedTasks[i]) {
        yield cancel(authedTasks[i]);
      }
    }
    stopListening();
  }
}
