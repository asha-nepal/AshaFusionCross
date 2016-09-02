/* @flow */

import React from 'react';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from './utils';

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

const TextInputComponent = ({
  label,
  value,
  errors,
  onChange,
  onBlur,
  style,
  type = 'text',
  prefix,
  suffix,
  placeholder,
  min,
  max,
  precision,
  alerts,
  readonly = false,
}: {
  label: ?string,
  value: ?string,
  errors: ?Array<string>,
  onChange: (newValue: string) => void,
  onBlur: (newValue: string) => void,
  style: ?Object,
  type: string,
  prefix: ?string,
  suffix: ?string,
  placeholder: ?string,
  min: ?number,
  max: ?number,
  precision: ?number,
  alerts: ?Array<Object>,
  readonly: boolean,
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

  return (
    <div className="control">
      {label && <label className="label">{label}</label>}
      <p className={hasAddons ? 'control has-addons' : 'control'}>
        {prefix &&
          <span className="button is-disabled">
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
            className={errors && errors.length > 0 ? 'input is-danger' : 'input'}
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
            onBlur={e => onBlur(e.target.value)}
          />
          {alert ? alertIcons[alert.type] : <span />}
          {errors &&
            errors.map(error =>
              <span key={error} className="help is-danger">{error}</span>
            )
          }
        </span>
        {suffix &&
          <span className="button is-disabled">
            {suffix}
          </span>
        }
      </p>
    </div>
  );
};

export const TextInput = connect(
  mapStateToProps, mapDispatchToProps
)(TextInputComponent);
