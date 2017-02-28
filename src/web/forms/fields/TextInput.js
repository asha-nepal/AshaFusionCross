/* @flow */

import React from 'react';
import AutosuggestInput from './AutosuggestInput';

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
  valueSetters,
  suggestions,
  fieldOptions = {},
  getPreviousData,
}: {
  label: ?string,
  value: ?string,
  onChange: (newValue: string) => void,
  style: ?Object,
  type: string,
  prefix?: string,
  suffix?: string,
  placeholder: ?string,
  min: ?number,
  max: ?number,
  precision: ?number,
  alerts: ?Array<Object>,
  warning?: string,
  size?: string,
  required: boolean,
  readonly: boolean,
  expanded: boolean,
  valueSetters?: Array<{ label: string, optionKey?: string, value?: string | number}>,
  suggestions?: Array<string>,
  fieldOptions?: Object,
  getPreviousData?: () => string,
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
    <div className={expanded ? 'control is-expanded' : 'control'}>
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
        {getPreviousData &&
          <a
            className="button"
            onClick={e => {
              e.preventDefault();

              if (!getPreviousData) return;  // Flow bug? Duplicated check

              const prev = getPreviousData();
              if (!prev) return;

              if (value && value !== prev) {
                const confirmText = `This field is already filled. Are you sure to update?
(The previous value is ${prev})`;
                if (!confirm(confirmText)) return;
              }

              onChange(prev);
            }}
          >Ditto</a>
        }
      </div>
      <span className="help is-warning">{warning}</span>
    </div>
  );
};


import connect from '../../../common/forms/fields/TextInput';

export const TextInput = connect(TextInputComponent);
