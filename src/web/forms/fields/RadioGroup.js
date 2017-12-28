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

export const ReadOnly = ({
  options,
  value,
}: {
  options: Array<{id: string, label: string}>,
  value: ?string,
}) => {
  const selectedOption = value && options.find(option => option.id === value);

  return (
    <div className="form-static">
      {selectedOption ? selectedOption.label : '---'}
    </div>
  );
};

export const RadioGroupComponent = ({
  options,
  label,
  value,
  readonly = false,
  size,
  onChange,
}: {
  options: Array<{id: string, label: string}>,
  label?: ?string,
  value: string,
  readonly?: boolean,
  size?: string,
  onChange?: (newValue: string) => void,
}) => (
  <div className="field">
    {label && <label className="label">{label}</label>}
    {readonly ? (
      <ReadOnly options={options} value={value} />
    ) : (
      <div className="buttons is-equiv">
        {options.map(option => {
          const checkedClassName = option.id === value ? ' is-primary' : '';
          const sizeClassName = size ? ` is-${size}` : '';
          return (
            <a
              key={option.id}
              className={`button${checkedClassName}${sizeClassName}`}
              onClick={e => {
                e.preventDefault();
                if (onChange) {
                  onChange(option.id);
                }
              }}
            >{option.label}</a>
          );
        })}
      </div>
    )}
  </div>
);

import connect from '../../../common/forms/fields/RadioGroup';

export const RadioGroup = connect(RadioGroupComponent);
