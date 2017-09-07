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
