/* @flow */

import {
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  SET_IS_DB_PUBLIC,
} from '../../actions';

const initialState: Object = {
  isDBPublic: true,
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
        loggedInUser: action.payload.name,
        loggedInRoles: action.payload.roles,
      };

    case LOGOUT_SUCCESS:
      return {
        ...state,
        loggedIn: false,
        loggedInUser: null,
        loggedInRoles: null,
      };

    case SET_IS_DB_PUBLIC:
      return {
        ...state,
        isDBPublic: action.payload.isDBPublic,
      };

    default:
      return state;
  }
}
