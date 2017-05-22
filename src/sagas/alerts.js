import { delay } from 'redux-saga';
import { take, put, call, fork } from 'redux-saga/effects';
import {
  PUSH_ALERT,
  addAlert,
  removeAlert,
} from '../actions';

let _id = 0;
function getId() {
  return _id++;
}

export function* pushAlert(message: string, type: string, timeout: number = 2000) {
  const id = getId();
  yield put(addAlert(id, message, type));
  yield call(delay, timeout);
  yield put(removeAlert(id));
}

export function* watchPushAlert() {
  while (true) {
    const { payload } = yield take(PUSH_ALERT);
    yield fork(pushAlert, payload.message, payload.type, payload.timeout);
  }
}
