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
  const { loggedInUser } = yield select(state => state.auth);

  const now = (new Date()).getTime();  // Unix Millisecond Timestamp

  try {
    yield call([db, db.put], {
      $created_at: now,
      $created_by: loggedInUser || null,
      ...record,
      $updated_at: now,
      $updated_by: loggedInUser || null,
    });
    yield put(alertInfo('Record updated'));
    yield put(successPutRecord());
  } catch (error) {
    const errmsg = error.name === 'forbidden' ? 'Forbidden' : 'Failed updating record';
    yield put(alertError(errmsg));
    yield put(failurePutRecord(error));
  }
}

export function* watchPutActiveRecord() {
  while (true) {
    const { index } = yield take(PUT_ACTIVE_RECORD);
    yield call(putActiveRecord, index);
  }
}
