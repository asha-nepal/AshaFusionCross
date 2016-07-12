/* @flow */

import {
  SUCCESS_FETCH_PATIENT,
  UPDATE_ACTIVE_PATIENT,
} from '../../actions';

export default function (
  state: ?PatientObject = null,
  action: {type: string, patient: PatientObject}
): ?PatientObject {
  switch (action.type) {
    case SUCCESS_FETCH_PATIENT:
    case UPDATE_ACTIVE_PATIENT:
      return action.patient;

    default:
      return state;
  }
}
