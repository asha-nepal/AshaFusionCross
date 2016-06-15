jest.unmock('redux-saga/effects')
jest.unmock('../../actions')
jest.unmock('../add-new-active-record')

import Chance from 'chance'
import { put } from 'redux-saga/effects'
import {
  addActiveRecord,
} from '../../actions'
import { addNewActiveRecord } from '../add-new-active-record'

describe('ADD_NEW_ACTIVE_RECORD', () => {
  it('calls ADD_ACTIVE_RECORD with new ID', () => {
    const mockAction = {
      patientId: 'patient_foo',
    }
    Chance.prototype.string.mockReturnValue('thisismockedid')

    const saga = addNewActiveRecord(mockAction)

    expect(saga.next().value)
      .toEqual(put(addActiveRecord({
        _id: 'record_foo_thisismockedid',
        type: 'record',
      })))

    expect(saga.next())
      .toEqual({done: true, value: undefined})
  })
})
