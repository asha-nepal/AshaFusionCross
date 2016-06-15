jest.unmock('../../../actions')
jest.unmock('../active-records')

import deepFreeze from 'deep-freeze'

import {
  setActiveRecords,
  addActiveRecord,
  updateActiveRecord,
} from '../../../actions'
import reducer from '../active-records'

describe('SET_ACTIVE_RECORDS', () => {
  it('clear all existing records set new ones', () => {
    const recordsBefore = [
      {_id: 'record_foo', type: 'record', data: 'foo'},
      {_id: 'record_bar', type: 'record', data: 'bar'},
    ]
    const newRecords = [
      {_id: 'record_hoge', type: 'record', data: 'hoge'},
      {_id: 'record_fuga', type: 'record', data: 'fuga'},
    ]

    const action = setActiveRecords(newRecords)

    deepFreeze(recordsBefore)
    deepFreeze(action)

    expect(reducer(recordsBefore, action))
      .toEqual(newRecords)
  })
})

describe('UPDATE_ACTIVE_RECORD', () => {
  it('updates one existing record', () => {
    const recordsBefore = [
      {_id: 'record_foo', type: 'record', dataA: 'aaaaa', dataB: 'bbbbb'},
      {_id: 'record_bar', type: 'record', dataA: 'AAAAA', dataB: 'BBBBB'},
    ]

    const newRecord = {_id: 'record_foo', type: 'record', dataA: 'xxxxx', dataB: 'yyyyy'}

    const action = updateActiveRecord(newRecord)

    const recordsAfter = [
      {_id: 'record_foo', type: 'record', dataA: 'xxxxx', dataB: 'yyyyy'},
      {_id: 'record_bar', type: 'record', dataA: 'AAAAA', dataB: 'BBBBB'},
    ]

    deepFreeze(recordsBefore)
    deepFreeze(action)

    expect(reducer(recordsBefore, action))
      .toEqual(recordsAfter)
  })

  it('has no effect if there is no record whose id is equals to given one', () => {
    const recordsBefore = [
      {_id: 'record_bar',type: 'record',dataA: 'AAAAA',dataB: 'BBBBB'},
    ]

    const newRecord = {_id: 'record_foo',type: 'record',dataA: 'xxxxx',dataB: 'yyyyy'}

    const action = updateActiveRecord(newRecord)

    deepFreeze(recordsBefore)
    deepFreeze(action)

    expect(reducer(recordsBefore, action))
      .toEqual(recordsBefore)
  })
})

describe('ADD_ACTIVE_RECORD', () => {
  it('adds a new entity to records', () => {
    const recordsBefore = [
      {_id: 'record_foo', type: 'record', data: 'FOO'},
    ]

    const newRecord = {_id: 'record_bar', type: 'record', data: "BAR"}

    const action = addActiveRecord(newRecord)

    const recordsAfter = [
      {_id: 'record_foo', type: 'record', data: 'FOO'},
      {_id: 'record_bar', type: 'record', data: "BAR"},
    ]

    deepFreeze(recordsBefore)
    deepFreeze(action)

    expect(reducer(recordsBefore, action))
      .toEqual(recordsAfter)
  })
})
