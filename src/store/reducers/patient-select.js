/* @flow */

import {
  SET_PATIENT_LIST_FILTER,
  SET_PATIENT_LIST_SORT_FIELD,
  SET_PATIENT_LIST_ORDER,
} from '../../actions';

const initialState: PatientSelectState = {
  filter: '',
  sortBy: 'name',
  sortInAsc: true,
};

export default function (
  state: PatientSelectState = initialState,
  action: PatientSelectAction,
): PatientSelectState {
  switch (action.type) {
    case SET_PATIENT_LIST_FILTER:
      return Object.assign({}, state, {
        filter: action.payload.filter,
      });

    case SET_PATIENT_LIST_SORT_FIELD:
      return Object.assign({}, state, {
        sortBy: action.payload.sortBy,
      });

    case SET_PATIENT_LIST_ORDER:
      return Object.assign({}, state, {
        sortInAsc: action.payload.sortInAsc,
      });

    default:
      return state;
  }
}
