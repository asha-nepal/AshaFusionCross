/**
 * Copyright 2017 Yuichiro Tsuchiya
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
