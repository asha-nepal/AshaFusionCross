/* @flow */

import {
  REQUEST_FETCH_PATIENT_LIST,
  SUCCESS_FETCH_PATIENT_LIST,
  FAILURE_FETCH_PATIENT_LIST,
  POUCH_DOCS_FETCH_REQUEST,
  POUCH_DOCS_FETCH_SUCCESS,
  POUCH_DOCS_FETCH_FAILURE,
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
  isFetching: {},
  error: null,
};

export default function (
  state: Object = initialState,
  action: {
    type: string,
    payload: Object,
    error: ErrorObject,
  }
): Object {
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

    /* Fetch Pouch Docs */
    case POUCH_DOCS_FETCH_REQUEST:
      return {
        ...state,
        isFetching: {
          ...state.isFetching,
          [action.payload.name]: true,
        },
      };

    case POUCH_DOCS_FETCH_SUCCESS:
      return {
        ...state,
        isFetching: {
          ...state.isFetching,
          [action.payload.name]: false,
        },
        error: null,
      };

    case POUCH_DOCS_FETCH_FAILURE:
      return {
        ...state,
        isFetching: {
          ...state.isFetching,
          [action.payload.name]: false,
        },
        error: action.error,
      };

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
}
