/* @flow */

import React from 'react';
import { Form } from 'react-redux-form';
import {
  TextInput,
  TextArea,
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
    {formStyle.record.normal.map((field, i) => {
      let component;

      switch (field.type) {
        case 'textarea':
          component = TextArea; break;
        default:
          component = TextInput; break;
      }

      return (<p key={i} className="control">
        {React.createElement(component, { model: `${model}.${field.field}`, label: field.label })}
      </p>);
    })}

    <button type="submit" className="button is-primary" disabled={freeze}>
      Submit
    </button>
  </Form>
);
