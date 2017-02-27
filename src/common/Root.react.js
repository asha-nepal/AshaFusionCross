/* Deplicated. Use `connect` instead. */

import React from 'react';

import {
  Provider,
} from 'react-redux';

import rootSaga from '../sagas';
import configureStore from '../store/configureStore';

const store = configureStore();
store.runSaga(rootSaga);

export default (props: {children: ReactClass<{}>}) => (
  <Provider store={store} >
    {props.children}
  </Provider>
);
