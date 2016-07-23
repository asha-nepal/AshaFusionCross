import {
  combineReducers,
} from 'redux';
import {
  modelReducer,
  formReducer,
} from 'react-redux-form';

import patientList from './patient-list';
import patientView from './patient-view';
import status from './status';
import alerts from './alerts';

import { defaultConfig } from '../../db';

export default combineReducers({
  patientList,
  patientView,
  activePatient: modelReducer('activePatient'),
  activePatientForm: formReducer('activePatient'),
  activeRecords: modelReducer('activeRecords', []),
  activeRecordsForm: formReducer('activeRecords'),
  pouchConfig: modelReducer('pouchConfig', defaultConfig),
  pouchConfigForm: formReducer('pouchConfig'),
  status,
  alerts,
});
