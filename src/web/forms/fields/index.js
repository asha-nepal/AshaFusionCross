/* @flow */

import React from 'react';
import { actions, Field, Control } from 'react-redux-form';

const RadioGroupComponent = ({
  options,
  value,
  onChange,
}: {
  options: Array<{id: string, label: string}>,
  value: string,
  onChange: (newValue: string) => void,
}) => (
  <div className="tabs is-toggle">
    <ul>
    {options.map(option =>
      <li
        key={option.id}
        className={option.id === value && 'is-active'}
      >
        <a
          href="#"
          onClick={e => {
            e.preventDefault();
            onChange(option.id);
          }}
        >{option.label}</a>
      </li>
    )}
    </ul>
  </div>
);

export const RadioGroup = ({
  model,
  options,
}: {
  model: string,
  options: Array<{id: string, label: string}>
}) => (
  <Control
    model={model}
    component={RadioGroupComponent}
    controlProps={{
      options,
    }}
    mapProps={(p) => ({
      value: p.modelValue,
      onChange: v => p.dispatch(actions.change(model, v)),
    })}
  />
);


export const TextInput = ({
  model,
  label,
}: {
  model: string,
  label: string,
}) => (
  <label className="label">
    {label}
    <Field model={model}>
      <input type="text" className="input" />
    </Field>
  </label>
);


export const TextArea = ({
  model,
  label,
}: {
  model: string,
  label: string,
}) => (
  <label className="label">
    {label}
    <Field model={model}>
      <textarea className="textarea" />
    </Field>
  </label>
);
