import React from 'react';

import {
  Provider,
} from 'react-redux';

import rootSaga from '../sagas';
import configureStore from '../store/configureStore';

const store = configureStore();
store.runSaga(rootSaga);

import { subscribe } from '../db';
import {
  requestLogout,
  alertError,
} from '../actions';
subscribe('error', err => {
  store.dispatch(alertError(`ERR: change listener ${err.message || ''}`));
  store.dispatch(requestLogout());
  console.log('change error', err);
});

export default (props: {children: ReactClass<{}>}) => (
  <Provider store={store} >
    {props.children}
  </Provider>
);
