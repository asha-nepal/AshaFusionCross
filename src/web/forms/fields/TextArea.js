/* @flow */

import React from 'react';
import { Field } from 'react-redux-form';

export const TextArea = ({
  model,
  label,
  style,
  placeholder,
}: TextAreaProps) => (
  <p className="control" style={style}>
    <label className="label">
      {label}
      <Field model={model}>
        <textarea className="textarea" placeholder={placeholder} />
      </Field>
    </label>
  </p>
);
