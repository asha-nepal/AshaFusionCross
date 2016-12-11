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
import db from './db';
import auth from './auth';
import dform from './dform';

export default combineReducers({
  patientSelect,
  patientView,
  patientList,
  activePatient: modelReducer('activePatient'),
  activePatientForm: formReducer('activePatient'),
  activeRecords: modelReducer('activeRecords', []),
  activeRecordsForm: formReducer('activeRecords', []),
  status,
  alerts,
  db,
  auth,
  dform,
});
