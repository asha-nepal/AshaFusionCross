/**
 * Copyright 2016 Yuichiro Tsuchiya
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

export const SET_PATIENT_LIST_TIME_FILTER = 'SET_PATIENT_LIST_TIME_FILTER';
export const setPatientListTimeFilter = (date: Moment): SetPatientListTimeFilterAction => ({
  type: SET_PATIENT_LIST_TIME_FILTER,
  payload: {
    date,
  },
});
