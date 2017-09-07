/**
 * Copyright 2017 Yuichiro Tsuchiya
 * Copyright 2017 Yuguan Xing
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
  SET_PATIENT_LIST_FILTER,
  SET_PATIENT_LIST_SORT_FIELD,
  SET_PATIENT_LIST_SORT_ORDER,
  SET_PATIENT_LIST_TIME_FILTER,
} from '../../actions';

const initialState: PatientSelectState = {
  filter: '',
  sortBy: 'name',
  sortInAsc: true,
  filterDate: { startDate: null, endDate: null },
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

    case SET_PATIENT_LIST_SORT_ORDER:
      return Object.assign({}, state, {
        sortInAsc: action.payload.sortInAsc,
      });

    case SET_PATIENT_LIST_TIME_FILTER:
      return Object.assign({}, state, {
        filterDate: action.payload.date,
      });

    default:
      return state;
  }
}
