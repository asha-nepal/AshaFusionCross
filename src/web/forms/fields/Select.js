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

import { ReadOnly } from './RadioGroup';

export const SelectComponent = ({
  value,
  options,
  nullable = true,
  onChange,
  size = '',
  readonly = false,
}: {
  value: string,
  options: Array<{id: string, label: string}>,
  nullable: boolean,
  onChange: (newValue: string) => void,
  size: string,
  readonly?: boolean,
}) => (
  readonly ? (
    <ReadOnly value={value} options={options} />
  ) : (
    <div className="control">
      <div
        className={classNames(
          'select',
          { [`is-${size}`]: size }
        )}
      >
        <select
          value={value || ''}
          onChange={e => onChange(e.target.value || null)}
        >
          {nullable && <option value="" ></option>}
          {options.map((option, i) =>
            <option
              key={i}
              value={option.id}
            >{option.label}</option>
          )}
        </select>
      </div>
    </div>
  )
);

// TODO connectの名前
import connect from '../../../common/forms/fields/RadioGroup';

export const Select = connect(SelectComponent);
