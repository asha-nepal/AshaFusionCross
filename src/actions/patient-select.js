/* @flow */

export const SET_PATIENT_LIST_FILTER = 'SET_PATIENT_LIST_FILTER';
export const setPatientListFilter = (filter: string): SetPatientListFilterAction => ({
  type: SET_PATIENT_LIST_FILTER,
  payload: {
    filter,
  },
});

export const SET_PATIENT_LIST_SORT_FIELD = 'SET_PATIENT_LIST_SORT_FIELD';
export const setPatientListSortField = (sortBy: string): SetPatientListSortFieldAction => ({
  type: SET_PATIENT_LIST_SORT_FIELD,
  payload: {
    sortBy,
  },
});

export const SET_PATIENT_LIST_SORT_ORDER = 'SET_PATIENT_LIST_SORT_ORDER';
export const setPatientListSortOrder = (sortInAsc: boolean): SetPatientListSortOrderAction => ({
  type: SET_PATIENT_LIST_SORT_ORDER,
  payload: {
    sortInAsc,
  },
});
