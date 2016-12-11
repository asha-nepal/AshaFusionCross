/* @flow */

import Immutable from 'immutable';
import {
  DFORM_STYLE_INSERT,
  DFORM_STYLE_UPDATE,
  DFORM_STYLE_DELETE,
} from '../../../actions';
import initialFormStyles from './initial/styles';
// TODO: lodash & icepick are mixed to use. Immutable.js should be use instead..
import {
  setIn,
  updateIn,
} from 'icepick';
import _get from 'lodash.get';
import _toPath from 'lodash.topath';

export default function (
  formStyles: Map<string, List<Map<string, any>>> = Immutable.fromJS(initialFormStyles),
  action: DformStyleAction,
) {
  switch (action.type) {
    case DFORM_STYLE_INSERT: {
      const {
        group,
        id,
        parentPath,
        index,
        field,
      } = action.payload;

      const formIndex = formStyles[group].findIndex(f => f.id === id);
      if (formIndex === -1) return formStyles;

      const fullParentPathArray = [group, formIndex, 'style', ..._toPath(parentPath)];

      return updateIn(formStyles, fullParentPathArray, (prev) => [
        ...prev.slice(0, index),
        field,
        ...prev.slice(index),
      ]);
    }

    case DFORM_STYLE_UPDATE: {
      const {
        group,
        id,
        parentPath,
        index,
        field,
        merge,
      } = action.payload;

      const formIndex = formStyles[group].findIndex(f => f.id === id);
      if (formIndex === -1) return formStyles;

      const fullPathArray = [group, formIndex, 'style', ..._toPath(parentPath), index];

      const newValue = merge ? { ..._get(formStyles, fullPathArray), ...field } : field;

      return setIn(formStyles, fullPathArray, newValue);
    }

    case DFORM_STYLE_DELETE: {
      const {
        group,
        id,
        parentPath,
        index,
      } = action.payload;

      const formIndex = formStyles[group].findIndex(f => f.id === id);
      if (formIndex === -1) return formStyles;

      const fullParentPathArray = [group, formIndex, 'style', ..._toPath(parentPath)];

      return updateIn(formStyles, fullParentPathArray, (prev) => [
        ...prev.slice(0, index),
        ...prev.slice(index + 1),
      ]);
    }

    default:
      return formStyles;
  }
}
