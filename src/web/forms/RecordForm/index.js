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
} from '../fields';
import WriterNames from './WriterNames';

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

function createChildFields(state, rootModel, fields) {
  if (!fields) { return []; }
  return fields.map((field, i) => {
    // Handle "show" prop
    if (field.show === false) {
      return null;
    } else if (typeof field.show === 'string'
      && !_get(state, `${rootModel}.${field.show}`, false)) {
      return null;
    }

    const component = fieldComponents[field.class] || TextInput;
    let children = null;

    if (field.class === 'block' || field.class === 'accordion') {
      children = createChildFields(state, rootModel, field.children);
    }

    return React.createElement(
      component,
      {
        key: i,
        model: `${rootModel}.${field.field}`,
        label: field.label,
        rootModel,
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
  <div>
    <Form
      model={model}
      onSubmit={onSubmit}
    >
      {createChildFields(state, model, style)}

      <button type="submit" className="button is-primary" disabled={freeze}>
        Submit
      </button>
    </Form>

    <hr />

    <WriterNames model={model} />
  </div>
);

export default connect(
  state => ({ state })
)(RecordFormComponent);
