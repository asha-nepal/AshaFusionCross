/**
 * Copyright 2017 Yuichiro Tsuchiya
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* @flow */

import Immutable from 'immutable';
import {
  DFORM_STYLE_FIELD_INSERT,
  DFORM_STYLE_FIELD_UPDATE,
  DFORM_STYLE_FIELD_REMOVE,
  DFORM_STYLE_FIELD_MOVE,
  DFORM_STYLE_FORM_ADD,
  DFORM_STYLE_FORM_SET,
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

      const fieldObj = Immutable.fromJS(field);

      return formStyles.updateIn(
        fullParentPathArray,
        prev => (prev ? prev.splice(index, 0, fieldObj) : Immutable.List([fieldObj]))
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

    case DFORM_STYLE_FORM_ADD: {
      const {
        group,
        id,
        label,
      } = action.payload;

      if (formStyles.get(group).some(form => form.get('id') === id)) {
        return formStyles;
      }

      const newForm = {
        id,
        label,
        style: [],
      };

      return formStyles.update(group, prev => prev.push(Immutable.fromJS(newForm)));
    }

    case DFORM_STYLE_FORM_SET: {
      const {
        group,
        id,
        rev,
        label,
        style,
      } = action.payload;

      const formIndex = formStyles.get(group, []).findIndex(f => f.get('id') === id);

      const newForm: { id: string, rev?: string, label: string, style: DformStyle } = {
        id,
        label,
        style,
      };

      if (rev) {
        newForm.rev = rev;
      }

      return formIndex > -1
        ? formStyles.setIn([group, formIndex], Immutable.fromJS(newForm))
        : formStyles.update(group, Immutable.List(), prev => prev.push(Immutable.fromJS(newForm)));
    }

    default:
      return formStyles;
  }
}
