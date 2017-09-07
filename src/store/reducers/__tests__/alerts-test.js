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

/* eslint-env jest */

jest.unmock('../../../actions');
jest.unmock('../alerts');

import deepFreeze from 'deep-freeze';

import {
  addAlert,
  removeAlert,
} from '../../../actions';
import reducer from '../alerts';

describe('ADD_ALERT', () => {
  it('adds new alert', () => {
    const alertsBefore = [
      { id: 'foo', message: 'Fooooo', type: 'info' },
    ];
    const action = addAlert('bar', 'Barrrr', 'error');

    const alertsAfter = [
      { id: 'foo', message: 'Fooooo', type: 'info' },
      { id: 'bar', message: 'Barrrr', type: 'error' },
    ];

    deepFreeze(alertsBefore);
    deepFreeze(action);

    expect(reducer(alertsBefore, action))
      .toEqual(alertsAfter);
  });
});

describe('REMOVE_ALERT', () => {
  it('removes one alert specified by ID', () => {
    const alertsBefore = [
      { id: 'foo', message: 'Fooooo', type: 'info' },
      { id: 'bar', message: 'Barrrr', type: 'error' },
    ];

    const action = removeAlert('foo');

    const alertsAfter = [
      { id: 'bar', message: 'Barrrr', type: 'error' },
    ];

    deepFreeze(alertsBefore);
    deepFreeze(action);

    expect(reducer(alertsBefore, action))
      .toEqual(alertsAfter);
  });
});
