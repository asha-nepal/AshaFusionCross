/* eslint-env jest */

jest.unmock('redux-saga/effects');
jest.unmock('react-redux-form');
jest.unmock('../../actions');
jest.unmock('../init-active-patient');

import Chance from 'chance';
import { put } from 'redux-saga/effects';
import {
  setActivePatient,
  resetActiveRecords,
} from '../../actions';
import { initActivePatient } from '../init-active-patient';

describe('INIT_ACTIVE_PATIENT', () => {
  it('calls setActivePatient with new ID and resetActiveRecords', () => {
    Chance.prototype.string.mockReturnValue('thisismockedid');

    const saga = initActivePatient();

    expect(saga.next().value)
      .toEqual(put(setActivePatient({
        _id: 'patient_thisismockedid',
        type: 'patient',
      })));

    expect(saga.next().value)
      .toEqual(put(resetActiveRecords()));

    expect(saga.next())
      .toEqual({ done: true, value: undefined });
  });
});
