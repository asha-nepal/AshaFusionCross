/* @flow */

import Immutable from 'immutable';
import {
  DFORM_STYLE_FIELD_INSERT,
  DFORM_STYLE_FIELD_UPDATE,
  DFORM_STYLE_FIELD_REMOVE,
  DFORM_STYLE_FIELD_MOVE,
} from '../../../actions';
import initialFormStyles from './initial/styles';
import _toPath from 'lodash.topath';

export default function (
  formStyles: Map<string, List<Map<string, any>>> = Immutable.fromJS(initialFormStyles),
  action: DformStyleAction,
) {
  switch (action.type) {
    case DFORM_STYLE_FIELD_INSERT: {
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

    case DFORM_STYLE_FIELD_UPDATE: {
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

    case DFORM_STYLE_FIELD_REMOVE: {
      const {
        group,
        id,
        parentPath,
        index,
      } = action.payload;

      const formIndex = formStyles.get(group).findIndex(f => f.get('id') === id);
      if (formIndex === -1) return formStyles;

      return formStyles.deleteIn([group, formIndex, 'style', ..._toPath(parentPath), index]);
    }

    case DFORM_STYLE_FIELD_MOVE: {
      const {
        group,
        id,
        fromParentPath,
        fromIndex,
        toParentPath,
        toIndex,
      } = action.payload;

      const formIndex = formStyles.get(group).findIndex(f => f.get('id') === id);
      if (formIndex === -1) return formStyles;

      // If no change occurs
      if (fromParentPath === toParentPath && fromIndex === toIndex) return formStyles;

      // Prepare Paths to use in the manupulation
      const fromPathArray = [..._toPath(fromParentPath), fromIndex];
      const toPathArray = [..._toPath(toParentPath), toIndex];
      const toPathArrayAfterRemoval = toPathArray.map((toSegment, i) => {
        const fromSegment = fromPathArray[i];
        if (isNaN(toSegment) || isNaN(fromSegment)) {  // If either is not numeric
          return toSegment;
        }

        const toSegmentInt = parseInt(toSegment, 10);
        const fromSegmentInt = parseInt(fromSegment, 10);

        return toSegmentInt > fromSegmentInt ? toSegmentInt - 1 : toSegment;
      });

      const fullFromPathArray = [group, formIndex, 'style', ...fromPathArray];
      const fullToParentPathArrayAfterRemoval =
        [group, formIndex, 'style', ...toPathArrayAfterRemoval.slice(0, -1)];
      const toIndexAfterRemoval = toPathArrayAfterRemoval[toPathArrayAfterRemoval.length - 1];

      // Move the field by removing and inserting
      const movingField = formStyles.getIn(fullFromPathArray);

      const removedFormStyles = formStyles.deleteIn(fullFromPathArray);

      return removedFormStyles.updateIn(
        fullToParentPathArrayAfterRemoval,
        prev => prev.insert(toIndexAfterRemoval, movingField)
      );
    }

    default:
      return formStyles;
  }
}
