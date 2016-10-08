import { fork, put } from 'redux-saga/effects';

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

  const pouchConfig = {
    isLocal: false,
    local: {
      dbname: 'asha-fusion-dev',
      isSynced: false,
    },
    remote: {
      hostname: 'localhost:5984',
      dbname: 'asha-fusion-dev',
    },
  };

  yield put(dbConnectRequest(pouchConfig));
}
