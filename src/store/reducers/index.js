import {
  combineReducers,
} from 'redux'
import {reducer as formReducer} from 'redux-form';

import patientList from './patient-list'
import activePatient from './active-patient'

export default combineReducers({
  form: formReducer,
  patientList,
  activePatient,
})
