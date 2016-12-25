/* @flow */

import Immutable from 'immutable';
import { createSelector } from 'reselect';

export const getRecordFormStyles = (state: Object): List<Map<string, any>> =>
  state.dform.styles.get('record', Immutable.List([]));

export const getDefaultRecordFormStyleId = (state: Object): ?number =>
  getRecordFormStyles(state).getIn([0, 'id']);

export const getRecordFormStyleId = (state: Object): ?number =>
  state.patientView.recordFormStyleId || getDefaultRecordFormStyleId(state);

export const getRecordFormStyle = createSelector(
  [getRecordFormStyleId, getRecordFormStyles],
  (recordFormStyleId, recordFormStyles) => {
    const recordFormStyle = recordFormStyles.find(s => s.get('id') === recordFormStyleId);
    return recordFormStyle.get('style');
  }
);

export const getPatientFormStyle = (state: Object): List<Map<string, any>> =>
  state.dform.styles.getIn(['patient', 0, 'style']);  // TODO とりあえず固定で
