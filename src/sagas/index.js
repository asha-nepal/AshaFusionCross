import { fork, call, put, take, cancel, race } from 'redux-saga/effects';

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
  connectPouchDB,
  setIsDBPublic,
} from '../actions';
import { db, startListening, stopListening } from '../db';

import { watchFetchPatientList } from './fetch-patient-list';
import { watchFetchPatient } from './fetch-patient';
import { watchPutActivePatient } from './put-active-patient';
import { watchPutActiveRecord } from './put-active-record';
import { watchRemoveActivePatient } from './remove-active-patient';
import { watchInitActivePatient } from './init-active-patient';
import { watchAddNewActiveRecord } from './add-new-active-record';
import { watchConnectPouchDB } from './connect-pouchdb';
import { watchPushAlert } from './alerts';
import { summarySaga } from './summary';

const initialSagas = [
  watchConnectPouchDB,
  watchPushAlert,
];

const authedSagas = [
  watchFetchPatientList,
  watchFetchPatient,
  watchPutActivePatient,
  watchPutActiveRecord,
  watchRemoveActivePatient,
  watchInitActivePatient,
  watchAddNewActiveRecord,
  summarySaga,
];

const authedTasks = new Array(authedSagas.length);


function checkAccessible() {
  return db.info()
    .then(() => true)
    .catch(() => false);
}

function* afterLoggedIn() {
  for (let i = 0; i < authedSagas.length; ++i) {
    authedTasks[i] = yield fork(authedSagas[i]);
  }
  startListening();

  const session = yield call([db, db.getSession]);
  yield put(loginSuccess(session.userCtx.name, session.userCtx.roles));
}

function* logout() {
  try {
    yield call([db, db.logout]);
  } catch (error) {
    console.log(error);
  }

  yield put(logoutSuccess());

  for (let i = 0; i < authedTasks.length; ++i) {
    if (authedTasks[i]) {
      yield cancel(authedTasks[i]);
    }
  }
  stopListening();
}

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
    return { response };
  } catch (error) {
    return { error };
  }
}

function* loginFlow() {
  while (true) {
    const { payload } = yield take(REQUEST_LOGIN);
    const { username, password } = payload;

    const winner = yield race({
      auth: call(authorize, username, password),
      logout: take(REQUEST_LOGOUT),
    });

    if (winner.auth) {
      const { response, error } = winner.auth;
      if (response) {
        yield [
          call(afterLoggedIn, response.name, response.roles),
          put(alertInfo('Logged in!')),
        ];
      } else {
        yield put(alertError(`Failed to log in: ${error.message}`));
      }
    } else if (winner.logout) {
      call(logout);
    }
  }
}

function* anonymousLoginFlow() {
  while (true) {
    yield take(REQUEST_ANONYMOUS_LOGIN);

    const isAccessible = yield call(checkAccessible);
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

    yield [
      call(afterLoggedIn),
      put(alertInfo('Logged in as an anonymous user')),
    ];
  }
}

function* signupFlow() {
  while (true) {
    const { payload } = yield take(REQUEST_SIGNUP);
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
    yield call(logout);
  }
}

export default function* rootSaga() {
  for (let i = 0; i < initialSagas.length; ++i) {
    yield fork(initialSagas[i]);
  }

  yield put(connectPouchDB());

  const isAccessible = yield call(checkAccessible);
  const session = yield call([db, db.getSession]);
  const isDBPublic = isAccessible && !session.userCtx.name;
  yield put(setIsDBPublic(isDBPublic));

  if (isDBPublic) yield fork(anonymousLoginFlow);
  yield fork(loginFlow);
  yield fork(logoutFlow);
  yield fork(signupFlow);

  // Auto login
  if (isAccessible) {
    yield [
      call(afterLoggedIn),
      put(alertInfo(isDBPublic ? 'Logged in (public DB)' : 'Logged in!')),
    ];
  }
}
