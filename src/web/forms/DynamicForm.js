/* @flow */

import React from 'react';
import { connect } from 'react-redux';
import { Form } from 'react-redux-form';
import {
  TextInput,
  fieldComponentList as fieldComponents,
} from './fields';

import {
  dformStyleUpdate,
} from '../../actions';

import {
  checkVisibility,
} from './utils';
import FieldEditor from './editor/FieldEditor';

function makeCreateChildFields(
  state,
  rootModel,
  warnings: Object,
  editing: boolean,
  onEditFocus: (fieldPath: string) => void,
  editFocusOn: ?string,
  onFieldChange: (parentPath: string, index: number, field: FormField) => void,
) {
  return function createChildFields(styles, fieldPath = '') {
    // fieldPath is string rather than array because it's easy to check equality

    if (!styles) { return []; }

    return styles.map((field, i) => {
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

      let fieldEditProps = null;
      if (editing) {
        fieldEditProps = {};

        const focused = childFieldPath === editFocusOn;

        fieldEditProps.focused = focused;
        fieldEditProps.onFocus = () => {
          onEditFocus(childFieldPath);
        };
        if (focused) {
          fieldEditProps.fieldEditor = (
            <FieldEditor
              field={field}
              onFieldChange={updatedField => onFieldChange(fieldPath, i, updatedField)}
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
}

export class DynamicFormComponent extends React.Component {
  constructor(props: Props) {
    super(props);

    this.onEditFocus = this.onEditFocus.bind(this);
    this.onFieldChange = this.onFieldChange.bind(this);

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
      this.state.editing, this.onEditFocus, this.state.editFocusOn, this.onFieldChange
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
  })
)(DynamicFormComponent);
