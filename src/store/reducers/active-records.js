/* @flow */

import {
  SUCCESS_FETCH_PATIENT,
  SET_ACTIVE_RECORDS,
  ADD_ACTIVE_RECORD,
  UPDATE_ACTIVE_RECORD,
  ADD_OR_UPDATE_ACTIVE_RECORD,
} from '../../actions'

export default (
  records: Array<RecordObject> = [],
  action: {
    type: string,
    record: RecordObject,
    records: Array<RecordObject>
  }
): Array<RecordObject> => {
  switch (action.type) {
    case SUCCESS_FETCH_PATIENT:
    case SET_ACTIVE_RECORDS:
      return action.records

    case ADD_ACTIVE_RECORD:
      return [
        ...records,
        action.record,
      ]

    case UPDATE_ACTIVE_RECORD:
      return records.map(r => r._id === action.record._id ? action.record : r)

    case ADD_OR_UPDATE_ACTIVE_RECORD:
      const index = records.findIndex(r => r._id === action.record._id)
      if (index > -1) {
        return [
          ...records.slice(0, index),
          action.record,
          ...records.slice(index+1),
        ]
      } else {
        return [
          ...records,
          action.record,
        ]
      }

    default:
      return records
  }
}
