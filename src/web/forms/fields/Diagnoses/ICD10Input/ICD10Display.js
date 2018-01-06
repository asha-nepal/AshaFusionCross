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
import React from 'react';
import classNames from 'classnames';
import { getICD10 } from '../../../../../data';


export default ({
  label,
  value,
  onClearRequest,
  size = '',
  readonly,
  width,
}: {
  label?: ?string,
  value: string,
  onClearRequest: ?() => void,
  size: string,
  readonly?: boolean,
  width?: string | number,
}) => {
  const icd10Datum = value && getICD10().find(item => item.code === value);

  return (
    <div className="field" style={{ width }}>
      {label && <label className="label">{label}</label>}
      <div className={readonly ? 'level form-static' : 'level'}>
        <span className="level-left">
          <div className={classNames('content', { [`is-${size}`]: size })}>
            <small style={{ marginRight: '1em' }}>{value || ''}</small>
            {icd10Datum ? icd10Datum.description : ''}
          </div>
        </span>
        {!readonly && onClearRequest &&
          <span className="level-right">
            <a
              className={classNames('button', { [`is-${size}`]: size })}
              onClick={e => {
                e.preventDefault();
                if (onClearRequest) onClearRequest();
              }}
            ><i className="fa fa-times" /></a>
          </span>
        }
      </div>
    </div>
  );
};
