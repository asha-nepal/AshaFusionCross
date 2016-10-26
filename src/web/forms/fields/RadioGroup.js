/* @flow */

import React from 'react';

const ReadOnly = ({
  options,
  value,
}: {
  options: Array<{id: string, label: string}>,
  value: ?string,
}) => {
  const selectedOption = value && options.find(option => option.id === value);

  return (
    <div className="form-static">
      {selectedOption ? selectedOption.label : '---'}
    </div>
  );
};

export const RadioGroupComponent = ({
  options,
  label,
  value,
  readonly = false,
  size,
  onChange,
}: {
  options: Array<{id: string, label: string}>,
  label?: ?string,
  value: string,
  readonly?: boolean,
  size?: string,
  onChange?: (newValue: string) => void,
}) => (
  <div className="control">
    {label && <label className="label">{label}</label>}
    {readonly ? (
      <ReadOnly options={options} value={value} />
    ) : (
      <div className="checkgroup is-equiv">
        {options.map(option => {
          const checkedClassName = option.id === value ? ' is-primary' : '';
          const sizeClassName = size ? ` is-${size}` : '';
          return (
            <a
              key={option.id}
              className={`control button${checkedClassName}${sizeClassName}`}
              onClick={e => {
                e.preventDefault();
                if (onChange) {
                  onChange(option.id);
                }
              }}
            >{option.label}</a>
          );
        })}
      </div>
    )}
  </div>
);

import connect from '../../../common/forms/fields/RadioGroup';

export const RadioGroup = connect(RadioGroupComponent);
