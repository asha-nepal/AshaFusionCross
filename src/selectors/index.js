/* @flow */

import { createSelector } from 'reselect';
import _get from 'lodash.get';

export {
  getIsLoggedIn,
  getLoggedInUser,
  getIsAdmin,
} from './auth';

export {
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
