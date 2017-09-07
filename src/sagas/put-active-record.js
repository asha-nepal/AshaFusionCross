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

import { take, put, call, select } from 'redux-saga/effects';
import {
  PUT_ACTIVE_RECORD,
  requestPutRecord,
  successPutRecord,
  failurePutRecord,
  changeActiveRecord,
  setActiveRecordPristine,
  alertInfo,
  alertError,
} from '../actions';

export function* putActiveRecord(db: PouchInstance, index: number) {
  yield put(requestPutRecord());

  const record = yield select(state => state.activeRecords[index]);
  const { loggedInUser } = yield select(state => state.auth);

  const now = Date.now();  // Unix Millisecond Timestamp

  try {
    const res = yield call([db, db.put], {
      $created_at: now,
      $created_by: loggedInUser || null,
      ...record,
      $updated_at: now,
      $updated_by: loggedInUser || null,
    });
    if (!res.ok || res.id !== record._id) {
      throw new Error('Invalid response');
    }

    yield put(changeActiveRecord(index, {
      ...record,
      _rev: res.rev,
    }, {
      silent: true,
    }));
    yield put(setActiveRecordPristine(index));

    yield put(alertInfo('Record updated'));
    yield put(successPutRecord());
  } catch (error) {
    const errmsg = error.name === 'forbidden' ? 'Forbidden' : 'Failed updating record';
    yield put(alertError(errmsg));
    yield put(failurePutRecord(error));
  }
}

export function* watchPutActiveRecord() {
  while (true) {
    const { index } = yield take(PUT_ACTIVE_RECORD);
    const db = yield select(state => state.db.instance);
    yield call(putActiveRecord, db, index);
  }
}
