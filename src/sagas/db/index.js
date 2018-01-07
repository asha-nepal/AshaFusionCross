/**
 * Copyright 2017 Yuichiro Tsuchiya
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { take, call, put, select, race, cancelled } from 'redux-saga/effects';
import PouchDB from 'lib/pouchdb';
import {
  checkAccessibility,
  alreadyLoggedIn,
  logout,
} from '../auth';
import {
  alertError,
  alertInfo,
  setIsDBPublic,
  DB_CONNECT_REQUEST,
  DB_DISCONNECT_REQUEST,
  dbSetInstance,
  requestAnonymousLogin,
} from '../../actions';
import handlePouchChanges from './handle-pouch-changes';
import createPouchChangeChannel from './create-pouch-change-channel';

export function* watchOnPouchChanges(db: PouchInstance) {
  const pouchChannel = yield call(createPouchChangeChannel, db);

  try {
    while (true) {
      const { type, payload, error } = yield take(pouchChannel);

      if (type === 'change') {
        const { change } = payload;
        yield call(handlePouchChanges, change);
      } else if (error) {
        yield put(alertError(`ERR: change listener ${error.message || ''}`));
      }
    }
  } finally {
    if (yield cancelled()) {
      // Called if this saga cancelled
      pouchChannel.close();
      console.log('PouchDB listener cancelled');
    }

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

export function formatHostname(hostname: string) {
  let result = hostname;

  if (!result.match(/^https?:\/\//)) {
    result = `http://${result}`;
  }

  if (result.charAt(result.length - 1) === '/') {
    result = result.slice(0, -1);
  }

  return result;
}

export function createPouchInstance(config: PouchConfig) {
  const hostname = formatHostname(config.remote.hostname);
  const remoteUrl = `${hostname}/${config.remote.dbname}`;

  if (config.isLocal) {
    const db = new PouchDB(config.local.dbname);
    if (config.local.isSynced) {
      db.sync(remoteUrl, {
        ...pouchOpts,
        live: true,
        retry: true,
      });
    }
    return db;
  }

  return new PouchDB(remoteUrl, pouchOpts);
}

export function * connect(config: PouchConfig) {
  const db = createPouchInstance(config);

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

        const { accessibility } = yield call(checkAccessibility, db);
        yield put(setIsDBPublic(accessibility));

        // Auto login
        if (accessibility) {
          const session = yield call([db, db.getSession]);
          if (session.userCtx.name) {
            yield call(alreadyLoggedIn, db);
          } else {
            yield put(requestAnonymousLogin());
          }
        }
      } else {
        yield put(alertError(`Failed to connect DB: ${error.message || ''}`));
      }
    } else {
      yield call(disconnect);
    }
  }
}

export function * disconnectFlow() {
  while (true) {
    yield take(DB_DISCONNECT_REQUEST);
    yield call(disconnect);
  }
}
