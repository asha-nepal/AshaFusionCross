/**
 * Copyright 2017 Yuichiro Tsuchiya
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

export const POUCH_DOCS_FETCH = 'POUCH_DOCS_FETCH';
export const fetchPouchDocs = (name: string, opts: Object) => ({
  type: POUCH_DOCS_FETCH,
  payload: {
    name,
    opts,
  },
});

export const POUCH_DOCS_FETCH_REQUEST = 'POUCH_DOCS_FETCH_REQUEST';
export const POUCH_DOCS_FETCH_SUCCESS = 'POUCH_DOCS_FETCH_SUCCESS';
export const POUCH_DOCS_FETCH_FAILURE = 'POUCH_DOCS_FETCH_FAILURE';

export const requestFetchingPouchDocs = (name: string) => ({
  type: POUCH_DOCS_FETCH_REQUEST,
  payload: {
    name,
  },
});

export const successFetchingPouchDocs = (name: string, data: Array<PouchDocType>) => ({
  type: POUCH_DOCS_FETCH_SUCCESS,
  payload: {
    name,
    data,
  },
});

export const failFetchingPouchDocs = (name: string, error: ErrorObject) => ({
  type: POUCH_DOCS_FETCH_FAILURE,
  payload: {
    name,
  },
  error,
});

export const fetchPatientList = () =>
  fetchPouchDocs(
    'patients',
    { prefix: 'patient_', label: 'patient list' }
  );

export const fetchRecordList = () =>
  fetchPouchDocs(
    'records',
    { prefix: 'record_' }
  );
