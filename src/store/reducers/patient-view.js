/* @flow */

import {
  SELECT_ACTIVE_RECORD,
  SET_RECORD_FORM_STYLE_ID,
  SET_PATIENT_FORM_VISIBILITY,
} from '../../actions';

const initialState = {
  selectedActiveRecordId: null,
  recordFormStyleId: null,
  patientFormVisibility: false,
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

    default:
      return state;
  }
}
