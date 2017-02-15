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
