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

/* eslint-env jest, jasmine */

import MockDate from 'mockdate';
import { delay } from 'redux-saga';
import {
  take, put, call, select,
} from 'redux-saga/effects';

import {
  ADD_NEW_ACTIVE_RECORD,
  changeActiveRecord,
  selectActiveRecord,
} from '../../actions';
import {
  getActiveRecords,
} from '../../selectors';
import {
  addNewActiveRecord,
  watchAddNewActiveRecord,
} from '../add-new-active-record';

jest.unmock('redux-thunk');
jest.unmock('redux-saga');
jest.unmock('redux-saga/effects');
jest.unmock('react-redux-form');
jest.unmock('mockdate');
jest.unmock('../../actions');
jest.unmock('../add-new-active-record');
jest.unmock('../../selectors');

describe('ADD_NEW_ACTIVE_RECORD', () => {
  const mockCurrentTime = 1234567890123;

  beforeEach(() => {
    MockDate.set(mockCurrentTime);
  });

  afterEach(() => {
    MockDate.reset();
  });

  it('calls actions.push() with new ID', () => {
    const saga = addNewActiveRecord('patient_foo');

    expect(saga.next().value)
      .toEqual(select(getActiveRecords));

    expect(saga.next([{}, {}]).value)
      .toEqual(put(changeActiveRecord(2, {
        _id: 'record_foo_1234567890123',
        type: 'record',
        $initialized_at: 1234567890123,
      }, { silent: true })));

    expect(saga.next().value)
      .toEqual(put(selectActiveRecord('record_foo_1234567890123')));

    expect(saga.next())
      .toEqual({ done: true, value: undefined });
  });
});

describe('watchAddNewActiveRecord', () => {
  it('calls addNewActiveRecord() with 1ms delay in blocking way', () => {
    const saga = watchAddNewActiveRecord();

    expect(saga.next().value)
      .toEqual(take(ADD_NEW_ACTIVE_RECORD));

    expect(saga.next({ patientId: 'patient_bar' }).value)
      .toEqual(call(addNewActiveRecord, 'patient_bar'));

    expect(saga.next().value)
      .toEqual(call(delay, 1));
  });
});
