/* @flow */

import React from 'react';
import { Form } from 'react-redux-form';
import {
  TextInput,
  TextUnitInput,
  TextArea,
  RadioGroup,
  Attachment,
  AttachmentInput,
  AttachmentViewer,
  Accordion,
  Checkbox,
  CheckGroup,
  AutoCalc,
  GuideTools,
  Diagnoses,
} from './fields';

function createChildFields(rootModel, fields) {
  return fields.map((field, i) => {
    let component;
    let customProps = {};

    switch (field.class) {
      case 'textarea':
        component = TextArea;
        break;

      case 'radio':
        component = RadioGroup;
        break;

      case 'block':
        return field.label
        ? (
          <div key={i} className="control">
            {field.label && <label className="label">{field.label}</label>}
            <div className="control is-grouped">
              {createChildFields(rootModel, field.children)}
            </div>
          </div>
        )
        : (
          <div key={i} className="control is-grouped">
          {createChildFields(rootModel, field.children)}
          </div>
        );

      case 'accordion':
        return (
          <Accordion key={i} label={field.label}>
          {createChildFields(rootModel, field.children)}
          </Accordion>
        );

      case 'guide':
        return <GuideTools key={i} />;

      case 'attachment':
        component = Attachment;
        customProps = {
          rootModel,
        };
        break;

      case 'attachmentinput':
        component = AttachmentInput;
        customProps = {
          rootModel,
        };
        break;

      case 'attachmentviewer':
        component = AttachmentViewer;
        customProps = {
          rootModel,
        };
        break;

      case 'textunitinput':
        component = TextUnitInput;
        break;

      case 'check':
        component = Checkbox;
        break;

      case 'checkgroup':
        component = CheckGroup;
        break;

      case 'diagnoses':
        component = Diagnoses;
        break;

      case 'autocalc':
        component = AutoCalc;
        customProps = {
          rootModel,
        };
        break;

      case 'textinput':
      default:
        component = TextInput;
        customProps = {
          type: field.type || 'text',
        };
        break;
    }

    return React.createElement(
      component,
      {
        key: i,
        model: `${rootModel}.${field.field}`,
        label: field.label,
        ...customProps,
        ...field,
      }
    );
  });
}

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
    {createChildFields(model, style, 'control')}

    <button type="submit" className="button is-primary" disabled={freeze}>
      Submit
    </button>
  </Form>
);
