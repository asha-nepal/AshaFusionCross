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
  Block,
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
    let children = null;

    switch (field.class) {
      case 'textarea':
        component = TextArea;
        break;

      case 'radio':
        component = RadioGroup;
        break;

      case 'block':
        component = Block;
        children = createChildFields(state, rootModel, field.children);
        break;

      case 'accordion':
        component = Accordion;
        children = createChildFields(state, rootModel, field.children);
        break;

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
      },
      children
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
