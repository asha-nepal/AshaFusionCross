/* @flow */

import React from 'react';
import {
  TextInputComponent,
  SelectComponent,
  CheckboxComponent,
  fieldComponentList,
} from '../fields';

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
  const fieldProps = (fieldComponentList[field.class] || fieldComponentList.textinput).fieldProps;

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

        <TextInputComponent
          label="Field"
          value={field.field}
          onChange={v => onFieldChange({
            ...field,
            field: v,
          })}
        />

        <TextInputComponent
          label="Label"
          value={field.label}
          onChange={v => onFieldChange({
            ...field,
            label: v,
          })}
        />

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

        {fieldProps && fieldProps.map((fieldProp, i) => {
          const editorComponent =
            fieldProp.type === 'boolean'
            ? CheckboxComponent : TextInputComponent;

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
