import { takeLatest } from 'redux-saga';
import { put, call, select } from 'redux-saga/effects';
import {
  PUT_ACTIVE_RECORD,
  requestPutRecord,
  successPutRecord,
  failurePutRecord,
} from '../actions';
import { pouchPutPatient } from './put-active-patient';

const pouchPutRecord = pouchPutPatient;

function* putActiveRecord(action) {
  yield put(requestPutRecord());
  try {
    const record = yield select(state => state.activeRecords[action.index]);
    yield call(pouchPutRecord, record);
    yield put(successPutRecord());
  } catch (error) {
    yield put(failurePutRecord(error));
  }
}

export function* watchPutActiveRecord() {
  yield* takeLatest(PUT_ACTIVE_RECORD, putActiveRecord);
}
