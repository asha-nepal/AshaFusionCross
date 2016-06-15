jest.unmock('redux-saga/effects')
jest.unmock('../../actions')
jest.unmock('../init-active-patient')

import Chance from 'chance'
import { put } from 'redux-saga/effects'
import {
  updateActivePatient,
  setActiveRecords,
} from '../../actions'
import { initActivePatient } from '../init-active-patient'

describe('INIT_ACTIVE_PATIENT', () => {
  it('calls UPDATE_ACTIVE_PATIENT with new ID', () => {
    const mockId = 'thisismockedid'
    Chance.prototype.string.mockReturnValue(mockId)

    const saga = initActivePatient()

    expect(saga.next().value)
      .toEqual(put(updateActivePatient({
        _id: 'patient_' + mockId,
        type: 'patient',
      })))

    expect(saga.next().value)
      .toEqual(put(setActiveRecords([])))

    expect(saga.next())
      .toEqual({done: true, value: undefined})
  })
})
