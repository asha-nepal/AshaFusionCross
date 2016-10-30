/* @flow */

import React from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import _get from 'lodash.get';
import Row from './Row';
import Readonly from './Readonly';

export const ReadonlySubformList = Readonly;

export type FormFieldDefinition = {
  field: string,
  class: string,
  label?: string,
  primary?: boolean,
  show?: boolean | string,
  hide?: string,
}

export const SubformListComponent = ({
  label,
  values,
  fields,
  onChange,
  onAddItemRequested,
  onRemoveItemRequested,
  readonly,
}: {
  label?: ?string,
  values: ?Array<Object | string>,
  fields: Array<FormFieldDefinition>,
  onChange: (index: number, newValue: Object) => void,
  onAddItemRequested: (value: Object) => void,
  onRemoveItemRequested: (index: number) => void,
  readonly?: boolean,
}) => {
  if (readonly) {
    return (
      <ReadonlySubformList
        label={label}
        values={values}
        fields={fields}
      />
    );
  }

  const _values = values || [];

  return (
    <div className="control">
      {label && <label className="label">{label}</label>}
      <div className="panel">
      {_values.map((value, i) =>
        <Row
          key={i}
          value={value}
          fields={fields}
          onChange={v => onChange(i, v)}
          onRemoveItemRequested={() => onRemoveItemRequested(i)}
        />
      ).concat(
        <Row
          key={_values.length}
          value={{}}
          fields={fields}
          onChange={v => onAddItemRequested(v)}
        />
      )}
      </div>
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
