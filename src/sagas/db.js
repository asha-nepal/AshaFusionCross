import PouchDB from 'pouchdb';
PouchDB.plugin(require('pouchdb-authentication'));
import { take, call, put, select, race } from 'redux-saga/effects';
import { eventChannel, END } from 'redux-saga';
import {
  checkAccessible,
  logout,
} from './auth';
import {
  alertError,
  alertInfo,
  setIsDBPublic,
  DB_CONNECT_REQUEST,
  DB_DISCONNECT_REQUEST,
  dbSetInstance,
  fetchPatientList,
  changeActivePatient,
  insertOrChangeActiveRecord,
  requestLogout,
  requestAnonymousLogin,
} from '../actions';

function createPouchChangeChannel(db: PouchInstance) {
  return eventChannel(emit => {
    const feed = db.changes({
      since: 'now',
      live: true,
      include_docs: true,
    })
    .on('change', change => {
      // handle change
      emit({
        type: 'change',
        payload: {
          change,
        },
      });
    })
    .on('complete', info => {
      // changes() was canceled
      emit({
        type: 'complete',
        payload: {
          info,
        },
      });
      feed.cancel();
      emit(END);
    })
    .on('error', error => {
      emit({
        type: 'error',
        error,
      });
      feed.cancel();
      emit(END);
    });

    const unsubscribe = () => feed.cancel();

    return unsubscribe;
  });
}

export function* watchOnPouchChanges(db: PouchInstance) {
  const pouchChannel = yield call(createPouchChangeChannel, db);

  try {
    while (true) {
      const { type, payload, error } = yield take(pouchChannel);

      if (type === 'change') {
        const { change } = payload;

        // For PatientSelect
        yield put(fetchPatientList());  // TODO: 全件fetchし直すのは効率が悪い

        // For PatientView
        const activePatientId = yield select(state => state.activePatient._id);
        if (!activePatientId) { continue; }

        const doc = change.doc;
        if (doc._id === activePatientId) {
          yield put(changeActivePatient(doc, { silent: true }));
        } else if (doc.type === 'record') {
          const activePatientIdBody = activePatientId.replace(/^patient_/, '');
          const match = doc._id.match(/record_(.+)_.+/);  // Extract patientId
          if (match && (match[1] === activePatientIdBody)) {
            yield put(insertOrChangeActiveRecord(doc, { silent: true }));
          }
        }
      } else if (error) {
        yield put(alertError(`ERR: change listener ${error.message || ''}`));
        yield put(requestLogout());
      }
    }
  } finally {
    console.log('PouchDB listener terminated');
  }
}

export function checkConnectable(db: PouchInstance) {
  return db.info()
    .then(() => true)
    .catch((error) => error.status === 401);
}

const pouchOpts = {
  skipSetup: true,
};

export function * connect(config: PouchConfig) {
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

  // 接続可能か確かめる
  const isDBConnectable = yield call(checkConnectable, db);
  if (!isDBConnectable) {
    return { error: Error('Cannot connect') };
  }

  yield put(dbSetInstance(db));
//    yield fork(watchOnPouchChanges, db);

  return { db };
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

        // Auto login
        if (isDBPublic) {
          yield put(requestAnonymousLogin());
        }
      } else {
        yield put(alertError(`Failed to connect DB: ${error.message}`));
      }
    } else {
      yield call(disconnect);
    }
  }
}
