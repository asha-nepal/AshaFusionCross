/* @flow */

import {
  DB_SET_INSTANCE,
} from '../../actions';

const initialState: DBState = {
  instance: null,
};

export default function (state: DBState = initialState, action: DBAction) {
  switch (action.type) {
    case DB_SET_INSTANCE:
      return {
        ...state,
        instance: action.payload.instance,
      };

    default:
      return state;
  }
}
