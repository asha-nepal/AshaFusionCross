import { take, put, call, select } from 'redux-saga/effects';
import {
  PUT_ACTIVE_RECORD,
  requestPutRecord,
  successPutRecord,
  failurePutRecord,
} from '../actions';
import { pouchPutPatient } from './put-active-patient';

const pouchPutRecord = pouchPutPatient;

function* putActiveRecord(index) {
  yield put(requestPutRecord());
  try {
    const record = yield select(state => state.activeRecords[index]);
    yield call(pouchPutRecord, record);
    yield put(successPutRecord());
  } catch (error) {
    yield put(failurePutRecord(error));
  }
}

export function* watchPutActiveRecord() {
  while (true) {
    const { index } = yield take(PUT_ACTIVE_RECORD);
    yield call(putActiveRecord, index);
  }
}
