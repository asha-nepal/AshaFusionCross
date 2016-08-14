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
  placeholder,
}: TextFieldProps) => {
  const hasAddons = prefix || suffix;

  return (
    <div className="control">
      {label && <label className="label">{label}</label>}
      <p className={hasAddons ? 'control has-addons' : 'control'}>
        {prefix &&
          <span className="button is-disabled">
            {prefix}
          </span>
        }
        <Field model={model}>
          <input type={type} className="input" style={style} placeholder={placeholder} />
        </Field>
        {suffix &&
          <span className="button is-disabled">
            {suffix}
          </span>
        }
      </p>
    </div>
  );
};
