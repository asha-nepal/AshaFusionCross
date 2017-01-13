/* @flow */

export const getIsLoggedIn = (state: Object): boolean => state.auth.loggedIn;
export const getLoggedInUser = (state: Object): ?string => state.auth.loggedInUser;
export const getIsAdmin = (state: Object): boolean =>
  state.auth.loggedInRoles && state.auth.loggedInRoles.includes('_admin');
