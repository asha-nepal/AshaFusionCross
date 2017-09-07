/**
 * Copyright 2017 Yuichiro Tsuchiya
 * Copyright 2017 Yuguan Xing
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

/* @flow */

import { createSelector } from 'reselect';
import _get from 'lodash.get';

export {
  getIsLoggedIn,
  getLoggedInUser,
  getIsAdmin,
} from './auth';

export {
  getDformStyles,
  getRecordFormStyles, getDefaultRecordFormStyleId, getRecordFormStyleId, getRecordFormStyle,
  getPatientFormStyle,
} from './dform';

export {
  getRecordList,
  getRecordListForStats,
} from './stats';

export {
  getPatientList,
  getPatientSortField,
  getPatientSortOrder,
  getSortedFilteredPatientList,
  getPatientMax,
  makeGetDuplicatedPatients,
} from './patient-list';

export const getActivePatient = (state: Object) => state.activePatient;

export const getActiveRecords = (state: Object) => state.activeRecords;
export const getSelectedActiveRecordId =
  (state: Object) => state.patientView.selectedActiveRecordId;
export const getSelectedActiveRecord = createSelector(
  [getActiveRecords, getSelectedActiveRecordId],
  (activeRecords, selectedActiveRecordId) =>
    activeRecords.find(r => r._id === selectedActiveRecordId)
);
export const getSelectedActiveRecordIndex = createSelector(
  [getActiveRecords, getSelectedActiveRecordId],
  (activeRecords, selectedActiveRecordId) =>
    activeRecords.findIndex(r => r._id === selectedActiveRecordId)
);

function isFormPristine(formState, path) {
  const result = _get(formState, path, {});
  if ('$form' in result) return result.$form.pristine;

  return true;
}

export const getActiveRecordsForm = (state: Object) => state.activeRecordsForm;
export const getActiveRecordsFormPristineness = createSelector(
  [getActiveRecords, getActiveRecordsForm],
  (activeRecords, activeRecordsForm) =>
    activeRecords.map((r, i) => isFormPristine(activeRecordsForm, `[${i}]`)),
);
