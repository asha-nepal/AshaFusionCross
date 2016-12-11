/* @flow */

import React from 'react';
import { connect } from 'react-redux';
import { Form } from 'react-redux-form';
import {
  TextInput,
  TextUnitInput,
  TextArea,
  RadioGroup,
  Select,
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
  MultiDoubleInput,
  SubformList,
  Block,
} from './fields';

const fieldComponents = {
  textinput: TextInput,
  textunitinput: TextUnitInput,
  textarea: TextArea,
  radio: RadioGroup,
  select: Select,
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
  multidoubleinput: MultiDoubleInput,
  subformlist: SubformList,
  block: Block,
};

import {
  checkVisibility,
  getFieldDefinition,
} from './utils';

function makeCreateChildFields(state, rootModel, fieldDefs, warnings) {
  return function createChildFields(styles) {
    if (!styles) { return []; }

    return styles.map((style, i) => {
      // TODO: toJS() should be removed and handle Immutable object directly
      const field = getFieldDefinition(style.toJS ? style.toJS() : style, fieldDefs);
      if (!field) { return null; }

      // Handle "show" prop
      if (!checkVisibility(state, rootModel, field.show)) {
        return null;
      }

      const component = fieldComponents[field.class] || TextInput;
      let children = null;

      if (field.class === 'block' || field.class === 'accordion') {
        children = createChildFields(field.children);
      }

      return React.createElement(
        component,
        {
          key: i,
          model: `${rootModel}.${field.field}`,
          label: field.label,
          warning: warnings[field.field],
          rootModel,
          ...field,
        },
        children
      );
    });
  };
}

export const DynamicFormComponent = ({
  state,
  model,
  style,
  fieldDefs,
  onSubmit,
  onRemove,
  freeze,
  warnings = {},
}: {
  state: Object,
  model: string,
  style: List<Map<string, any>>,
  fieldDefs?: Object,
  onSubmit?: (data: Object) => void,
  onRemove: ?() => void,
  freeze: boolean,
  warnings?: Object,
}) => {
  const createChildFields = makeCreateChildFields(state, model, fieldDefs, warnings);

  return (
    <Form
      model={model}
      onSubmit={onSubmit}
    >
      {createChildFields(style)}

      {(onSubmit || onRemove) &&
        <div className="level">
          {onSubmit &&
            <p className="level-left">
              <button type="submit" className="button is-primary" disabled={freeze}>
                Submit
              </button>
            </p>
          }
          {onRemove &&
            <p className="level-right">
              <a
                className="button is-danger"
                disabled={freeze}
                onClick={e => {
                  e.preventDefault();
                  if (!freeze && onRemove) { onRemove(); }
                }}
              ><i className="fa fa-times" />Remove</a>
            </p>
          }
        </div>
      }
    </Form>
  );
};

export default connect(
  state => ({ state })
)(DynamicFormComponent);
