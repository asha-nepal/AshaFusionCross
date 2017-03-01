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

import { checkVisibility } from './utils';

function makeCreateChildFields(state, rootModel, getPreviousData, fieldOptions, warnings) {
  return function createChildFields(fields) {
    if (!fields) { return []; }
    return fields.map((field, i) => {
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
          fieldOptions: fieldOptions[field.field],
          warning: warnings[field.field],
          rootModel,
          getPreviousData: field.ditto && getPreviousData &&
            (() => getPreviousData && getPreviousData(field.field)),
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
  onSubmit,
  onRemove,
  freeze,
  getPreviousData,
  fieldOptions = {},
  warnings = {},
}: {
  state: Object,
  model: string,
  style: DformStyle,
  onSubmit?: (data: Object) => void,
  onRemove: ?() => void,
  freeze: boolean,
  getPreviousData?: (field: string) => any,
  fieldOptions?: Object,
  warnings?: Object,
}) => {
  const createChildFields = makeCreateChildFields(
    state,
    model,
    getPreviousData,
    fieldOptions,
  warnings);

  return (
    <Form
      model={model}
      onSubmit={onSubmit}
    >
      {/* TODO: toJS() should be removed and handle Immutable object directly */}
      {createChildFields(style.toJS ? style.toJS() : style)}

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
