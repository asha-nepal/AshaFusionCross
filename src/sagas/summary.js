import { fork, take, put, call } from 'redux-saga/effects';
import {
  FETCH_RECORD_LIST,
  setSummaryRecords,
} from '../actions';
import { db } from '../db';

export function pouchFetchRecords() {
  return db.allDocs({
    include_docs: true,
    startkey: 'record_',
    endkey: 'record_\uffff',
  })
  .then(res => res.rows.map(r => r.doc));
}

export function* fetchRecordList() {
  const records = yield call(pouchFetchRecords);
  yield put(setSummaryRecords(records));
}

export function* watchFetchRecordList() {
  while (true) {
    yield take(FETCH_RECORD_LIST);
    yield call(fetchRecordList);
  }
}

export function* summarySaga() {
  yield fork(watchFetchRecordList);
}
