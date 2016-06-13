import {
  SUCCESS_FETCH_PATIENT,
  SET_ACTIVE_RECORDS,
  UPDATE_ACTIVE_RECORD,
} from '../../actions'

export default (records = [], action) => {
  switch (action.type) {
    case SUCCESS_FETCH_PATIENT:
    case SET_ACTIVE_RECORDS:
      return action.records

    case UPDATE_ACTIVE_RECORD:
      return records.map(r => r._id === action.record._id ? action.record : r)

    default:
      return records
  }
}
