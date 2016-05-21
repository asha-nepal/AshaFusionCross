import {
  SUCCESS_FETCH_PATIENT_DATA,
} from '../../actions'

export default (state = {}, action) => {
  switch (action.type) {
    case SUCCESS_FETCH_PATIENT_DATA:
      return action.patientData

    default:
      return state
  }
}
