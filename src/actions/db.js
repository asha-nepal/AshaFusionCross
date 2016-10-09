/* @flow */

export const DB_SET_INSTANCE = 'DB_SET_INSTANCE';
export const dbSetInstance = (instance: ?PouchInstance) => ({
  type: DB_SET_INSTANCE,
  payload: {
    instance,
  },
});

export const DB_CONNECT_REQUEST = 'DB_CONNECT_REQUEST';
export const dbConnectRequest = (config: PouchConfig): DBConnectRequestAction => ({
  type: DB_CONNECT_REQUEST,
  payload: {
    config,
  },
});

export const DB_DISCONNECT_REQUEST = 'DB_DISCONNECT_REQUEST';
export const dbDisconnectRequest: DBDisconnectRequestAction = () => ({
  type: DB_DISCONNECT_REQUEST,
});
