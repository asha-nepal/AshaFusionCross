/* @flow */

import _get from 'lodash.get';

export function checkVisibility(state: Object, rootPath: ?string, showProp: string|boolean = true) {
  if (showProp === false) {
    return false;
  }

  if (typeof showProp === 'string') {
    const conditions = showProp.split('|');

    return conditions.some(condition => {
      const [referPath, valueToCheck] = condition.split(':');
      const absReferPath = rootPath ? `${rootPath}.${referPath}` : referPath;
      const referent = _get(state, absReferPath, false);
      if (valueToCheck) {
        if (Array.isArray(referent)) {
          return referent.indexOf(valueToCheck) > -1;
        }
        return referent === valueToCheck;
      }
      return !!referent;
    });
  }

  return true;
}
