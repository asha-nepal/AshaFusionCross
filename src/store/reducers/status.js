/**
 * Copyright 2016-2017 Yuichiro Tsuchiya
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* @flow */

import {
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
} from 'actions';

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
