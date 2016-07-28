/* @flow */

import React from 'react';
import { Form } from 'react-redux-form';
import {
  TextInput,
} from './fields';
import formStyle from '../../form-style';

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
    {formStyle.record.normal.map((field, i) =>
      <TextInput
        key={i}
        model={`${model}.${field.field}`}
        label={field.label}
      />
    )}

    <button type="submit" className="button is-primary" disabled={freeze}>
      Submit
    </button>
  </Form>
);
