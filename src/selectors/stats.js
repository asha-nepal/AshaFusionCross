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

import { createSelector } from 'reselect';
import moment from 'moment';
import {
  getPatientList,
} from './patient-list';

export const getRecordList = (state: Object): Array<RecordObject> => state.recordList;

export const getStatsDate = (
  state: Object
): {
  startDate: ?moment.Moment,
  endDate: ?moment.Moment
} => state.stats.date;

export const getRecordListFilteredByDate = createSelector(
  [getRecordList, getStatsDate],
  (recordList, date) => {
    if (date.startDate == null && date.endDate == null) return recordList;

    let filteredRecordList = recordList.filter(record => record.$updated_at);
    filteredRecordList = filteredRecordList
      .filter(record =>
        moment(record.$updated_at).isBetween(date.startDate, date.endDate, 'day', '[]'));

    return filteredRecordList;
  }
);

export const getRecordListForStats = createSelector(
  [getRecordListFilteredByDate, getPatientList],
  (recordList, patientList) => recordList.map(record => {
    const match = record._id.match(/record_(\S+)_(\S+)/);
    const patientId = match && `patient_${match[1]}`;
    const patient = patientId && patientList.find(p => p._id === patientId);

    if (!patient) return record;

    return {
      ...record,
      _patient: patient,
    };
  })
);
