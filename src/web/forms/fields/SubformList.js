/* @flow */

import React from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import _get from 'lodash.get';
import {
  TextInputComponent,
  CheckboxComponent,
  RadioGroupComponent,
} from '.';

const fieldComponents = {
  textinput: TextInputComponent,
  check: CheckboxComponent,
  radio: RadioGroupComponent,
};

function checkVisibility(state: Object, showProp: ?string|boolean) {
  if (showProp === false) {
    return false;
  }

  if (typeof showProp === 'string') {
    const [referPath, containedInArray] = showProp.split(':');
    const referent = _get(state, referPath, false);

    if (!referent) { return false; }

    if (containedInArray) {
      return referent.indexOf(containedInArray) > -1;
    }
  }

  return true;
}

type FormFieldDefinition = {
  field: string,
  class: string,
  label?: string,
  primary?: boolean,
  show?: boolean | string,
}

const RowComponent = ({
  value,
  fields,
  onChange,
  onRemoveItemRequested,
}: {
  value: Object | string,
  fields: Array<FormFieldDefinition>,
  onChange: (newValue: Object) => void,
  onRemoveItemRequested?: () => void,
}) => {
  let _value = {};
  if (typeof value === 'string') {
    // MultiInputからの移行．primary=trueのfieldに当てはめる
    const primaryField = fields.find(f => f.primary);
    if (primaryField) {
      _value[primaryField.field] = value;
    }
  } else {
    _value = value;
  }

  return (
    <div className="panel-block">
      <div className="columns is-mobile">
        <div className="column">
          <div className="control is-grouped" style={{ flexWrap: 'wrap' }} >
          {fields.map((field, i) => {
            if (!checkVisibility(_value, field.show)) {
              return null;
            }

            const component = fieldComponents[field.class];

            return React.createElement(component, {
              key: i,
              ...field,
              size: 'small',
              value: _value[field.field],
              onChange: (v => {
                const updated = {};
                updated[field.field] = v;

                onChange({
                  ..._value,
                  ...updated,
                });
              }),
            });
          })}
          </div>
        </div>

        {onRemoveItemRequested &&
          <div style={{ position: 'relative' }}>
            <a
              style={{ height: '100%' }}
              className="button is-danger"
              onClick={e => {
                e.preventDefault();
                if (onRemoveItemRequested) onRemoveItemRequested();
              }}
            >
              <i className="fa fa-times" />
            </a>
          </div>
        }
      </div>
    </div>
  );
};

export const SubformListComponent = ({
  label,
  values,
  fields,
  onChange,
  onAddItemRequested,
  onRemoveItemRequested,
}: {
  label?: ?string,
  values: ?Array<Object | string>,
  fields: Array<FormFieldDefinition>,
  onChange: (index: number, newValue: Object) => void,
  onAddItemRequested: (value: Object) => void,
  onRemoveItemRequested: (index: number) => void,
}) => {
  const _values = values || [];

  return (
    <div className="control">
      {label && <label className="label">{label}</label>}
      <div className="panel">
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
