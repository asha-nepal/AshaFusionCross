/* @flow */

import {
  SUCCESS_FETCH_PATIENT_LIST,
} from '../../actions'

export default (
  state: Array<PatientObject> = [],
  action: {
    type: string,
    patientList: Array<PatientObject>,
  }
): Array<PatientObject> => {
  switch (action.type) {
    case SUCCESS_FETCH_PATIENT_LIST:
      return action.patientList

    default:
      return state
  }
}
