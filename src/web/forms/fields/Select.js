/* @flow */

import React from 'react';

import { ReadOnly } from './RadioGroup';

export const SelectComponent = ({
  label,
  value,
  options,
  nullable = true,
  onChange,
  size,
  readonly = false,
}: {
  label?: ?string,
  value: string,
  options: Array<{id: string, label: string}>,
  nullable: boolean,
  onChange: (newValue: string) => void,
  size?: string,
  readonly?: boolean,
}) => {
  const sizeClassName = size ? ` is-${size}` : '';

  return (
    <div className="control">
      {label && <label className="label">{label}</label>}
      {readonly ? (
        <ReadOnly value={value} options={options} />
      ) : (
        <span className={`select${sizeClassName}`}>
          <select
            value={value || ''}
            onChange={e => onChange(e.target.value || null)}
          >
            {nullable && <option value="" ></option>}
            {options.map((option, i) =>
              <option
                key={i}
                value={option.id}
              >{option.label}</option>
            )}
          </select>
        </span>
      )}
    </div>
  );
};

// TODO connectの名前
import connect from '../../../common/forms/fields/RadioGroup';

export const Select = connect(SelectComponent);
