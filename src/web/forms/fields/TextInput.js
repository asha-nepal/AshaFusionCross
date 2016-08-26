/* @flow */

import React from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import _get from 'lodash.get';

const alertIcons = {
  danger: <i className="fa fa-warning is-danger" />,
  warning: <i className="fa fa-warning is-warning" />,
  success: <i className="fa fa-check is-success" />,
};

const TextInputComponent = ({
  label,
  value,
  onChange,
  style,
  type = 'text',
  prefix,
  suffix,
  placeholder,
  alerts,
}: {
  label: ?string,
  value: ?string,
  onChange: (newValue: string) => void,
  style: ?Object,
  type: string,
  prefix: ?string,
  suffix: ?string,
  placeholder: ?string,
  alerts: ?Array<Object>,
}) => {
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
            className="input"
            style={{
              ...style,
              ...overrideStyle,
            }}
            placeholder={placeholder}
            value={value || ''}
            onChange={e => onChange(e.target.value)}
          />
          {alert ? alertIcons[alert.type] : <span />}
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

const mapStateToProps = (state, ownProps) => ({
  value: _get(state, ownProps.model),
});
const mapDispatchToProps = (dispatch, ownProps) => ({
  onChange: (newValue) => dispatch(actions.change(ownProps.model, newValue)),
});

export const TextInput = connect(
  mapStateToProps, mapDispatchToProps
)(TextInputComponent);
