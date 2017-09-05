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

import {
  POUCH_DOCS_FETCH_SUCCESS,
} from 'actions';


export const generatePouchDocsReducer = (name: string) =>
  (
    state: Array<PouchDocType> = [],
    action: {
      type: string,
      payload: {
        name: string,
        data: Array<PouchDocType>,
      }
    }
  ): Array<PouchDocType> => {
    const {
      type,
      payload,
    } = action;

    if (!payload || payload.name !== name) return state;

    switch (type) {
      case POUCH_DOCS_FETCH_SUCCESS:
        return payload.data;

      default:
        return state;
    }
  };
