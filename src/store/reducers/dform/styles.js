/* @flow */

import Immutable from 'immutable';
import initialFormStyles from './initial/styles';

export default function (
  formStyles: Map<string, List<Map<string, any>>> = Immutable.fromJS(initialFormStyles),
  action: Object,
) {
  switch (action.type) {
    default:
      return formStyles;
  }
}
