/* @flow */

import {
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT_SUCCESS,
} from '../../actions';

const initialState: Object = {
  loggedIn: false,
  loggedInUser: null,
  loggedInRoles: null,
};

export default function (
  state: Object = initialState,
  action: AuthAction,
): Object {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        loggedInUser: action.payload.response.name,
        loggedInRoles: action.payload.response.roles,
      };

    case LOGIN_ERROR:
    case LOGOUT_SUCCESS:
      return {
        ...state,
        loggedIn: false,
        loggedInUser: null,
        loggedInRoles: null,
      };

    default:
      return state;
  }
}
