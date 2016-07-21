/* @flow */

import {
  SELECT_ACTIVE_RECORD,
} from '../../actions';

const initialState = {
  selectedActiveRecordId: null,
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

    default:
      return state;
  }
}
