import { delay } from 'redux-saga';
import { take, put, call, select } from 'redux-saga/effects';
import {
  ADD_NEW_ACTIVE_RECORD,
  selectActiveRecord,
  changeActiveRecord,
} from '../actions';
import {
  getActiveRecords,
} from '../selectors';

export function* addNewActiveRecord(patientId) {
  const patientIdBody = patientId.replace(/^patient_/, '');
  const now = (new Date()).getTime(); // Unix Millisecond Timestamp
  const newId = `record_${patientIdBody}_${now}`;
  const newRecord = {
    _id: newId,
    type: 'record',
    $initialized_at: now,
  };

  const activeRecords = yield select(getActiveRecords);
  yield put(changeActiveRecord(activeRecords.length, newRecord, { silent: true }));
  yield put(selectActiveRecord(newId));
}

export function* watchAddNewActiveRecord() {
  while (true) {
    const { patientId } = yield take(ADD_NEW_ACTIVE_RECORD);
    yield call(addNewActiveRecord, patientId);
    yield call(delay, 1);
    // record IDが1msごとに採番されるので1ms待つ
    // TODO 別のclientで同一patientに1ms以内に同時にrecordを追加されるとconflictする
    // この辺はしっかり考えるべき
  }
}
