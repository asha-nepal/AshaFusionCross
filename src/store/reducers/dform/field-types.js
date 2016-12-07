/* @flow */

import initialState from './initial/field-types';

export default function (
  fieldTypes: Object = initialState,
  action: Object
) {
  switch (action.type) {
    default:
      return fieldTypes;
  }
}
