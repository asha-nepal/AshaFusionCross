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
import AutosuggestInput from './AutosuggestInput';

import EditableFieldWrapper from '../editor/EditableFieldWrapper';
import type { FieldEditPropsType } from '../editor/type';

const alertFaIconClasses = {
  danger: 'warning',
  warning: 'warning',
  success: 'check',
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
  <div className="field">
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

  const sizeClassName = size ? ` is-${size}` : '';

  const useSuggestions = suggestions && suggestions.length > 0;
  const InputComponent = useSuggestions ? AutosuggestInput : 'input';
  const additionalProps = useSuggestions ? { candidates: suggestions } : null;
  const hasValueSetters = valueSetters && valueSetters.map;

  const innerControl = (
    <div className={classNames('field', { 'has-addons': hasAddons })}>
      {prefix &&
        <div className="control">
          <span className={`button is-static${sizeClassName}`}>
            {prefix}
          </span>
        </div>
      }
      <div
        className={classNames(
          'control',
          {
            'is-expanded': !style || !style.width,
            'has-icons-left': alert,
          }
        )}
        data-balloon={alert && alert.label}
        data-balloon-pos="up"
      >
        <InputComponent
          type={type}
          className={classNames(
            'input',
            {
              'is-warning': warning,
              [`is-${size}`]: size,
            }
          )}
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
        {alert
          ?
          <span
            className={classNames(
              'icon is-small is-left',
              { [`has-text-${alert.type}`]: true }
            )}
          >
            <i className={`fa fa-${alertFaIconClasses[alert.type]}`} />
          </span>
          :
          <span />
        }
      </div>
      {suffix &&
        <p className="control">
          <span className={`button is-static${sizeClassName}`}>
            {suffix}
          </span>
        </p>
      }
      {warning && <span className="help is-warning">{warning}</span>}
    </div>
  );

  return (
    <EditableFieldWrapper
      className="field"
      fieldEditProps={fieldEditProps}
    >
      {label && <label className="label">{label}</label>}
      {hasValueSetters ? (
        <div className={classNames('field', { 'is-grouped': hasValueSetters })}>
          {innerControl}
          {hasValueSetters && valueSetters.map((valueSetter, i) => {
            const setValue = valueSetter.value || fieldOptions[valueSetter.optionKey];
            if (setValue == null) { return null; }

            return (
              <div key={i} className="control">
                <a
                  className="button"
                  onClick={e => {
                    e.preventDefault();
                    onChange(String(setValue));
                  }}
                >{valueSetter.label}</a>
              </div>
            );
          })}
        </div>
      ) : innerControl}
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
];

import connect from '../../../common/forms/fields/TextInput';

export const TextInput = connect(TextInputComponent);
