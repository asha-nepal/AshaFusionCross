/* @flow */

import React from 'react';
import { Form } from 'react-redux-form';
import {
  TextInput,
  TextArea,
  RadioGroup,
} from './fields';

export default ({
  model,
  style,
  onSubmit,
  freeze,
}: {
  model: string,
  style: Array<Object>,
  onSubmit: (record: RecordObject) => void,
  freeze: boolean,
}) => (
  <Form
    model={model}
    onSubmit={onSubmit}
  >
    {style.map((field, i) => {
      let component;
      let props = {};

      switch (field.class) {
        case 'textarea':
          component = TextArea;
          break;
        case 'radio':
          component = RadioGroup;
          props = {
            options: field.options,
          };
          break;
        default:
          component = TextInput;
          props = {
            type: field.type || 'text',
          };
          break;
      }

      return React.createElement(
        component,
        {
          key: i,
          model: `${model}.${field.field}`,
          label: field.label,
          ...props,
        }
      );
    })}

    <button type="submit" className="button is-primary" disabled={freeze}>
      Submit
    </button>
  </Form>
);
