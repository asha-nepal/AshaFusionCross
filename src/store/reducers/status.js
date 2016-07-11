/* @flow */

import {
  REQUEST_FETCH_PATIENT_LIST,
  SUCCESS_FETCH_PATIENT_LIST,
  FAILURE_FETCH_PATIENT_LIST,
  REQUEST_FETCH_PATIENT,
  SUCCESS_FETCH_PATIENT,
  FAILURE_FETCH_PATIENT,
  REQUEST_PUT_PATIENT,
  SUCCESS_PUT_PATIENT,
  FAILURE_PUT_PATIENT,
  REQUEST_PUT_RECORD,
  SUCCESS_PUT_RECORD,
  FAILURE_PUT_RECORD,
} from '../../actions';

const initialState = {
  isFetchingPatientList: false,
  isFetchingPatient: false,
  isPuttingPatient: false,
  isPuttingRecord: false,
  error: null,
};

export default (
  state: Object = initialState,
  action: {
    type: string,
    error: ErrorObject,
  }
) => {
  switch (action.type) {
    /* Fetch Patient list */
    case REQUEST_FETCH_PATIENT_LIST:
      return Object.assign({}, state, {
        isFetchingPatientList: true,
      });

    case SUCCESS_FETCH_PATIENT_LIST:
      return Object.assign({}, state, {
        isFetchingPatientList: false,
        error: null,
      });

    case FAILURE_FETCH_PATIENT_LIST:
      return Object.assign({}, state, {
        isFetchingPatientList: false,
        error: action.error,
      });

    /* Fetch patient */
    case REQUEST_FETCH_PATIENT:
      return Object.assign({}, state, {
        isFetchingPatient: true,
      });

    case SUCCESS_FETCH_PATIENT:
      return Object.assign({}, state, {
        isFetchingPatient: false,
        error: null,
      });

    case FAILURE_FETCH_PATIENT:
      return Object.assign({}, state, {
        isFetchingPatient: false,
        error: action.error,
      });

    /* Put patient */
    case REQUEST_PUT_PATIENT:
      return Object.assign({}, state, {
        isPuttingPatient: true,
      });

    case SUCCESS_PUT_PATIENT:
      return Object.assign({}, state, {
        isPuttingPatient: false,
        error: null,
      });

    case FAILURE_PUT_PATIENT:
      return Object.assign({}, state, {
        isPuttingPatient: false,
        error: action.error,
      });

    /* Put record */
    case REQUEST_PUT_RECORD:
      return Object.assign({}, state, {
        isPuttingRecord: true,
      });

    case SUCCESS_PUT_RECORD:
      return Object.assign({}, state, {
        isPuttingRecord: false,
        error: null,
      });

    case FAILURE_PUT_RECORD:
      return Object.assign({}, state, {
        isPuttingRecord: false,
        error: action.error,
      });

    default:
      return state;
  }
};
