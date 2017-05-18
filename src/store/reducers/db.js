/* @flow */

import {
  DB_SET_INSTANCE,
} from '../../actions';

const getDefaultHost = () => {
  if (process.env.COUCH_HOST) {
    return process.env.COUCH_HOST;
  }

  if (typeof location !== 'undefined' && location.hostname) {
    const host = location.protocol
      ? `${location.protocol}//${location.hostname}`
      : location.hostname;
    return `${host}:5984`;
  }

  return '127.0.0.1:5984';
};

const defaultHost = getDefaultHost();
const defaultPouchConfig: PouchConfig = {
  isLocal: false,
  local: {
    dbname: 'asha-fusion-dev',
    isSynced: false,
  },
  remote: {
    hostname: defaultHost,
    dbname: 'asha-fusion-dev',
  },
};

const initialState: DBState = {
  instance: null,
  config: defaultPouchConfig,
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
