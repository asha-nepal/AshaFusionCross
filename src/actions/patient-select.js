/* @flow */

export const SET_PATIENT_LIST_FILTER = 'SET_PATIENT_LIST_FILTER';
export const setPatientListFilter = (filter: string): SetPatientListFilterAction => ({
  type: SET_PATIENT_LIST_FILTER,
  payload: {
    filter,
  },
});


export const SET_PATIENT_LIST_ORDER = 'SET_PATIENT_LIST_ORDER';
export const setPatientListOrder = (sortInAsc: boolean): SetPatientListOrderAction => ({
  type: SET_PATIENT_LIST_ORDER,
  payload: {
    sortInAsc,
  },
});
