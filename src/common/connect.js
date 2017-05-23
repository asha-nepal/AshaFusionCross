import React from 'react';

import {
  Provider,
} from 'react-redux';

import rootSaga from '../sagas';
import configureStore from '../store/configureStore';

const store = configureStore();
store.runSaga(rootSaga);

export default (
  WrappedComponent: ReactClass<{}>
) => (() => (
  <Provider store={store} >
    <WrappedComponent />
  </Provider>
));
