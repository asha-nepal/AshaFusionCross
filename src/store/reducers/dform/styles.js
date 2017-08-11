/**
 * Copyright 2016 Yuichiro Tsuchiya
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
