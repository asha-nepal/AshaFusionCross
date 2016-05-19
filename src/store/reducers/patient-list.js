import {
  SUCCESS_FETCH_PATIENT_LIST,
} from '../../actions'

export default (state = [], action) => {
  switch (action.type) {
    case SUCCESS_FETCH_PATIENT_LIST:
      return action.patientList

    default:
      return state
  }
}
