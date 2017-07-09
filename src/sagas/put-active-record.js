import { take, put, call, select } from 'redux-saga/effects';
import {
  PUT_ACTIVE_RECORD,
  requestPutRecord,
  successPutRecord,
  failurePutRecord,
  changeActiveRecord,
  setActiveRecordPristine,
  alertInfo,
  alertError,
} from '../actions';

export function* putActiveRecord(db: PouchInstance, index: number) {
  yield put(requestPutRecord());

  const record = yield select(state => state.activeRecords[index]);
  const { loggedInUser } = yield select(state => state.auth);

  const now = Date.now();  // Unix Millisecond Timestamp

  try {
    const res = yield call([db, db.put], {
      $created_at: now,
      $created_by: loggedInUser || null,
      ...record,
      $updated_at: now,
      $updated_by: loggedInUser || null,
    });
    if (!res.ok || res.id !== record._id) {
      throw new Error('Invalid response');
    }

    yield put(changeActiveRecord(index, {
      ...record,
      _rev: res.rev,
    }, {
      silent: true,
    }));
    yield put(setActiveRecordPristine(index));

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
    const db = yield select(state => state.db.instance);
    yield call(putActiveRecord, db, index);
  }
}
