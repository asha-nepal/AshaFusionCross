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

import { take, put, call } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import {
  INIT_ACTIVE_PATIENT,
  requestFetchPatient,
  successFetchPatient,
  changeActivePatient,
  resetActiveRecords,
} from '../actions';
import randomstringPromise from 'randomstring';

export function* initActivePatient() {
  // FIXME:
  // requestFetchPatient, delay, and successFetchPatient are just work-around
  // to solve https://github.com/asha-nepal/AshaFusionCross/issues/419
  yield put(requestFetchPatient());
  yield call(delay, 100);

  const id = yield call(randomstringPromise, 16);
  yield put(changeActivePatient({
    _id: `patient_${id}`,
    type: 'patient',
  }, {
    silent: true,
  }));
  yield put(resetActiveRecords());

  yield put(successFetchPatient());
}

export function* watchInitActivePatient() {
  while (true) {
    yield take(INIT_ACTIVE_PATIENT);
    yield call(initActivePatient);
  }
}
