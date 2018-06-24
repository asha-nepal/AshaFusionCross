/**
 * Copyright 2017 Yuichiro Tsuchiya
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

function checkCondition(state: Object, rootPath: ?string, condition: string): boolean {
  const [referPath, valueToCheck] = condition.split(':');
  const absReferPath = rootPath ? `${rootPath}.${referPath}` : referPath;
  const referent = _get(state, absReferPath, false);
  if (valueToCheck) {
    if (Array.isArray(referent)) {
      return referent.indexOf(valueToCheck) > -1;
    }
    return referent === valueToCheck;
  }

  if (Array.isArray(referent)) {
    return referent.length > 0;
  }

  return !!referent;
}

export function referAndGetBool(
  state: Object,
  rootPath: ?string,
  orgProp: string|boolean,
  defaultValue: boolean=true
) {
  if (typeof orgProp === 'undefined') return defaultValue;
  if (typeof orgProp === 'boolean') return orgProp;

  if (typeof orgProp === 'string') {
    const conditions = orgProp.split('|');

    return conditions.some(condition => {
      let _condition = condition;

      const isNegative = condition.charAt(0) === '!';
      if (isNegative) {
        _condition = condition.slice(1);
      }

      const result = checkCondition(state, rootPath, _condition);

      return isNegative ? !result : result;
    });
  }

  return true;
}
