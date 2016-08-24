/* @flow */

// for saga
export const REQUEST_LOGIN = 'REQUEST_LOGIN';
export const requestLogin = (username: string, password: string) => ({
  type: REQUEST_LOGIN,
  payload: {
    username,
    password,
  },
});

export const REQUEST_ANONYMOUS_LOGIN = 'REQUEST_ANONYMOUS_LOGIN';
export const requestAnonymousLogin = () => ({
  type: REQUEST_ANONYMOUS_LOGIN,
});

export const REQUEST_LOGOUT = 'REQUEST_LOGOUT';
export const requestLogout = () => ({
  type: REQUEST_LOGOUT,
});

export const REQUEST_SIGNUP = 'REQUEST_SIGNUP';
export const requestSignup = (username: string, password: string) => ({
  type: REQUEST_SIGNUP,
  payload: {
    username,
    password,
  },
});


// for reducers
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const loginSuccess = (name: string, roles: Array<string>) => ({
  type: LOGIN_SUCCESS,
  payload: {
    name,
    roles,
  },
});

export const LOGIN_ERROR = 'LOGIN_ERROR';
export const loginError = () => ({
  type: LOGIN_ERROR,
});

export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS,
});

export const SET_IS_DB_PUBLIC = 'SET_IS_DB_PUBLIC';
export const setIsDBPublic = (isDBPublic: boolean) => ({
  type: SET_IS_DB_PUBLIC,
  payload: {
    isDBPublic,
  },
});
