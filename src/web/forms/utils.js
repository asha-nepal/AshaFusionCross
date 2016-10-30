/* @flow */

import _get from 'lodash.get';

export function checkVisibility(state: Object, rootPath: ?string, showProp: string|boolean = true) {
  if (showProp === false) {
    return false;
  }

  if (typeof showProp === 'string') {
    const [referPath, containedInArray] = showProp.split(':');
    const absReferPath = rootPath ? `${rootPath}.${referPath}` : referPath;
    const referent = _get(state, absReferPath, false);

    if (!referent) { return false; }

    if (containedInArray) {
      return referent.indexOf(containedInArray) > -1;
    }
  }

  return true;
}
