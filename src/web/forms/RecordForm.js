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

const fieldComponents = {
  textinput: TextInput,
  textunitinput: TextUnitInput,
  textarea: TextArea,
  radio: RadioGroup,
  attachment: Attachment,
  attachmentinput: AttachmentInput,
  attachmentviewer: AttachmentViewer,
  accordion: Accordion,
  check: Checkbox,
  checkgroup: CheckGroup,
  autocalc: AutoCalc,
  guide: GuideTools,
  diagnoses: Diagnoses,
  multiinput: MultiInput,
  block: Block,
};

function createChildFields(state, modelReducer, fieldReducer, fields) {
  if (!fields) { return []; }
  return fields.map((field, i) => {
    // Handle "show" prop
    if (field.show === false) {
      return null;
    } else if (typeof field.show === 'string'
      && !_get(state, `${modelReducer}.${field.show}`, false)) {
      return null;
    }

    const component = fieldComponents[field.class] || TextInput;
    let children = null;

    if (field.class === 'block' || field.class === 'accordion') {
      children = createChildFields(state, modelReducer, fieldReducer, field.children);
    }

    return React.createElement(
      component,
      {
        key: i,
        model: field.field,
        label: field.label,
        modelReducer,
        fieldReducer,
        ...field,
      },
      children
    );
  });
}

const RecordFormComponent = ({
  state,
  modelReducer,
  fieldReducer,
  style,
  onSubmit,
  freeze,
}: {
  state: Object,
  modelReducer: string,
  fieldReducer: string,
  style: Array<Object>,
  onSubmit: (record: RecordObject) => void,
  freeze: boolean,
}) => (
  <Form
    model={modelReducer}
    onSubmit={onSubmit}
  >
    {createChildFields(state, modelReducer, fieldReducer, style)}

    <button type="submit" className="button is-primary" disabled={freeze}>
      Submit
    </button>
  </Form>
);

export default connect(
  state => ({ state })
)(RecordFormComponent);
