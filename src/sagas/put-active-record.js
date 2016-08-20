import { take, put, call, select } from 'redux-saga/effects';
import {
  PUT_ACTIVE_RECORD,
  requestPutRecord,
  successPutRecord,
  failurePutRecord,
  alertInfo,
} from '../actions';
import { pouchPutPatient } from './put-active-patient';

export const pouchPutRecord = pouchPutPatient;

export function* putActiveRecord(index) {
  yield put(requestPutRecord());

  try {
    const record = yield select(state => state.activeRecords[index]);

    const now = (new Date()).getTime();  // Unix Millisecond Timestamp

    yield call(pouchPutRecord, {
      $created_at: now,
      ...record,
      $updated_at: now,
    });
  } catch (error) {
    yield put(failurePutRecord(error));
    return;
  }

  yield put(alertInfo('Record updated'));
  yield put(successPutRecord());
}

export function* watchPutActiveRecord() {
  while (true) {
    const { index } = yield take(PUT_ACTIVE_RECORD);
    yield call(putActiveRecord, index);
  }
}
