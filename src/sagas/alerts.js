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
import { take, put, call, fork } from 'redux-saga/effects';
import {
  PUSH_ALERT,
  addAlert,
  removeAlert,
} from '../actions';

let _id = 0;
export function getId() {
  return _id++;
}

export function* pushAlert(message: string, type: string, timeout: number = 2000) {
  const id = getId();
  yield put(addAlert(id, message, type));
  yield call(delay, timeout);
  yield put(removeAlert(id));
}

export function* watchPushAlert() {
  while (true) {
    const { payload } = yield take(PUSH_ALERT);
    yield fork(pushAlert, payload.message, payload.type, payload.timeout);
  }
}
