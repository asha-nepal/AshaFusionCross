import { fork, put, select } from 'redux-saga/effects';

import {
  dbConnectRequest,
} from '../actions';

import {
  watchPushAlert,
} from './alerts';
import {
  loginFlow,
  anonymousLoginFlow,
  logoutFlow,
  signupFlow,
} from './auth';
import {
  connectFlow,
} from './db';

const initialSagas = [
  watchPushAlert,
];


export default function* rootSaga() {
  for (let i = 0; i < initialSagas.length; ++i) {
    yield fork(initialSagas[i]);
  }

  yield fork(connectFlow);
  yield fork(anonymousLoginFlow);
  yield fork(loginFlow);
  yield fork(logoutFlow);
  yield fork(signupFlow);

  const pouchConfig = yield select(state => state.db.config);
  yield put(dbConnectRequest(pouchConfig));
}
