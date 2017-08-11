/**
 * Copyright 2016 Yuichiro Tsuchiya
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
  FETCH_PATIENT,
  requestFetchPatient,
  successFetchPatient,
  failureFetchPatient,
  changeActivePatient,
  changeActiveRecords,
  setActiveRecordPristine,
  selectActiveRecord,
  alertInfo,
  alertError,
} from '../actions';

export function* fetchPatient(db: PouchInstance, patientId: string) {
  yield put(requestFetchPatient());
  try {
    // Prepare queries
    const patientIdBody = patientId.replace(/^patient_/, '');
    const idPrefix = `record_${patientIdBody}_`;
    const recordsQuery = {
      startkey: idPrefix,
      endkey: `${idPrefix}\uffff`,
      include_docs: true,
    };

    // call fetching APIs
    const patient = yield call([db, db.get], patientId);
    const recordDocs = yield call([db, db.allDocs], recordsQuery);
    const records = recordDocs.rows.map(r => r.doc);
    yield put(changeActivePatient(patient, { silent: true }));
    yield put(changeActiveRecords(records, { silent: true }));
    for (let i = 0; i < records.length; ++i) {
      yield put(setActiveRecordPristine(i));
    }
    yield put(alertInfo('Patient data and records loaded'));
    yield put(successFetchPatient());
    if (records && records.length > 0) {
      yield put(selectActiveRecord(records[records.length - 1]._id));
    }
  } catch (error) {
    yield put(alertError('Failed loading patient data and records'));
    yield put(failureFetchPatient(error));
  }
}

export function* watchFetchPatient() {
  while (true) {
    const { patientId } = yield take(FETCH_PATIENT);
    const db = yield select(state => state.db.instance);
    yield call(fetchPatient, db, patientId);
  }
}
