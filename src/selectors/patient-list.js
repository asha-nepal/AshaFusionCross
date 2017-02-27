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
