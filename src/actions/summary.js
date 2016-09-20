/* @flow */

export const FETCH_RECORD_LIST = 'FETCH_RECORD_LIST';
export const fetchRecordList = () => ({
  type: FETCH_RECORD_LIST,
});

export const SET_SUMMARY_RECORDS = 'SET_SUMMARY_RECORDS';
export const setSummaryRecords = (records: Array<RecordObject>) => ({
  type: SET_SUMMARY_RECORDS,
  payload: {
    records,
  },
});
