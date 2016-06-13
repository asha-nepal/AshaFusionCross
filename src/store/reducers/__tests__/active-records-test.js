jest.unmock('../../../actions')
jest.unmock('../active-records')

import deepFreeze from 'deep-freeze'

import {
  updateActiveRecord,
} from '../../../actions'
import reducer from '../active-records'

describe('UPDATE_ACTIVE_RECORD', () => {
  it('updates one existing record', () => {
    const recordsBefore = [
      {
        _id: 'record_foo',
        type: 'record',
        dataA: 'aaaaa',
        dataB: 'bbbbb',
      },
      {
        _id: 'record_bar',
        type: 'record',
        dataA: 'AAAAA',
        dataB: 'BBBBB',
      },
    ]

    const newRecord = {
      _id: 'record_foo',
      type: 'record',
      dataA: 'xxxxx',
      dataB: 'yyyyy',
    }

    const action = updateActiveRecord(newRecord)

    const recordsAfter = [
      {
        _id: 'record_foo',
        type: 'record',
        dataA: 'xxxxx',
        dataB: 'yyyyy',
      },
      {
        _id: 'record_bar',
        type: 'record',
        dataA: 'AAAAA',
        dataB: 'BBBBB',
      },
    ]

    deepFreeze(recordsBefore)
    deepFreeze(action)

    expect(reducer(recordsBefore, action))
      .toEqual(recordsAfter)
  })

  it('has no effect if there is no record whose id is equals to given one', () => {
    const recordsBefore = [
      {
        _id: 'record_bar',
        type: 'record',
        dataA: 'AAAAA',
        dataB: 'BBBBB',
      },
    ]

    const newRecord = {
      _id: 'record_foo',
      type: 'record',
      dataA: 'xxxxx',
      dataB: 'yyyyy',
    }

    const action = updateActiveRecord(newRecord)

    deepFreeze(recordsBefore)
    deepFreeze(action)

    expect(reducer(recordsBefore, action))
      .toEqual(recordsBefore)
  })
})
