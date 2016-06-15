import { takeLatest, takeEvery } from 'redux-saga'
import { take, put, call, fork, select } from 'redux-saga/effects'
import Chance from 'chance'
import {
  ADD_NEW_ACTIVE_RECORD,
  addActiveRecord,
} from '../actions'

const chance = new Chance()
const idStringPool = '0123456789abcefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ' // URLセーフな文字のみ

export function* addNewActiveRecord(action) {
  const patientIdBody = action.patientId.replace(/^patient_/, '')
  const id = chance.string({pool: idStringPool, length: 16})
  yield put(addActiveRecord({
    _id: `record_${patientIdBody}_${id}`,
    type: 'record',
  }))
}

export function* watchAddNewActiveRecord() {
  yield* takeEvery(ADD_NEW_ACTIVE_RECORD, addNewActiveRecord)
}
