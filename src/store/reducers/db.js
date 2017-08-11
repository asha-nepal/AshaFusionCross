/**
 * Copyright 2016-2017 Yuichiro Tsuchiya
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
