import { watchFetchPatient } from '../fetch-patient';
import { watchFetchPouchDocs } from '../fetch-pouch-docs';
import { watchPutActivePatient } from '../put-active-patient';
import { watchPutActiveRecord } from '../put-active-record';
import { watchRemoveActivePatient } from '../remove-active-patient';
import { watchInitActivePatient } from '../init-active-patient';
import { watchAddNewActiveRecord } from '../add-new-active-record';
import { watchDformStyleFetch, watchDformStylePut } from '../dform';
import { watchOnPouchChanges } from '../db';

export default [
  watchFetchPatient,
  watchFetchPouchDocs,
  watchPutActivePatient,
  watchPutActiveRecord,
  watchRemoveActivePatient,
  watchInitActivePatient,
  watchAddNewActiveRecord,
  watchDformStyleFetch,
  watchDformStylePut,
  watchOnPouchChanges,
];
