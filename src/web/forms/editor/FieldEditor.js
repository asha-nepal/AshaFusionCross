/* @flow */

import React from 'react';
import {
  TextInputComponent,
  SelectComponent,
  CheckboxComponent,
  fieldComponentList,
} from '../fields';

import ArrayEditor from './field-prop-editors/ArrayEditor';

const fieldPropEditors = {
  boolean: CheckboxComponent,
  array: ArrayEditor,
};

const avaliableComponentKeys =
  Object.keys(fieldComponentList)
    .filter(key => 'fieldProps' in fieldComponentList[key]);

export default ({
  field,
  onUnfocus,
  onFieldChange,
  onFieldRemove,
}: {
  field: FormField,
  onUnfocus: () => void,
  onFieldChange: (updatedField: FormField) => void,
  onFieldRemove: () => void,
}) => {
  const fieldComponent = fieldComponentList[field.class] || fieldComponentList.textinput;
  const fieldProps = fieldComponent.fieldProps;

  return (
    <div
      className="card"
      style={{
        position: 'absolute',
        zIndex: 1000,
        maxWidth: 'initial',
        width: 300,
      }}
    >
      <div className="card-content">
        <p className="is-clearfix">
          <a
            className="is-pulled-right"
            onClick={e => {
              e.preventDefault();
              e.stopPropagation();
              onUnfocus();
            }}
          ><span className="icon is-small"><i className="fa fa-times-circle" /></span></a>
        </p>

        <SelectComponent
          label="Type"
          options={avaliableComponentKeys.map(key => ({ id: key, label: key }))}
          value={field.class}
          nullable={false}
          onChange={v => onFieldChange({
            ...field,
            class: v,
          })}
        />

        {!fieldComponent.isUnbound &&
          <TextInputComponent
            label="Field"
            value={field.field}
            onChange={v => onFieldChange({
              ...field,
              field: v,
            })}
          />
        }

        <TextInputComponent
          label="Label"
          value={field.label}
          onChange={v => onFieldChange({
            ...field,
            label: v,
          })}
        />

        {fieldProps && fieldProps.map((fieldProp, i) => {
          const editorComponent = fieldPropEditors[fieldProp.type] || TextInputComponent;

          // $FlowFixMe
          return React.createElement(editorComponent, {
            key: i,
            label: fieldProp.name,
            type: fieldProp.type,
            value: field[fieldProp.name],
            onChange: v => onFieldChange({
              ...field,
              [fieldProp.name]: v,
            }),
          });
        })}

        <a
          className="button is-danger"
          onClick={e => {
            e.preventDefault();
            onFieldRemove();
          }}
        >Remove</a>
      </div>
    </div>
  );
};
