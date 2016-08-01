/* @flow */

import {
  SELECT_ACTIVE_RECORD,
  SET_RECORD_FORM_STYLE_ID,
} from '../../actions';

const initialState = {
  selectedActiveRecordId: null,
  recordFormStyleId: null,
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

    default:
      return state;
  }
}
