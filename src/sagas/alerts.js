import { delay } from 'redux-saga';
import { take, put, call, fork } from 'redux-saga/effects';
import Chance from 'chance';
import {
  PUSH_ALERT,
  addAlert,
  removeAlert,
} from '../actions';

const chance = new Chance();

export function* pushAlert(message: string, type: string, timeout: number = 2000) {
  const id = chance.string();
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
