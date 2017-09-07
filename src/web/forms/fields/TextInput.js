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
import AutosuggestInput from './AutosuggestInput';

import EditableFieldWrapper from '../editor/EditableFieldWrapper';
import type { FieldEditPropsType } from '../editor/type';

const alertIcons = {
  danger: <i className="fa fa-warning is-danger" />,
  warning: <i className="fa fa-warning is-warning" />,
  success: <i className="fa fa-check is-success" />,
};

const ReadOnly = ({
  label,
  value,
  prefix,
  suffix,
}: {
  label: ?string,
  value: ?string,
  prefix: ?string,
  suffix: ?string,
}) => (
  <div className="control">
    {label && <label className="label">{label}</label>}
    {value &&
      <span className="form-static">{[prefix, value, suffix].join(' ')}</span>
    }
  </div>
);

export const TextInputComponent = ({
  label,
  value,
  onChange,
  style,
  type = 'text',
  prefix,
  suffix,
  placeholder,
  min,
  max,
  precision,
  alerts,
  warning,
  size,
  required = false,
  readonly = false,
  expanded = false,
  suggestions,
  valueSetters,
  fieldOptions = {},
  fieldEditProps,
}: {
  label: ?string,
  value: ?string,
  onChange: (newValue: string) => void,
  style?: Object,
  type?: string,
  prefix?: string,
  suffix?: string,
  placeholder?: string,
  min?: number,
  max?: number,
  precision?: number,
  alerts?: Array<Object>,
  warning?: string,
  size?: string,
  required?: boolean,
  readonly?: boolean,
  expanded?: boolean,
  suggestions?: Array<string>,
  valueSetters?: Array<{ label: string, optionKey?: string, value?: string | number}>,
  fieldOptions?: Object,
  fieldEditProps?: FieldEditPropsType,
}) => {
  if (readonly) {
    return <ReadOnly label={label} value={value} prefix={prefix} suffix={suffix} />;
  }

  const hasAddons = prefix || suffix;

  let alert = null;
  const overrideStyle = {};
  if (type === 'number' && alerts) {
    const numValue = parseFloat(value);

    alert = alerts.find(al =>
      ((al.range[0] == null || numValue >= al.range[0])
        && (al.range[1] == null || al.range[1] > numValue)));

    if (style && style.width) {
      overrideStyle.width = style.width + 32;
    }
  }

  const warningClassName = warning ? ' is-warning' : '';
  const sizeClassName = size ? ` is-${size}` : '';

  const useSuggestions = suggestions && suggestions.length > 0;
  const InputComponent = useSuggestions ? AutosuggestInput : 'input';
  const additionalProps = useSuggestions ? { candidates: suggestions } : null;

  return (
    <EditableFieldWrapper
      className={expanded ? 'control is-expanded' : 'control'}
      fieldEditProps={fieldEditProps}
    >
      {label && <label className="label">{label}</label>}
      <div className="control is-grouped">
        <div className={hasAddons ? 'control has-addons' : 'control'}>
          {prefix &&
            <span className={`button is-disabled${sizeClassName}`}>
              {prefix}
            </span>
          }
          <span
            className={alert && 'control has-icon'}
            data-balloon={alert && alert.label}
            data-balloon-pos="up"
          >
            <InputComponent
              type={type}
              className={`input${warningClassName}${sizeClassName}`}
              style={{
                ...style,
                ...overrideStyle,
              }}
              placeholder={placeholder}
              value={value || ''}
              min={min}
              max={max}
              step={typeof precision === 'number' && Math.pow(10, -precision)}
              onChange={e => onChange(e.target.value)}
              required={required}
              {...additionalProps}
            />
            {alert ? alertIcons[alert.type] : <span />}
          </span>
          {suffix &&
            <span className={`button is-disabled${sizeClassName}`}>
              {suffix}
            </span>
          }
        </div>
        {valueSetters && valueSetters.map && valueSetters.map((valueSetter, i) => {
          const setValue = valueSetter.value || fieldOptions[valueSetter.optionKey];
          if (setValue == null) { return null; }

          return (
            <a
              key={i}
              className="button"
              onClick={e => {
                e.preventDefault();
                onChange(String(setValue));
              }}
            >{valueSetter.label}</a>
          );
        })}
      </div>
      <span className="help is-warning">{warning}</span>
    </EditableFieldWrapper>
  );
};

TextInputComponent.fieldProps = [
  { name: 'type', type: 'string' },
  { name: 'prefix', type: 'string' },
  { name: 'suffix', type: 'string' },
  { name: 'placeholder', type: 'string' },
  { name: 'min', type: 'number' },
  { name: 'max', type: 'number' },
  { name: 'precision', type: 'number' },
  { name: 'size', type: 'number' },
  { name: 'required', type: 'boolean' },
  { name: 'readonly', type: 'boolean' },
  { name: 'expanded', type: 'boolean' },
];

import connect from '../../../common/forms/fields/TextInput';

export const TextInput = connect(TextInputComponent);
