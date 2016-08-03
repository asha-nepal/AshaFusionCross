/* @flow */

import React from 'react';
import { Field } from 'react-redux-form';

export const TextInput = ({
  model,
  label,
  style,
  type = 'text',
}: TextFieldProps) => (
  <p className="control" style={style}>
    <label className="label">
      {label}
    </label>
    <Field model={model}>
      <input type={type} className="input" />
    </Field>
  </p>
);
