/* @flow */

import React from 'react';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from './utils';

export const TextAreaComponent = ({
  value,
  label,
  style,
  placeholder,
  readonly = false,
  onChange,
}: {
  value: ?string,
  label: ?string,
  style: ?Object,
  placeholder: ?string,
  readonly: boolean,
  onChange: (newValue: string) => void,
}) => (
  <p className="control" style={style}>
    {label && <label className="label">{label}</label>}
    {readonly ? (
      <span className="form-static is-multiline">
        {value && value.split('\n').reduce(
          (a, b, i) => a.concat([b, <br key={i} />]), []
        )}
      </span>
    ) : (
      <textarea
        className="textarea"
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
      />
    )}
  </p>
);

export const TextArea = connect(
  mapStateToProps, mapDispatchToProps
)(TextAreaComponent);
