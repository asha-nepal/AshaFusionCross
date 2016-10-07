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

const defaultHost = (typeof location !== 'undefined' && location.hostname)
  ? location.hostname
  : '127.0.0.1';
const defaultPouchConfig: PouchConfig = {
  isLocal: false,
  local: {
    dbname: 'asha-fusion-dev',
    isSynced: false,
  },
  remote: {
    hostname: `${defaultHost}:5984`,
    dbname: 'asha-fusion-dev',
  },
};

export default combineReducers({
  patientSelect,
  patientView,
  patientList,
  activePatient: modelReducer('activePatient'),
  activePatientForm: formReducer('activePatient'),
  activeRecords: modelReducer('activeRecords', []),
  activeRecordsForm: formReducer('activeRecords'),
  pouchConfig: modelReducer('pouchConfig', defaultPouchConfig),
  pouchConfigForm: formReducer('pouchConfig'),
  status,
  alerts,
  db,
  auth,
});
