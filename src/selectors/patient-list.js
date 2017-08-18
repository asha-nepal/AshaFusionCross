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

import _get from 'lodash.get';

import {
  getPatientList,
} from './index';

export const getPatientMax = (state: Object, path: string) => {
  const patientList = getPatientList(state);

  const targetValues = patientList
    .map(patient => {
      const value = _get(patient, path, 0);

      if (typeof value === 'string') {
        const _value = parseInt(value, 10);
        return isNaN(_value) ? 0 : _value;
      }

      if (typeof value !== 'number') return 0;

      return value;
    });

  return targetValues.reduce((a, b) => (a > b ? a : b), 0);
};
