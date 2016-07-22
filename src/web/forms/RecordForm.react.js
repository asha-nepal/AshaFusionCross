/* @flow */

import React from 'react';
import { Field, Form } from 'react-redux-form';

export default ({
  model,
  onSubmit,
  freeze,
}: {
  model: string,
  onSubmit: (record: RecordObject) => void,
  freeze: boolean,
}) => (
  <Form
    model={model}
    onSubmit={onSubmit}
  >
    <p className="control">
      <label className="label">
        Height
        <Field model={`${model}.height`}>
          <input type="text" className="input" />
        </Field>
      </label>
    </p>

    <p className="control">
      <label className="label">
        Weight
        <Field model={`${model}.weight`}>
          <input type="text" className="input" />
        </Field>
      </label>
    </p>

    <button type="submit" className="button is-primary" disabled={freeze}>
      Submit
    </button>
  </Form>
);
