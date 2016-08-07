/* @flow */

import React from 'react';
import { Field } from 'react-redux-form';

export const TextInput = ({
  model,
  label,
  style,
  type = 'text',
  prefix,
  suffix,
}: TextFieldProps) => {
  const hasAddons = prefix || suffix;

  return (
    <div className="control">
      <label className="label">
        {label}
        <p className={hasAddons ? 'control has-addons' : 'control'}>
          {prefix &&
            <span className="button is-disabled">
              {prefix}
            </span>
          }
          <Field model={model}>
            <input type={type} className="input" style={style} />
          </Field>
          {suffix &&
            <span className="button is-disabled">
              {suffix}
            </span>
          }
        </p>
      </label>
    </div>
  );
};
