/**
 * Copyright 2016-2017 Yuichiro Tsuchiya
 * Copyright 2017 Yuguan Xing
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
