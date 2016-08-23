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

export const REQUEST_LOGOUT = 'REQUEST_LOGOUT';
export const requestLogout = () => ({
  type: REQUEST_LOGOUT,
});


// for reducers
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const loginSuccess = (response: Object) => ({
  type: LOGIN_SUCCESS,
  payload: {
    response,
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
