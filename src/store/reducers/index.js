/**
 * Copyright 2017 Yuichiro Tsuchiya
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
