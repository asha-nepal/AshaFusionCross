/**
 * Copyright 2017 Yuichiro Tsuchiya
 * Copyright 2017 kubo shizuma
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* @flow */

import React from 'react';
import { connect } from 'react-redux';
import { Form } from 'react-redux-form';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import {
  fieldComponentList as fieldComponents,
} from './fields';

import {
  insertDformStyleField,
  moveDformStyleField,
  updateDformStyleField,
  removeDformStyleField,
  dformStyleFormAdd,
} from '../../actions';

import {
  checkVisibility,
} from './utils';
import FieldInsertPanel from './editor/FieldInsertPanel';
import FieldEditor from './editor/FieldEditor';
import FormAdder from './editor/FormAdder';
import type { FieldEditPropsType } from './editor/type';

function makeCreateChildFields(
  state,
  rootModel,
  getPreviousData,
  fieldOptions,
  warnings: Object,
  editing: boolean,
  onEditFocus: (fieldPath: ?string) => void,
  editFocusOn: ?string,
  onFieldInsert: (parentPath: string, index: number, field: FormField) => void,
  onFieldMove: (
    fromParentPath: string, fromIndex: number, toParentPath: string, toIndex: number
  ) => void,
  onFieldChange: (parentPath: string, index: number, field: FormField) => void,
  onFieldRemove: (parentPath: string, index: number) => void,
) {
  return function createChildFields(styles, fieldPath = '') {
    // fieldPath is string rather than array because it's easy to check equality

    const elements = !styles ? [] : styles.map((field, i) => {
      // Handle "show" prop
      if (!checkVisibility(state, rootModel, field.show)) {
        return null;
      }

      const childFieldPath = `${fieldPath}[${i}]`;
      const component = fieldComponents[field.class] || fieldComponents.textinput;
      let children = null;

      if (field.class === 'block' || field.class === 'accordion') {
        // Delegate `layout` prop to children
        let childFields = field.children;
        if (field.layout) {
          childFields = childFields.map(child => Object.assign({}, { layout: field.layout }, child));
        }
        children = createChildFields(childFields, `${childFieldPath}.children`);
      }

      let fieldEditProps: ?FieldEditPropsType = null;
      if (editing) {
        fieldEditProps = {};

        const focused = childFieldPath === editFocusOn;

        fieldEditProps.path = childFieldPath;

        fieldEditProps.focused = focused;
        fieldEditProps.onFocus = () => onEditFocus(childFieldPath);
        if (focused) {
          fieldEditProps.fieldEditor = (
            <FieldEditor
              field={field}
              onUnfocus={() => onEditFocus(null)}
              onFieldChange={updatedField => onFieldChange(fieldPath, i, updatedField)}
              onFieldRemove={() => onFieldRemove(fieldPath, i)}
            />
          );
        }
      }

      return React.createElement(
        component,
        {
          key: i,
          model: field.field ? `${rootModel}.${field.field}` : null,
          label: field.label,
          fieldOptions: fieldOptions[field.field],
          warning: warnings[field.field],
          rootModel,
          fieldEditProps,
          getPreviousData: field.ditto && getPreviousData
            && (() => getPreviousData && getPreviousData(field.field)),
          ...field,
        },
        children,
      );
    })
      .filter(element => element); // Remove null

    // Insert <FieldInsertPanel /> between fields for field editing
    if (editing) {
      return elements.reduce((a, b, i) => a.concat([
        <FieldInsertPanel
          key={`dnd-target-${i}`}
          onFieldInsert={field => onFieldInsert(fieldPath, i, field)}
          onFieldMove={(fromParentPath, fromIndex) => onFieldMove(fromParentPath, fromIndex, fieldPath, i)}
        />,
        b,
      ]), []).concat(
        <FieldInsertPanel
          key={`dnd-target-${elements.length}`}
          onFieldInsert={field => onFieldInsert(fieldPath, elements.length, field)}
          onFieldMove={(fromParentPath, fromIndex) => onFieldMove(fromParentPath, fromIndex, fieldPath, elements.length)}
        />,
      );
    }

    return elements;
  };
}

type Props = {
  state: Object,
  model: string,
  style: DformStyle,
  onSubmit?: (data: Object) => void,
  onRemove: ?() => void,
  freeze: boolean,
  getPreviousData?: (field: string) => any,
  fieldOptions?: Object,
  warnings?: Object,
  formGroup: string,
  formStyleId: string,
  customizable: boolean,
  onFormsSave?: () => void,
  onFieldChange: (
    parentPath: string,
    index: number,
    field: FormField
  ) => void,
  onFieldRemove: (
    parentPath: string,
    index: number
  ) => void,
  onFieldInsert: (
    parentPath: string,
    index: number,
    field: FormField
  ) => void,
  onFieldMove: (
    fromParentPath: string,
    fromIndex: number,
    toParentPath: string,
    toIndex: number
  ) => void,
  onFormAdd: (
    id: string,
    label: string,
  ) => void,
}

