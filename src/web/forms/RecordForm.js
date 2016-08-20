/* @flow */

import React from 'react';
import { connect } from 'react-redux';
import { Form } from 'react-redux-form';
import _get from 'lodash.get';
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
  MultiInput,
} from './fields';

function createChildFields(state, rootModel, fields) {
  return fields.map((field, i) => {
    // Handle "show" prop
    if (field.show === false) {
      return null;
    } else if (typeof field.show === 'string' && !_get(state, `${rootModel}.${field.show}`, true)) {
      return null;
    }

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
              {createChildFields(state, rootModel, field.children)}
            </div>
          </div>
        )
        : (
          <div key={i} className="control is-grouped">
          {createChildFields(state, rootModel, field.children)}
          </div>
        );

      case 'accordion':
        return (
          <Accordion key={i} label={field.label}>
          {createChildFields(state, rootModel, field.children)}
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

      case 'multiinput':
        component = MultiInput;
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

const RecordFormComponent = ({
  state,
  model,
  style,
  onSubmit,
  freeze,
}: {
  state: Object,
  model: string,
  style: Array<Object>,
  onSubmit: (record: RecordObject) => void,
  freeze: boolean,
}) => (
  <Form
    model={model}
    onSubmit={onSubmit}
  >
    {createChildFields(state, model, style)}

    <button type="submit" className="button is-primary" disabled={freeze}>
      Submit
    </button>
  </Form>
);

export default connect(
  state => ({ state })
)(RecordFormComponent);
