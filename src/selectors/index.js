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