export class DynamicFormComponent extends React.Component {
  constructor(props: Props) {
    super(props);

    this.onEditFocus = this.onEditFocus.bind(this);
    this.onFieldInsert = this.onFieldInsert.bind(this);
    this.onFieldMove = this.onFieldMove.bind(this);
    this.onFieldChange = this.onFieldChange.bind(this);
    this.onFieldRemove = this.onFieldRemove.bind(this);
    this.onFormAdd = this.onFormAdd.bind(this);

    this.state = {
      editing: false,
      editFocusOn: null,
    };
  }

  state: {
    editing: boolean,
    editFocusOn: ?string,
  }

  onEditFocus: Function

  onEditFocus(fieldPath: ?string): void {
    this.setState({ editFocusOn: fieldPath });
  }

  onFieldInsert: Function

  onFieldInsert(parentPath: string, index: number, field: FormField) {
    this.props.onFieldInsert(parentPath, index, field);
  }

  onFieldMove: Function

  onFieldMove(fromParentPath: string, fromIndex: number, toParentPath: string, toIndex: number) {
    this.props.onFieldMove(fromParentPath, fromIndex, toParentPath, toIndex);
  }

  onFieldChange: Function

  onFieldChange(parentPath: string, index: number, field: FormField) {
    this.props.onFieldChange(parentPath, index, field);
  }

  onFieldRemove: Function

  onFieldRemove(parentPath: string, index: number) {
    this.props.onFieldRemove(parentPath, index);
  }

  onFormAdd: Function

  onFormAdd(id: string, label: string) {
    this.props.onFormAdd(id, label);
  }

  props: Props

  render() {
    const {
      state,
      model,
      style,
      onSubmit,
      onRemove,
      freeze,
      getPreviousData,
      fieldOptions = {},
      warnings = {},
      customizable = false,
      onFormsSave,
    } = this.props;

    const createChildFields = makeCreateChildFields(
      state, model, getPreviousData, fieldOptions, warnings,
      this.state.editing, this.onEditFocus, this.state.editFocusOn,
      this.onFieldInsert, this.onFieldMove,
      this.onFieldChange, this.onFieldRemove,
    );

    return (
      <Form
        model={model}
        onSubmit={onSubmit}
      >
        {this.state.editing
          && (
          <div className="block is-clearfix">
            <FormAdder
              className="is-pulled-right"
              onFormAdd={this.onFormAdd}
            />
          </div>
          )
        }

        {/* TODO: toJS() should be removed and handle Immutable object directly */}
        {createChildFields(style.toJS ? style.toJS() : style)}

        {(onSubmit || onRemove)
          && (
          <div className="level">
            {onSubmit
              && (
              <p className="level-left">
                <button type="submit" className="button is-primary" disabled={freeze}>
                  Submit
                </button>
              </p>
              )
            }
            {onRemove
              && (
              <p className="level-right">
                <a
                  className="button is-danger"
                  disabled={freeze}
                  onClick={(e) => {
                    e.preventDefault();
                    if (!freeze && onRemove) { onRemove(); }
                  }}
                >
                  <i className="fa fa-times" />
Remove
                </a>
              </p>
              )
            }
          </div>
          )
        }

        {customizable
          && (
          <div className="block is-clearfix">
            {!this.state.editing
              && (
              <a
                className="button is-pulled-right is-small"
                onClick={(e) => {
                  e.preventDefault();
                  this.setState({ editing: true });
                }}
              >
Customize form
              </a>
              )
            }
            {this.state.editing
              && (
              <div className="block is-pulled-right">
                <a
                  className="button is-success"
                  onClick={(e) => {
                    e.preventDefault();
                    this.setState({ editing: false });
                    if (onFormsSave) onFormsSave();
                  }}
                >
Finish customizing
                </a>
                <a
                  className="button is-default"
                  onClick={(e) => {
                    e.preventDefault();
                    this.setState({ editing: false });
                  }}
                >
Cancel
                </a>
              </div>
              )
            }
          </div>
          )
        }
      </Form>
    );
  }
}

export default connect(
  state => ({ state }),
  (dispatch, ownProps) => ({
    onFieldInsert: (parentPath, index, field) => dispatch(
      insertDformStyleField(ownProps.formGroup, ownProps.formStyleId, parentPath, index, field),
    ),
    onFieldMove: (fromParentPath, fromIndex, toParentPath, toIndex) => dispatch(
      moveDformStyleField(
        ownProps.formGroup, ownProps.formStyleId,
        fromParentPath, fromIndex, toParentPath, toIndex,
      ),
    ),
    onFieldChange: (parentPath, index, field) => dispatch(
      updateDformStyleField(ownProps.formGroup, ownProps.formStyleId, parentPath, index, field),
    ),
    onFieldRemove: (parentPath, index) => dispatch(
      removeDformStyleField(ownProps.formGroup, ownProps.formStyleId, parentPath, index),
    ),
    onFormAdd: (id, label) => dispatch(dformStyleFormAdd(ownProps.formGroup, id, label)),
  }),
)(
  DragDropContext(HTML5Backend)(DynamicFormComponent),
);
