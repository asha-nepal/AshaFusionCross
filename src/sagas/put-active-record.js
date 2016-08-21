import { take, put, call, select } from 'redux-saga/effects';
import {
  PUT_ACTIVE_RECORD,
  requestPutRecord,
  successPutRecord,
  failurePutRecord,
  alertInfo,
  alertError,
} from '../actions';
import { db } from '../db';

export function* putActiveRecord(index) {
  yield put(requestPutRecord());

  const record = yield select(state => state.activeRecords[index]);

  const now = (new Date()).getTime();  // Unix Millisecond Timestamp

  try {
    yield call([db, db.put], {
      $created_at: now,
      ...record,
      $updated_at: now,
    });
    yield put(alertInfo('Record updated'));
    yield put(successPutRecord());
  } catch (error) {
    yield put(alertError('Failed updating record'));
    yield put(failurePutRecord(error));
  }
}

export function* watchPutActiveRecord() {
  while (true) {
    const { index } = yield take(PUT_ACTIVE_RECORD);
    yield call(putActiveRecord, index);
  }
}
