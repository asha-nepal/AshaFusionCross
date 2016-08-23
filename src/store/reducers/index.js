import {
  combineReducers,
} from 'redux';
import {
  modelReducer,
  formReducer,
} from 'react-redux-form';

import patientList from './patient-list';
import patientSelect from './patient-select';
import patientView from './patient-view';
import status from './status';
import alerts from './alerts';
import auth from './auth';

import { defaultConfig } from '../../db';

export default combineReducers({
  patientSelect,
  patientView,
  patientList,
  activePatient: modelReducer('activePatient'),
  activePatientForm: formReducer('activePatient'),
  activeRecords: modelReducer('activeRecords', []),
  activeRecordsForm: formReducer('activeRecords'),
  pouchConfig: modelReducer('pouchConfig', defaultConfig),
  pouchConfigForm: formReducer('pouchConfig'),
  status,
  alerts,
  auth,
});
