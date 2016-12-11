/* @flow */

import Immutable from 'immutable';
import {
  DFORM_STYLE_INSERT,
  DFORM_STYLE_UPDATE,
  DFORM_STYLE_DELETE,
} from '../../../actions';
import initialFormStyles from './initial/styles';
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

      const formIndex = formStyles.get(group).findIndex(f => f.get('id') === id);
      if (formIndex === -1) return formStyles;

      const fullParentPathArray = [group, formIndex, 'style', ..._toPath(parentPath)];

      return formStyles.updateIn(
        fullParentPathArray,
        prev => prev.splice(index, 0, Immutable.fromJS(field))
      );
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

      const formIndex = formStyles.get(group).findIndex(f => f.get('id') === id);
      if (formIndex === -1) return formStyles;

      const fullPathArray = [group, formIndex, 'style', ..._toPath(parentPath), index];

      return merge
        ? formStyles.mergeIn(fullPathArray, Immutable.fromJS(field))
        : formStyles.setIn(fullPathArray, Immutable.fromJS(field));
    }

    case DFORM_STYLE_DELETE: {
      const {
        group,
        id,
        parentPath,
        index,
      } = action.payload;

      const formIndex = formStyles.get(group).findIndex(f => f.get('id') === id);
      if (formIndex === -1) return formStyles;

      const fullParentPathArray = [group, formIndex, 'style', ..._toPath(parentPath)];

      return formStyles.updateIn(fullParentPathArray, prev => prev.splice(index, 1));
    }

    default:
      return formStyles;
  }
}
