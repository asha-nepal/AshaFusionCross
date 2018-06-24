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
  STATS_DATE_SET,
} from 'actions';
import tableRules from './_initial/tableRules.json';
import tableColumns from './_initial/tableColumns.json';
import statsRules from './_initial/statsRules.json';

const initialState = {
  tableRules,
  tableColumns,
  statsRules,
  date: {
    startDate: null,
    endDate: null,
  },
};

export default function (state: Object = initialState, action: StatsAction): Object {
  switch (action.type) {
    case STATS_DATE_SET: {
      return {
        ...state,
        date: action.payload.date,
      };
    }

    default:
      return initialState;
  }
}
