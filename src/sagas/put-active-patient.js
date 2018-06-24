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
  take, put, call, select,
} from 'redux-saga/effects';
import {
  PUT_ACTIVE_PATIENT,
  requestPutPatient,
  successPutPatient,
  failurePutPatient,
  changeActivePatient,
  addNewActiveRecord,
  alertInfo,
  alertError,
} from '../actions';

export function* putActivePatient(db: PouchInstance, cb: ?(patient: PatientObject) => void) {
  yield put(requestPutPatient());

  const patient = yield select(state => state.activePatient);
  const records = yield select(state => state.activeRecords);
  const { loggedInUser } = yield select(state => state.auth);

  const now = Date.now(); // Unix Millisecond Timestamp

  try {
    const res = yield call([db, db.put], {
      $created_at: now,
      $created_by: loggedInUser || null,
      ...patient,
      $updated_at: now,
      $updated_by: loggedInUser || null,
    });
    if (!res.ok || res.id !== patient._id) {
      throw new Error('Invalid response');
    }

    yield put(changeActivePatient({
      ...patient,
      _rev: res.rev,
    }, {
      silent: true,
    }));

    yield put(alertInfo('Patient data updated'));

    if (!records || records.length === 0) {
      yield put(addNewActiveRecord(patient._id));
    }

    if (typeof cb === 'function') { cb(patient); }

    yield put(successPutPatient());
  } catch (error) {
    const errmsg = error.name === 'forbidden' ? 'Forbidden' : 'Failed updating patient data';
    yield put(alertError(errmsg));
    yield put(failurePutPatient(error));
  }
}

export function* watchPutActivePatient() {
  while (true) {
    const { payload } = yield take(PUT_ACTIVE_PATIENT);
    const db = yield select(state => state.db.instance);
    yield call(putActivePatient, db, payload.cb);
  }
}
