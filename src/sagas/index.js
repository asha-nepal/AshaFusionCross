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
  DB_CONNECT_REQUEST,
  DB_DISCONNECT_REQUEST,
  dbSetInstance,
  dbConnectRequest,
} from '../actions';

import { watchFetchPatientList } from './fetch-patient-list';
import { watchFetchPatient } from './fetch-patient';
import { watchPutActivePatient } from './put-active-patient';
import { watchPutActiveRecord } from './put-active-record';
import { watchRemoveActivePatient } from './remove-active-patient';
import { watchInitActivePatient } from './init-active-patient';
import { watchAddNewActiveRecord } from './add-new-active-record';
import { watchPushAlert } from './alerts';
import { watchOnPouchChanges } from './db';

const initialSagas = [
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
];

const authedTasks = new Array(authedSagas.length);


function checkAccessible(db: PouchInstance) {
  return db.info()
    .then(() => true)
    .catch(() => false);
}

function* afterLoggedIn(db: PouchInstance) {
  for (let i = 0; i < authedSagas.length; ++i) {
    authedTasks[i] = yield fork(authedSagas[i]);
  }

  const session = yield call([db, db.getSession]);
  yield put(loginSuccess(session.userCtx.name, session.userCtx.roles));

  yield fork(watchOnPouchChanges, db);
}

function* logout(db: PouchInstance) {
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
//  stopListening();
}

function* authorize(db: PouchInstance, username: string, password: string) {
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
        yield [
          call(afterLoggedIn, db),
          put(alertInfo('Logged in!')),
        ];
      } else {
        yield put(alertError(`Failed to log in: ${error.message}`));
      }
    } else if (winner.logout) {
      yield call(logout, db);
    }
  }
}

function* anonymousLoginFlow() {
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

    yield [
      call(afterLoggedIn, db),
      put(alertInfo('Logged in as an anonymous user')),
    ];
  }
}

function* signupFlow() {
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

// Connection saga
import PouchDB from 'pouchdb';
PouchDB.plugin(require('pouchdb-authentication'));
const pouchOpts = {
  skipSetup: true,
};

export function * connect(config: PouchConfig) {
  try {
    const remoteUrl = `http://${config.remote.hostname}/${config.remote.dbname}`;
    let db;

    if (config.isLocal) {
      db = new PouchDB(config.local.dbname);
      if (config.local.isSynced) {
        db.sync(remoteUrl, {
          ...pouchOpts,
          live: true,
          retry: true,
        });
      }
    } else {
      db = new PouchDB(remoteUrl, pouchOpts);
    }

    yield put(dbSetInstance(db));
//    yield fork(watchOnPouchChanges, db);

    return { db };
  } catch (error) {
    return { error };
  }
}

export function * disconnect() {
  const db = yield select(state => state.db.instance);
  yield call(logout, db);

  yield put(dbSetInstance(null));
}

export function * connectFlow() {
  while (true) {
    const { payload } = yield take(DB_CONNECT_REQUEST);

    const winner = yield race({
      connect: call(connect, payload.config),
      disconnect: take(DB_DISCONNECT_REQUEST),
    });

    if (winner.connect) {
      const { db, error } = winner.connect;
      if (db) {
        yield put(alertInfo('Connected'));
        const isAccessible = yield call(checkAccessible, db);
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
            call(afterLoggedIn, db),
            put(alertInfo(isDBPublic ? 'Logged in (public DB)' : 'Logged in!')),
          ];
        }
      } else {
        yield put(alertError(`Failed to connect DB: ${error.message}`));
      }
    } else {
      yield call(disconnect);
    }
  }
}


export default function* rootSaga() {
  for (let i = 0; i < initialSagas.length; ++i) {
    yield fork(initialSagas[i]);
  }

  yield fork(connectFlow);

  const pouchConfig = {
    isLocal: false,
    local: {
      dbname: 'asha-fusion-dev',
      isSynced: false,
    },
    remote: {
      hostname: 'localhost:5984',
      dbname: 'asha-fusion-dev',
    },
  };

  yield put(dbConnectRequest(pouchConfig));
}
