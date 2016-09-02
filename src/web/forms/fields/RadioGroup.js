/* @flow */

import React from 'react';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from './utils';

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

const RadioGroupComponent = ({
  options,
  label,
  value,
  readonly,
  onChange,
}: {
  options: Array<{id: string, label: string}>,
  label: string,
  value: string,
  readonly: boolean,
  onChange: (newValue: string) => void,
}) => (
  <div className="control">
    {label && <label className="label">{label}</label>}
    {readonly ? (
      <ReadOnly options={options} value={value} />
    ) : (
      <div className="checkgroup is-equiv">
        {options.map(option =>
          <a
            key={option.id}
            className={option.id === value ? 'control button is-primary' : 'control button'}
            style={{ flexBasis: 1 }}
            onClick={e => {
              e.preventDefault();
              onChange(option.id);
            }}
          >{option.label}</a>
        )}
      </div>
    )}
  </div>
);

export const RadioGroup = connect(
  mapStateToProps, mapDispatchToProps
)(RadioGroupComponent);
