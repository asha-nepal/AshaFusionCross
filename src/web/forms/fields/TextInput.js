/* @flow */

import React from 'react';

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

  return (
    <EditableFieldWrapper
      className={expanded ? 'control is-expanded' : 'control'}
      fieldEditProps={fieldEditProps}
    >
      {label && <label className="label">{label}</label>}
      <p className={hasAddons ? 'control has-addons' : 'control'}>
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
          <input
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
          />
          {alert ? alertIcons[alert.type] : <span />}
        </span>
        {suffix &&
          <span className={`button is-disabled${sizeClassName}`}>
            {suffix}
          </span>
        }
      </p>
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
