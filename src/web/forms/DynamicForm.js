/* @flow */

import React from 'react';
import { connect } from 'react-redux';
import { Form } from 'react-redux-form';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import {
  TextInput,
  fieldComponentList as fieldComponents,
} from './fields';

import {
  dformStyleUpdate,
  dformStyleDelete,
} from '../../actions';

import {
  checkVisibility,
} from './utils';
import FieldDnDTarget from './editor/FieldDnDTarget';
import FieldEditor from './editor/FieldEditor';
import type { FieldEditPropsType } from './editor/type';

function makeCreateChildFields(
  state,
  rootModel,
  warnings: Object,
  editing: boolean,
  onEditFocus: (fieldPath: string) => void,
  editFocusOn: ?string,
  onFieldChange: (parentPath: string, index: number, field: FormField) => void,
  onFieldRemove: (parentPath: string, index: number) => void,
) {
  return function createChildFields(styles, fieldPath = '') {
    // fieldPath is string rather than array because it's easy to check equality

    if (!styles) { return []; }

    const elements = styles.map((field, i) => {
      // Handle "show" prop
      if (!checkVisibility(state, rootModel, field.show)) {
        return null;
      }

      const childFieldPath = `${fieldPath}[${i}]`;
      const component = fieldComponents[field.class] || TextInput;
      let children = null;

      if (field.class === 'block' || field.class === 'accordion') {
        children = createChildFields(field.children, `${childFieldPath}.children`);
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
          model: `${rootModel}.${field.field}`,
          label: field.label,
          warning: warnings[field.field],
          rootModel,
          fieldEditProps,
          ...field,
        },
        children
      );
    });

    // Add DnD targets for field editing
    if (editing) {
      return elements.reduce((a, b, i) => a.concat([
        <FieldDnDTarget
          key={`dnd-target-${i}`}
          path={`${fieldPath}[${i}]`}
        />,
        b,
      ]), []).concat(
        <FieldDnDTarget
          key={`dnd-target-${elements.length}`}
          path={`${fieldPath}[${elements.length}]`}
        />
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
  warnings: Object,
  onFieldChange: (
    group: string,
    id: string,
    parentPath: string,
    index: number,
    field: FormField
  ) => void,
  onFieldRemove: (
    group: string,
    id: string,
    parentPath: string,
    index: number
  ) => void,
}

export class DynamicFormComponent extends React.Component {
  constructor(props: Props) {
    super(props);

    this.onEditFocus = this.onEditFocus.bind(this);
    this.onFieldChange = this.onFieldChange.bind(this);
    this.onFieldRemove = this.onFieldRemove.bind(this);

    this.state = {
      editing: true,
      editFocusOn: null,
    };
  }

  state: {
    editing: boolean,
    editFocusOn: ?string,
  }

  onEditFocus: Function
  onEditFocus(fieldPath: string): void {
    this.setState({ editFocusOn: fieldPath });
  }

  onFieldChange: Function
  onFieldChange(parentPath: string, index: number, field: FormField) {
    this.props.onFieldChange('record', 'reception', parentPath, index, field);
  }

  onFieldRemove: Function
  onFieldRemove(parentPath: string, index: number) {
    this.props.onFieldRemove('record', 'reception', parentPath, index);
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
      warnings = {},
    } = this.props;

    const createChildFields = makeCreateChildFields(
      state, model, warnings,
      this.state.editing, this.onEditFocus, this.state.editFocusOn,
      this.onFieldChange, this.onFieldRemove
    );

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
  }
}

export default connect(
  state => ({ state }),
  dispatch => ({
    onFieldChange: (group, id, parentPath, index, field) =>
      dispatch(dformStyleUpdate(group, id, parentPath, index, field)),
    onFieldRemove: (group, id, parentPath, index) =>
      dispatch(dformStyleDelete(group, id, parentPath, index)),
  })
)(
  DragDropContext(HTML5Backend)(DynamicFormComponent)
);
