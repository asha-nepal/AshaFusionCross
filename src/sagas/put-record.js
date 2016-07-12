import { takeLatest } from 'redux-saga';
import { put, call } from 'redux-saga/effects';
import {
  PUT_RECORD,
  requestPutRecord,
  successPutRecord,
  failurePutRecord,
} from '../actions';
import { pouchPutPatient } from './put-patient';

const pouchPutRecord = pouchPutPatient;

function* putRecord(action) {
  yield put(requestPutRecord());
  try {
    yield call(pouchPutRecord, action.record);
    yield put(successPutRecord());
  } catch (error) {
    yield put(failurePutRecord(error));
  }
}

export function* watchPutRecord() {
  yield* takeLatest(PUT_RECORD, putRecord);
}
