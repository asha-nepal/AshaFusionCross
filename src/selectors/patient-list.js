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
import _get from 'lodash.get';


export const getPatientList = (state: Object) => state.patientList;

export const getPatientSelectFilter = (state: Object) => state.patientSelect.filter.trim().toLowerCase();
export const getPatientSelectTimeRange = (state: Object) => state.patientSelect.filterDate;
export const getPatientSelectQueryList = (state: Object) => getPatientSelectFilter(state).split(' ').filter(q => q.length > 0);

export const checkPatientMatchesQueries = (queries: Array<string>, patient: PatientObject) => queries.every((query) => {
  if (patient.name) {
    const _query = ` ${query}`;
    const _name = ` ${patient.name.toLowerCase()}`;
    if (_name.indexOf(_query) !== -1) return true;
  }

  if (patient.number) {
    if (patient.number === query) return true;
  }

  return false;
});

function patientInTimeRange(timeRange, patient) {
  const startDate = timeRange.startDate;
  const endDate = timeRange.endDate;
  const patientCreatedMoment = moment(patient.$updated_at);
  if (!startDate && !endDate) {
    const currentMoment = moment();
    return currentMoment.isSame(patientCreatedMoment, 'day');
  }
  return patientCreatedMoment.isBetween(startDate, endDate, 'day', []);
}

export const getFilteredPatientList = createSelector(
  [getPatientList, getPatientSelectQueryList, getPatientSelectTimeRange],
  (patientList, queryList, timeRange) => {
    if (queryList.length === 0) {
      return patientList.filter(patient => patientInTimeRange(timeRange, patient));
    }

    return patientList.filter(patient => checkPatientMatchesQueries(queryList, patient));
  },
);

// TODO: 名付けの一貫性
export const getPatientSortField = (state: Object) => state.patientSelect.sortBy;
export const getPatientSortOrder = (state: Object) => state.patientSelect.sortInAsc;

export const getSortedFilteredPatientList = createSelector(
  [getFilteredPatientList, getPatientSortField, getPatientSortOrder],
  (filteredPatientList, sortBy, sortInAsc) => {
    const x = sortInAsc ? -1 : 1;
    const _x = -x;

    return filteredPatientList
      .slice().sort((a, b) => { // sort()は破壊的なので，slice()を挟む
        if (!a[sortBy]) { return 1; } // 空データはASC, DESC問わず末尾にする
        if (!b[sortBy]) { return -1; }

        const _a = a[sortBy].toLowerCase();
        const _b = b[sortBy].toLowerCase();

        if (_a < _b) {
          return x;
        } if (_a > _b) {
          return _x;
        }

        return 0;
      });
  },
);

export const getPatientMax = (state: Object, path: string) => {
  const patientList = getPatientList(state);

  const targetValues = patientList
    .map((patient) => {
      const value = _get(patient, path, 0);

      if (typeof value === 'string') {
        const _value = parseInt(value, 10);
        return isNaN(_value) ? 0 : _value;
      }

      if (typeof value !== 'number') return 0;

      return value;
    });

  return targetValues.reduce((a, b) => (a > b ? a : b), 0);
};

export const makeGetDuplicatedPatients = (field: string) => createSelector(
  [
    state => state.activePatient._id,
    state => state.activePatient[field],
    getPatientList,
  ],
  (activePatientId, activePatientField, patientList) => {
    if (!activePatientField) { return []; }

    return patientList.filter(p => p._id !== activePatientId && p[field] === activePatientField);
  },
);
