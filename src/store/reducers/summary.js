/* @flow */

import {
  SET_SUMMARY_RECORDS,
} from '../../actions';

const initialState: SummaryState = {
  records: null,
};

export default (state: SummaryState = initialState, action: SummaryAction): SummaryState => {
  switch (action.type) {
    case SET_SUMMARY_RECORDS:
      return {
        ...state,
        records: action.payload.records,
      };

    default:
      return state;
  }
};
