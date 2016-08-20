/* eslint-env jest, jasmine */

jest.unmock('redux-thunk');
jest.unmock('redux-saga');
jest.unmock('redux-saga/effects');
jest.unmock('react-redux-form');
jest.unmock('../../actions');
jest.unmock('../add-new-active-record');

import moment from 'moment';
import { delay } from 'redux-saga';
import { take, put, call } from 'redux-saga/effects';
import { actionTypes as formActionTypes } from 'react-redux-form';
import {
  ADD_NEW_ACTIVE_RECORD,
  selectActiveRecord,
} from '../../actions';
import {
  addNewActiveRecord,
  watchAddNewActiveRecord,
} from '../add-new-active-record';

describe('ADD_NEW_ACTIVE_RECORD', () => {
  it('calls actions.push() with new ID', () => {
    const mockMomentFormat = jest.fn().mockReturnValue('mocked-datetime');
    moment.mockReturnValue({
      format: mockMomentFormat,
    });

    const saga = addNewActiveRecord('patient_foo');

//    expect(saga.next().value)
//      .toEqual(put(formActions.push('activeRecords', {  // TODO: thunk actionの比較
//        _id: 'record_foo_mocked-datetime',
//        type: 'record',
//      })));
// 本来は上記のようなテストを短く書きたいが，redux-thunk actionの取り扱いに手間取り，以下の様なテストになった
    const value1 = saga.next().value;
    const action1 = value1.PUT.action;
    expect(action1).toEqual(jasmine.any(Function));

    const dummyDispatch = jest.fn();
    const dummyGetState = jest.fn().mockReturnValue({
      activeRecords: [
        'existing data',
      ],
    });
    action1(dummyDispatch, dummyGetState);
    expect(dummyDispatch).toBeCalledWith({
      type: formActionTypes.CHANGE,
      model: 'activeRecords',
      value: [
        'existing data',
        {
          _id: 'record_foo_mocked-datetime',
          type: 'record',
        },
      ],
    });


    expect(saga.next().value)
      .toEqual(put(selectActiveRecord('record_foo_mocked-datetime')));

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
