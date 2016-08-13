import {
  createStore,
  applyMiddleware,
  compose,
} from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

import reducers from './reducers';

export default () => {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = applyMiddleware(sagaMiddleware, thunk);
  return {
    ...createStore(
      reducers,
      process.env.NODE_ENV
        ? middlewares
        : compose(
          middlewares,
          typeof window === 'object' && typeof window.devToolsExtension !== 'undefined'
            ? window.devToolsExtension()
            : f => f
        )
    ),
    runSaga: sagaMiddleware.run,
  };
};
