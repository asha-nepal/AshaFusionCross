/* @flow */

import {
  SELECT_ACTIVE_RECORD,
  SET_RECORD_FORM_STYLE_ID,
  SET_PATIENT_FORM_VISIBILITY,
  SET_RECORD_CHART_VISIBILITY,
  SET_RECORD_CHART_TYPE,
} from '../../actions';

const initialState = {
  selectedActiveRecordId: null,
  recordFormStyleId: null,
  patientFormVisibility: false,
  recordChartVisibility: false,
  recordChartType: null,
};

export default function (
  state: Object = initialState,
  action: PatientViewAction
): Object {
  switch (action.type) {
    case SELECT_ACTIVE_RECORD:
      return Object.assign({}, state, {
        selectedActiveRecordId: action.payload.id,
      });

    case SET_RECORD_FORM_STYLE_ID:
      return Object.assign({}, state, {
        recordFormStyleId: action.payload.styleId,
      });

    case SET_PATIENT_FORM_VISIBILITY:
      return Object.assign({}, state, {
        patientFormVisibility: action.payload.visibility,
      });

    case SET_RECORD_CHART_VISIBILITY:
      return Object.assign({}, state, {
        recordChartVisibility: action.payload.visibility,
      });

    case SET_RECORD_CHART_TYPE:
      return Object.assign({}, state, {
        recordChartType: action.payload.type,
      });

    default:
      return state;
  }
}
