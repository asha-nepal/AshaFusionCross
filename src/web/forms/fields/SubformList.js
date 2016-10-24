/* @flow */

import React from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import _get from 'lodash.get';
import {
  TextInputComponent,
  CheckboxComponent,
} from '.';

const fieldComponents = {
  textinput: TextInputComponent,
  check: CheckboxComponent,
};

type FormFieldDefinition = {
  field: string,
  class: string,
  label?: string,
}

const RowComponent = ({
  value,
  fields,
  onChange,
  onRemoveItemRequested,
}: {
  value: Object,
  fields: Array<FormFieldDefinition>,
  onChange: (newValue: Object) => void,
  onRemoveItemRequested?: () => void,
}) => (
  <div>
    {fields.map((field, i) => {
      const component = fieldComponents[field.class];

      return React.createElement(component, {
        key: i,
        label: field.label,
        value: value[field.field],
        onChange: (v => {
          const updated = {};
          updated[field.field] = v;

          onChange({
            ...value,
            ...updated,
          });
        }),
      });
    })}

    {onRemoveItemRequested &&
      <a
        className="button is-danger"
        onClick={e => {
          e.preventDefault();
          if (onRemoveItemRequested) onRemoveItemRequested();
        }}
      >
        <i className="fa fa-times" />
      </a>
    }
  </div>
);

export const SubformListComponent = ({
  values,
  fields,
  onChange,
  onAddItemRequested,
  onRemoveItemRequested,
}: {
  label?: ?string,
  values: ?Array<Object>,
  fields: Array<FormFieldDefinition>,
  onChange: (index: number, newValue: Object) => void,
  onAddItemRequested: (value: Object) => void,
  onRemoveItemRequested: (index: number) => void,
}) => {
  const _values = values || [];

  return (
    <div className="control">
    {_values.map((value, i) =>
      <RowComponent
        key={i}
        value={value}
        fields={fields}
        onChange={v => onChange(i, v)}
        onRemoveItemRequested={() => onRemoveItemRequested(i)}
      />
    ).concat(
      <RowComponent
        key={_values.length}
        value={{}}
        fields={fields}
        onChange={v => onAddItemRequested(v)}
      />
    )}
    </div>
  );
};


// TODO: MultiInput のconnectと共通化
const mapStateToProps = (state, ownProps) => ({
  values: _get(state, ownProps.model),
});
const mapDispatchToProps = (dispatch, ownProps) => ({
  onChange: (index, value) => dispatch(actions.change(`${ownProps.model}[${index}]`, value)),
  onAddItemRequested: (value) => dispatch(actions.push(ownProps.model, value)),
  onRemoveItemRequested: (index) => dispatch(actions.remove(ownProps.model, index)),
});

export const SubformList = connect(
  mapStateToProps, mapDispatchToProps
)(SubformListComponent);
