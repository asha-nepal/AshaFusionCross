import {
  createStore,
  applyMiddleware,
} from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

import reducers from './reducers';

export default () => {
  const sagaMiddleware = createSagaMiddleware();
  return {
    ...createStore(reducers, applyMiddleware(sagaMiddleware, thunk)),
    runSaga: sagaMiddleware.run,
  };
};
