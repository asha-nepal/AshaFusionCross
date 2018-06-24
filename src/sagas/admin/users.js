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

import {
  put, take, select, call, cancelled,
} from 'redux-saga/effects';
import { routines } from 'actions/admin';
import { createPouchInstance } from '../db';

export function* fetchUsers(db: PouchInstance): Promise<Array<Object>> {
  try {
    yield put(routines.fetchUsers.request());
    const response = yield call([db, db.allDocs], { include_docs: true });
    const users = response.rows.map(row => row.doc).filter(doc => doc.type && doc.type === 'user');
    yield put(routines.fetchUsers.success({ users }));
  } catch (error) {
    yield put(routines.fetchUsers.failure(error.message));
  } finally {
    yield put(routines.fetchUsers.fulfill());
  }
}

function* createUserDBInstance() {
  const mainDBConfig = yield select(state => state.db.config);
  const userTableConfig = {
    isLocal: mainDBConfig.isLocal,
    local: {
      ...mainDBConfig.local,
      dbname: '_users',
    },
    remote: {
      ...mainDBConfig.remote,
      dbname: '_users',
    },
  };
  return createPouchInstance(userTableConfig);
}

export function* watchFetchUsers(): Generator<*, void, *> {
  const db = yield call(createUserDBInstance);

  try {
    while (true) {
      yield take(routines.fetchUsers.TRIGGER);
      yield call(fetchUsers, db);
    }
  } finally {
    if (yield cancelled()) {
      yield call([db, db.close]);
    }
  }
}
