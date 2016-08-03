/* @flow */

import React from 'react';
import { Field } from 'react-redux-form';

export const TextArea = ({
  model,
  label,
  style,
}: TextAreaProps) => (
  <p className="control" style={style}>
    <label className="label">
      {label}
      <Field model={model}>
        <textarea className="textarea" />
      </Field>
    </label>
  </p>
);
