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

import { delay } from 'redux-saga';
import { take, put, call, select } from 'redux-saga/effects';
import {
  ADD_NEW_ACTIVE_RECORD,
  selectActiveRecord,
  changeActiveRecord,
} from '../actions';
import {
  getActiveRecords,
} from '../selectors';

export function* addNewActiveRecord(patientId) {
  const patientIdBody = patientId.replace(/^patient_/, '');
  const now = (new Date()).getTime(); // Unix Millisecond Timestamp
  const newId = `record_${patientIdBody}_${now}`;
  const existingActiveRecords = yield select(getActiveRecords);
  const newRecord = {
    _id: newId,
    type: 'record',
    $meta: {
      prev_record_ids: existingActiveRecords.map(record => record._id),
      record_count: existingActiveRecords.length + 1,
    },
    $initialized_at: now,
  };

  yield put(changeActiveRecord(existingActiveRecords.length, newRecord, { silent: true }));
  yield put(selectActiveRecord(newId));
}

export function* watchAddNewActiveRecord() {
  while (true) {
    const { patientId } = yield take(ADD_NEW_ACTIVE_RECORD);
    yield call(addNewActiveRecord, patientId);
    yield call(delay, 1);
    // record IDが1msごとに採番されるので1ms待つ
    // TODO 別のclientで同一patientに1ms以内に同時にrecordを追加されるとconflictする
    // この辺はしっかり考えるべき
  }
}
