import {
  combineReducers,
} from 'redux'

import patientList from './patient-list'
import patientData from './patient-data'

export default combineReducers({
  patientList,
  patientData,
})
