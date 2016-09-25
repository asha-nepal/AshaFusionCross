/* @flow */

import { createSelector } from 'reselect';

export const patientListSelector = (state: Object) => state.patientList;
export const filterSelector = (state: Object) => state.patientSelect.filter.trim().toLowerCase();
export const queryListSelector = (state: Object) =>
  filterSelector(state).split(' ').filter(q => q.length > 0);

export const filterPatient = (queries: Array<string>, patient: PatientObject) =>
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

export const filterPatientList = createSelector(
  [patientListSelector, queryListSelector],
  (patientList, queryList) => {
    if (queryList.length === 0) {
      return patientList;
    }

    return patientList.filter(patient => filterPatient(queryList, patient));
  }
);

export const sortFilterPatientList = createSelector(
  [filterPatientList],
  (filteredPatientList) => filteredPatientList
    .slice().sort((a, b) => { // sort()は破壊的なので，slice()を挟む
      const _a = a.name ? a.name.toLowerCase() : '';
      const _b = b.name ? b.name.toLowerCase() : '';

      if (_a < _b) {
        return -1;
      } else if (_a > _b) {
        return 1;
      }

      return 0;
    })
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
  (recordFormStyleId) => recordFormStyles.find(s => s.id === recordFormStyleId)
);
