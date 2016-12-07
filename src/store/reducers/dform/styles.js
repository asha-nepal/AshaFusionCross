/* @flow */

import initialFormStyles from './initial/styles';

export default function (
  formStyles: Object = initialFormStyles,
  action: Object,
) {
  switch (action.type) {
    default:
      return formStyles;
  }
}
