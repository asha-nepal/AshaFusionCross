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
    if (date.startDate) {
      filteredRecordList = filteredRecordList
        .filter(record => moment(record.$updated_at).isAfter(date.startDate));
    }
    if (date.endDate) {
      filteredRecordList = filteredRecordList
        .filter(record => moment(record.$updated_at).isBefore(date.endDate));
    }

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
