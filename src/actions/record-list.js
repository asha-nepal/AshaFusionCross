
export const FETCH_RECORD_LIST = 'FETCH_RECORD_LIST';
export const fetchRecordList = () => ({
  type: FETCH_RECORD_LIST,
});

export const REQUEST_FETCH_RECORD_LIST = 'REQUEST_FETCH_RECORD_LIST';
export const SUCCESS_FETCH_RECORD_LIST = 'SUCCESS_FETCH_RECORD_LIST';
export const FAILURE_FETCH_RECORD_LIST = 'FAILURE_FETCH_RECORD_LIST';

export const requestFetchRecordList = () => ({
  type: REQUEST_FETCH_RECORD_LIST,
});

export const successFetchRecordList = (recordList: Array<RecordObject>) => ({
  type: SUCCESS_FETCH_RECORD_LIST,
  recordList,
});

export const failureFetchRecordList = (error: ErrorObject) => ({
  type: FAILURE_FETCH_RECORD_LIST,
  error,
});
