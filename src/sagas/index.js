/**
 * Copyright 2016-2017 Yuichiro Tsuchiya
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

import { fork, put, select } from 'redux-saga/effects';

import {
  dbConnectRequest,
} from '../actions';

import {
  watchPushAlert,
} from './alerts';
import {
  loginFlow,
  anonymousLoginFlow,
  logoutFlow,
  signupFlow,
} from './auth';
import {
  connectFlow,
  disconnectFlow,
} from './db';

const initialSagas = [
  watchPushAlert,
];


export default function* rootSaga() {
  // Polyfill for ReactNative
  process.nextTick = process.nextTick || setImmediate;

  for (let i = 0; i < initialSagas.length; ++i) {
    yield fork(initialSagas[i]);
  }

  yield fork(connectFlow);
  yield fork(disconnectFlow);
  yield fork(anonymousLoginFlow);
  yield fork(loginFlow);
  yield fork(logoutFlow);
  yield fork(signupFlow);

  const pouchConfig = yield select(state => state.db.config);
  yield put(dbConnectRequest(pouchConfig));
}
