import {
  combineReducers,
} from 'redux'

import patientList from './patient-list'
import activePatient from './active-patient'

export default combineReducers({
  patientList,
  activePatient,
})
