/* @flow */

import { createSelector } from 'reselect';

export const getPatientList = (state: Object) => state.patientList;
export const getPatientSelectFilter = (state: Object) =>
  state.patientSelect.filter.trim().toLowerCase();
export const getPatientSelectQueryList = (state: Object) =>
  getPatientSelectFilter(state).split(' ').filter(q => q.length > 0);

export const checkPatientMatchesQueries = (queries: Array<string>, patient: PatientObject) =>
  queries.every(query => {
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

export const getFilteredPatientList = createSelector(
  [getPatientList, getPatientSelectQueryList],
  (patientList, queryList) => {
    if (queryList.length === 0) {
      return patientList;
    }

    return patientList.filter(patient => checkPatientMatchesQueries(queryList, patient));
  }
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
        if (!a[sortBy]) { return 1; }  // 空データはASC, DESC問わず末尾にする
        if (!b[sortBy]) { return -1; }

        const _a = a[sortBy].toLowerCase();
        const _b = b[sortBy].toLowerCase();

        if (_a < _b) {
          return x;
        } else if (_a > _b) {
          return _x;
        }

        return 0;
      });
  }
);


export const getActivePatient = (state: Object) => state.activePatient;

export const makeGetDuplicatedPatients = (field: string) => createSelector(
  [
    (state) => state.activePatient._id,
    (state) => state.activePatient[field],
    getPatientList,
  ],
  (activePatientId, activePatientField, patientList) => {
    if (!activePatientField) { return []; }

    return patientList.filter(p =>
      p._id !== activePatientId && p[field] === activePatientField);
  }
);

export const activeRecordsSelector = (state: Object) => state.activeRecords;
export const selectedActiveRecordIdSelector =
  (state: Object) => state.patientView.selectedActiveRecordId;
export const selectedActiveRecordSelector = createSelector(
  [activeRecordsSelector, selectedActiveRecordIdSelector],
  (activeRecords, selectedActiveRecordId) =>
    activeRecords.find(r => r._id === selectedActiveRecordId)
);
export const selectedActiveRecordIndexSelector = createSelector(
  [activeRecordsSelector, selectedActiveRecordIdSelector],
  (activeRecords, selectedActiveRecordId) =>
    activeRecords.findIndex(r => r._id === selectedActiveRecordId)
);

import formStyles from '../form-styles';
const recordFormStyles = formStyles.record || [];
const defaultRecordFormStyleId = recordFormStyles[0] && recordFormStyles[0].id;

// TODO: formStylesをstateとして管理することを見越してselectorとして書いておく
export const getRecordFormStyles = () => recordFormStyles;

export const getRecordFormStyleId = (state: Object) =>
  state.patientView.recordFormStyleId || defaultRecordFormStyleId;

export const getRecordFormStyle = createSelector(
  [getRecordFormStyleId],
  (recordFormStyleId) => {
    const recordFormStyle = recordFormStyles.find(s => s.id === recordFormStyleId);
    return recordFormStyle && recordFormStyle.style;
  }
);

export const getPatientFormStyle = () => formStyles.patient[0].style;  // TODO とりあえず固定で
