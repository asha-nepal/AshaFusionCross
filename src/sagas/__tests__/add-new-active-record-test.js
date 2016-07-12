/* eslint-env jest */

jest.unmock('redux-saga');
jest.unmock('redux-saga/effects');
jest.unmock('../../actions');
jest.unmock('../add-new-active-record');

import moment from 'moment';
import { delay } from 'redux-saga';
import { take, put, call } from 'redux-saga/effects';
import {
  addActiveRecord,
  ADD_NEW_ACTIVE_RECORD,
} from '../../actions';
import {
  addNewActiveRecord,
  watchAddNewActiveRecord,
} from '../add-new-active-record';

describe('ADD_NEW_ACTIVE_RECORD', () => {
  it('calls ADD_ACTIVE_RECORD with new ID', () => {
    const mockMomentFormat = jest.fn().mockReturnValue('mocked-datetime');
    moment.mockReturnValue({
      format: mockMomentFormat,
    });

    const saga = addNewActiveRecord('patient_foo');

    expect(saga.next().value)
      .toEqual(put(addActiveRecord({
        _id: 'record_foo_mocked-datetime',
        type: 'record',
      })));

    expect(saga.next())
      .toEqual({ done: true, value: undefined });

    expect(mockMomentFormat).toBeCalledWith('x');  // Unix Millisecond Timestamp
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
