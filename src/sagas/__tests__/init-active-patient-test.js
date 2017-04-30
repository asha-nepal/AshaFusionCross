/* eslint-env jest */

jest.mock('randomstring', () => jest.fn());
jest.unmock('redux-saga/effects');
jest.unmock('redux-saga');
jest.unmock('react-redux-form');
jest.unmock('../../actions');
jest.unmock('../init-active-patient');

import randomstringPromise from 'randomstring';
import { put, call } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import {
  requestFetchPatient,
  successFetchPatient,
  changeActivePatient,
  resetActiveRecords,
} from '../../actions';
import { initActivePatient } from '../init-active-patient';

describe('INIT_ACTIVE_PATIENT', () => {
  it('calls changeActivePatient with new ID and resetActiveRecords as silent', () => {
    const saga = initActivePatient();

    expect(saga.next().value)
      .toEqual(put(requestFetchPatient()));

    expect(saga.next().value)
      .toEqual(call(delay, 100));

    expect(saga.next().value)
      .toEqual(call(randomstringPromise, 16));

    expect(saga.next('thisismockedid').value)
      .toEqual(put(changeActivePatient({
        _id: 'patient_thisismockedid',
        type: 'patient',
      }, {
        silent: true,
      })));

    expect(saga.next().value)
      .toEqual(put(resetActiveRecords()));

    expect(saga.next().value)
      .toEqual(put(successFetchPatient()));

    expect(saga.next())
      .toEqual({ done: true, value: undefined });
  });
});
