/* eslint-env jest */

jest.unmock('redux-saga/effects');
jest.unmock('react-redux-form');
jest.unmock('../../actions');
jest.unmock('../init-active-patient');

import Chance from 'chance';
import { put } from 'redux-saga/effects';
import { actions as formActions } from 'react-redux-form';
import { initActivePatient } from '../init-active-patient';

describe('INIT_ACTIVE_PATIENT', () => {
  it('calls actions.change() with new ID', () => {
    Chance.prototype.string.mockReturnValue('thisismockedid');

    const saga = initActivePatient();

    expect(saga.next().value)
      .toEqual(put(formActions.change('activePatient', {
        _id: 'patient_thisismockedid',
        type: 'patient',
      })));

    expect(saga.next().value)
      .toEqual(put(formActions.reset('activeRecords')));

    expect(saga.next())
      .toEqual({ done: true, value: undefined });
  });
});
