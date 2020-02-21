/**
 * Copyright 2017 Yuichiro Tsuchiya
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* Deplicated. Use `connect` instead. */

import React from 'react';

import {
  Provider,
} from 'react-redux';

import rootSaga from '../sagas';
import configureStore from '../store/configureStore';

export const store = configureStore();
store.runSaga(rootSaga);

export default (props: {children: ReactClass<{}>}) => (
  <Provider store={store} >
    {props.children}
  </Provider>
);
