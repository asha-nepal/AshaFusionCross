/* @flow */

import _get from 'lodash.get';

export function checkVisibility(state: Object, rootPath: ?string, showProp: string|boolean = true) {
  if (showProp === false) {
    return false;
  }

  if (typeof showProp === 'string') {
    const conditions = showProp.split('|');

    return conditions.some(condition => {
      const [referPath, containedInArray] = condition.split(':');
      const absReferPath = rootPath ? `${rootPath}.${referPath}` : referPath;
      const referent = _get(state, absReferPath, false);

      if (containedInArray && Array.isArray(referent)) {
        return referent.indexOf(containedInArray) > -1;
      }

      return !!referent;
    });
  }

  return true;
}

export function getFieldDefinition(
  style: string | Object,
  defaultStyles: ?{[key: string]: FormField}
): ?FormField {
  if (!defaultStyles) {
    if (typeof style === 'string') { return null; }
    return style;
  }

  if (typeof style === 'object') {
    const defaultStyle = defaultStyles[style.field];
    if (defaultStyle) {
      return {
        ...defaultStyle,
        ...style,
      };
    }

    return style;
  } else if (typeof style === 'string') {
    return defaultStyles[style];
  }

  return null;
}
