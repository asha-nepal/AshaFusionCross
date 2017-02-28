import {
  combineReducers,
} from 'redux';
import {
  modelReducer,
  formReducer,
} from 'react-redux-form';

import patientSelect from './patient-select';
import patientView from './patient-view';
import status from './status';
import alerts from './alerts';
import db from './db';
import auth from './auth';
import dform from './dform';
import forms from './forms';
import stats from './stats';
import { generatePouchDocsReducer } from './generator';

export default combineReducers({
  patientSelect,
  patientView,
  patientList: generatePouchDocsReducer('patients'),
  recordList: generatePouchDocsReducer('records'),
  activePatient: modelReducer('activePatient'),
  activePatientForm: formReducer('activePatient'),
  activeRecords: modelReducer('activeRecords', []),
  activeRecordsForm: formReducer('activeRecords', []),
  status,
  alerts,
  db,
  auth,
  dform,
  forms,
  stats,
});
