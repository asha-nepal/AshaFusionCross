/* eslint-env jest */

jest.unmock('redux-saga/effects');
jest.unmock('react-redux-form');
jest.unmock('../../actions');
jest.unmock('../init-active-patient');

import { createId } from '../../utils';
import { put } from 'redux-saga/effects';
import {
  changeActivePatient,
  resetActiveRecords,
} from '../../actions';
import { initActivePatient } from '../init-active-patient';

describe('INIT_ACTIVE_PATIENT', () => {
  it('calls changeActivePatient with new ID and resetActiveRecords as silent', () => {
    createId.mockReturnValue('thisismockedid');

    const saga = initActivePatient();

    expect(saga.next().value)
      .toEqual(put(changeActivePatient({
        _id: 'patient_thisismockedid',
        type: 'patient',
      }, {
        silent: true,
      })));

    expect(saga.next().value)
      .toEqual(put(resetActiveRecords()));

    expect(saga.next())
      .toEqual({ done: true, value: undefined });
  });
});
