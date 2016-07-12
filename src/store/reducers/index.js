import {
  combineReducers,
} from 'redux';
import { reducer as formReducer } from 'redux-form';

import patientList from './patient-list';
import activePatient from './active-patient';
import activeRecords from './active-records';
import status from './status';

export default combineReducers({
  form: formReducer,
  patientList,
  activePatient,
  activeRecords,
  status,
});
