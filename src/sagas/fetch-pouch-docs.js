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

/* @flow */
import { take, select, call, put, fork } from 'redux-saga/effects';
import {
  POUCH_DOCS_FETCH,
  requestFetchingPouchDocs,
  successFetchingPouchDocs,
  failFetchingPouchDocs,
  alertInfo,
  alertError,
} from 'actions';
import {
  capitalize,
} from 'utils';

function pouchFetchDocs(db: PouchInstance, prefix: string): Promise<Array<PouchDocType>> {
  return db.allDocs({
    include_docs: true,
    startkey: prefix,
    endkey: `${prefix}\uffff`,
  })
  .then(res => res.rows.map(r => r.doc));
}

export function* fetchPouchDocs(
  db: PouchInstance,
  name: string,
  opts: Object
): Generator<*, void, *> {
  const { prefix, label } = opts;

  yield put(requestFetchingPouchDocs(name));
  try {
    const data: Array<PouchDocType> = yield call(pouchFetchDocs, db, prefix);
    yield put(alertInfo(capitalize(`${label && `${label} `}loaded`)));
    yield put(successFetchingPouchDocs(name, data));
  } catch (error) {
    yield put(alertError(`Failed loading${label && ` ${label}`}`));
    yield put(failFetchingPouchDocs(name, error));
  }
}

export function* watchFetchPouchDocs(): Generator<*, void, *> {
  while (true) {
    const { payload } = yield take(POUCH_DOCS_FETCH);
    const db = yield select(state => state.db.instance);
    yield fork(fetchPouchDocs, db, payload.name, payload.opts);
  }
}
