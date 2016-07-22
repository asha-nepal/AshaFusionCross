import { delay } from 'redux-saga';
import { take, put, call } from 'redux-saga/effects';
import { actions as formActions } from 'react-redux-form';
import moment from 'moment';
import {
  ADD_NEW_ACTIVE_RECORD,
  selectActiveRecord,
} from '../actions';

export function* addNewActiveRecord(patientId) {
  const patientIdBody = patientId.replace(/^patient_/, '');
  const datetime = moment().format('x'); // Unix Millisecond Timestamp
  const newId = `record_${patientIdBody}_${datetime}`;
  yield put(formActions.push('activeRecords', {
    _id: newId,
    type: 'record',
  }));
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
