/* @flow */

import { createSelector } from 'reselect';

export const getRecordFormStyles = (state: Object) => state.dform.styles.record || [];
export const getDefaultRecordFormStyleId = (state: Object) =>
  getRecordFormStyles(state)[0] && getRecordFormStyles(state)[0].id;

export const getRecordFormStyleId = (state: Object) =>
  state.patientView.recordFormStyleId || getDefaultRecordFormStyleId(state);

export const getRecordFormStyle = createSelector(
  [getRecordFormStyleId, getRecordFormStyles],
  (recordFormStyleId, recordFormStyles) => {
    const recordFormStyle = recordFormStyles.find(s => s.id === recordFormStyleId);
    return recordFormStyle && recordFormStyle.style;
  }
);

export const getRecordFieldTypes = (state: Object) => state.dform.fieldTypes.record;

export const getPatientFormStyle = (state: Object) =>
  state.dform.styles.patient[0].style;  // TODO とりあえず固定で
