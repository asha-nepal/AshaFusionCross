import { fork, call, put, take, select, cancel, race } from 'redux-saga/effects';

import {
  loginSuccess,
  REQUEST_SIGNUP,
  REQUEST_LOGIN,
  REQUEST_ANONYMOUS_LOGIN,
  REQUEST_LOGOUT,
  requestLogin,
  logoutSuccess,
  alertError,
  alertInfo,
  setIsDBPublic,
} from '../actions';
import { btoa as _btoa } from '../utils';

import { watchFetchPatientList } from './fetch-patient-list';
import { watchFetchPatient } from './fetch-patient';
import { watchPutActivePatient } from './put-active-patient';
import { watchPutActiveRecord } from './put-active-record';
import { watchRemoveActivePatient } from './remove-active-patient';
import { watchInitActivePatient } from './init-active-patient';
import { watchAddNewActiveRecord } from './add-new-active-record';
import { watchOnPouchChanges } from './db';

const authedSagas = [
  watchFetchPatientList,
  watchFetchPatient,
  watchPutActivePatient,
  watchPutActiveRecord,
  watchRemoveActivePatient,
  watchInitActivePatient,
  watchAddNewActiveRecord,
];

let authedTask = null;

export function checkAccessible(db: PouchInstance) {
  return db.info()
    .then(() => true)
    .catch(() => false);
}

export function* afterLoggedIn(db: PouchInstance) {
  for (let i = 0; i < authedSagas.length; ++i) {
    yield fork(authedSagas[i]);
  }
  yield fork(watchOnPouchChanges, db);

  const session = yield call([db, db.getSession]);
  yield put(loginSuccess(session.userCtx.name, session.userCtx.roles));
}

export function* logout(db: PouchInstance) {
  try {
    yield call([db, db.logout]);
  } catch (error) {
    console.log(error);
  }

  yield put(logoutSuccess());

  if (authedTask) {
    yield cancel(authedTask);
  }
}

export function* authorize(db: PouchInstance, username: string, password: string) {
  const ajaxOpts = {
    ajax: {
      headers: {
        Authorization: `Basic ${_btoa(`${username}:${password}`)}`,
      },
    },
  };

  try {
    const response = yield call([db, db.login], username, password, ajaxOpts);
    return { response };
  } catch (error) {
    return { error };
  }
}

export function* loginFlow() {
  while (true) {
    const { payload } = yield take(REQUEST_LOGIN);

    const db = yield select(state => state.db.instance);
    if (!db) {
      console.log('Not connected');
      continue;
    }

    const { username, password } = payload;

    const winner = yield race({
      auth: call(authorize, db, username, password),
      logout: take(REQUEST_LOGOUT),
    });

    if (winner.auth) {
      const { response, error } = winner.auth;
      if (response) {
        authedTask = yield fork(afterLoggedIn, db);
        yield put(alertInfo('Logged in!'));
      } else {
        yield put(alertError(`Failed to log in: ${error.message}`));
      }
    } else if (winner.logout) {
      yield call(logout, db);
    }
  }
}

export function* anonymousLoginFlow() {
  while (true) {
    yield take(REQUEST_ANONYMOUS_LOGIN);

    const db = yield select(state => state.db.instance);
    if (!db) {
      console.log('Not connected');
      continue;
    }

    const isAccessible = yield call(checkAccessible, db);
    if (!isAccessible) {
      yield put(alertError('Disconnected'));
      continue;
    }

    const session = yield call([db, db.getSession]);
    const isDBPublic = isAccessible && !session.userCtx.name;
    yield put(setIsDBPublic(isDBPublic));

    if (!isDBPublic) {
      yield put(alertError('This DB is not public'));
      continue;
    }

    authedTask = yield fork(afterLoggedIn, db);
    yield put(alertInfo('Logged in as an anonymous user'));
  }
}

export function* signupFlow() {
  while (true) {
    const { payload } = yield take(REQUEST_SIGNUP);
    const db = yield select(state => state.db.instance);

    if (!db) {
      console.log('Not connected');
      continue;
    }

    const { username, password } = payload;
    const option = {
      metadata: {
        roles: ['staff'],
      },
    };

    try {
      yield call([db, db.signup], username, password, option);
      yield put(alertInfo('Success'));
      yield put(requestLogin(username, password));
    } catch (error) {
      if (error.name === 'conflict') {
        yield put(alertError(`"${username}" already exists, choose another username`, 5000));
      } else if (error.name === 'forbidden') {
        yield put(alertError('Invalid username', 5000));
      } else {
        yield put(alertError(`${error.name}: ${error.message}`));
      }
    }
  }
}

export function * logoutFlow() {
  while (true) {
    yield take(REQUEST_LOGOUT);
    const db = yield select(state => state.db.instance);
    if (!db) {
      console.log('Not connected');
      continue;
    }
    yield call(logout, db);
  }
}
