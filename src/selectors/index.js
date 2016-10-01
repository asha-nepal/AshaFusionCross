/* @flow */

import { createSelector } from 'reselect';

export const getPatientList = (state: Object) => state.patientList;
export const getPatientSelectFilter = (state: Object) =>
  state.patientSelect.filter.trim().toLowerCase();
export const getPatientSelectQueryList = (state: Object) =>
  getPatientSelectFilter(state).split(' ').filter(q => q.length > 0);

export const getFilteredPatientList = (queries: Array<string>, patient: PatientObject) =>
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

export const getFilteredPatientListList = createSelector(
  [getPatientList, getPatientSelectQueryList],
  (patientList, queryList) => {
    if (queryList.length === 0) {
      return patientList;
    }

    return patientList.filter(patient => getFilteredPatientList(queryList, patient));
  }
);

export const getPatientSortOrder = (state: Object) => state.patientSelect.sortInAsc;

export const getSortedFilteredPatientList = createSelector(
  [getFilteredPatientListList, getPatientSortOrder],
  (filteredPatientList, sortInAsc) => {
    const x = sortInAsc ? -1 : 1;
    const _x = -x;

    return filteredPatientList
      .slice().sort((a, b) => { // sort()は破壊的なので，slice()を挟む
        const _a = a.name ? a.name.toLowerCase() : '';
        const _b = b.name ? b.name.toLowerCase() : '';

        if (_a < _b) {
          return x;
        } else if (_a > _b) {
          return _x;
        }

        return 0;
      });
  }
);


import formStyles from '../form-styles';
const recordFormStyles = formStyles.record || [];
const defaultRecordFormStyleId = recordFormStyles[0] && recordFormStyles[0].id;

// TODO: formStylesをstateとして管理することを見越してselectorとして書いておく
export const recordFormStylesSelector = () => recordFormStyles;

export const recordFormStyleIdSelector = (state: Object) =>
  state.patientView.recordFormStyleId || defaultRecordFormStyleId;

export const recordFormStyleSelector = createSelector(
  [recordFormStyleIdSelector],
  (recordFormStyleId) => {
    const recordFormStyle = recordFormStyles.find(s => s.id === recordFormStyleId);
    return recordFormStyle && recordFormStyle.style;
  }
);

export const getPatientFormStyle = () => formStyles.patient[0].style;  // TODO とりあえず固定で
