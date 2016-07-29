/* @flow */

import { createSelector } from 'reselect';

export const patientListSelector = (state: Object) => state.patientList;
export const filterSelector = (state: Object) => state.patientSelect.filter.trim().toLowerCase();

export const filterPatientList = createSelector(
  [patientListSelector, filterSelector],
  (patientList, filter) => {
    if (filter.length === 0) {
      return patientList;
    }

    return patientList.filter(p => p.name.toLowerCase().indexOf(filter) >= 0);
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
  (recordFormStyleId) => recordFormStyles.find(s => s.id === recordFormStyleId)
);
