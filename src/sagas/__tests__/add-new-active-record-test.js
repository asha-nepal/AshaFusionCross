/* eslint-env jest, jasmine */

jest.unmock('redux-thunk');
jest.unmock('redux-saga');
jest.unmock('redux-saga/effects');
jest.unmock('react-redux-form');
jest.unmock('mockdate');
jest.unmock('../../actions');
jest.unmock('../add-new-active-record');

import MockDate from 'mockdate';
import { delay } from 'redux-saga';
import { take, put, call } from 'redux-saga/effects';
// import { actions } from 'react-redux-form';
import {
  ADD_NEW_ACTIVE_RECORD,
  selectActiveRecord,
} from '../../actions';
import {
  addNewActiveRecord,
  watchAddNewActiveRecord,
} from '../add-new-active-record';

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

//    expect(saga.next().value)
//      .toEqual(put(actions.push('activeRecords', {  // TODO: thunk actionの比較
//        _id: 'record_foo_mocked-datetime',
//        type: 'record',
//        $initialized_at: 1234567890123,
//      })));
// 本来は上記のようなテストを短く書きたいが，redux-thunk actionの取り扱いに手間取り，以下の様なテストになった
    const value1 = saga.next().value;
    const action1 = value1.PUT.action;
    expect(action1).toEqual(jasmine.any(Function));

    const dummyDispatch = jest.fn(action => {
      // jestはObjectのsubsetを比較するassertionが無いので，各要素を個別にassertする
      expect(action.model).toEqual('activeRecords');
      expect(action.value).toEqual([
        'existing data',
        {
          _id: 'record_foo_1234567890123',
          type: 'record',
          $initialized_at: 1234567890123,
        },
      ]);
    });
    const dummyGetState = jest.fn().mockReturnValue({
      activeRecords: [
        'existing data',
      ],
    });
    action1(dummyDispatch, dummyGetState);
    expect(dummyDispatch).toBeCalled();

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
