/* @flow */

import {
  SET_PATIENT_LIST_FILTER,
} from '../../actions';

const initialState = {
  filter: '',
};

export default function (
  state: PatientSelectState = initialState,
  action: PatientSelectAction,
): Object {
  switch (action.type) {
    case SET_PATIENT_LIST_FILTER:
      return Object.assign({}, state, {
        filter: action.payload.filter,
      });

    default:
      return state;
  }
}
