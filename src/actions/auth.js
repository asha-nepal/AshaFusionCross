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

// for saga
export const REQUEST_LOGIN = 'REQUEST_LOGIN';
export const requestLogin = (username: string, password: string): RequestLoginAction => ({
  type: REQUEST_LOGIN,
  payload: {
    username,
    password,
  },
});

export const REQUEST_ANONYMOUS_LOGIN = 'REQUEST_ANONYMOUS_LOGIN';
export const requestAnonymousLogin = (): Action => ({
  type: REQUEST_ANONYMOUS_LOGIN,
});

export const REQUEST_LOGOUT = 'REQUEST_LOGOUT';
export const requestLogout = (): Action => ({
  type: REQUEST_LOGOUT,
});

export const REQUEST_SIGNUP = 'REQUEST_SIGNUP';
export const requestSignup = (
  username: string,
  password: string,
  andLogin: boolean
): RequestSignupAction => ({
  type: REQUEST_SIGNUP,
  payload: {
    username,
    password,
    andLogin,
  },
});


// for reducers
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const loginSuccess = (
  name: string,
  roles: Array<string>,
  meta: ?Object,
): LoginSuccessAction => ({
  type: LOGIN_SUCCESS,
  payload: {
    name,
    roles,
    meta,
  },
});

export const LOGIN_ERROR = 'LOGIN_ERROR';
export const loginError = (): Action => ({
  type: LOGIN_ERROR,
});

export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const logoutSuccess = (): Action => ({
  type: LOGOUT_SUCCESS,
});

export const SET_IS_DB_PUBLIC = 'SET_IS_DB_PUBLIC';
export const setIsDBPublic = (isDBPublic: boolean): SetIsDBPublicAction => ({
  type: SET_IS_DB_PUBLIC,
  payload: {
    isDBPublic,
  },
});
