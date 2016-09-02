/* @flow */

import React from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import _get from 'lodash.get';

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
        value={value || ''}
        onChange={e => onChange(e.target.value)}
      />
    )}
  </p>
);

const mapStateToProps = (state, ownProps) => ({
  value: _get(state, ownProps.model),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onChange: (newValue) => dispatch(actions.change(ownProps.model, newValue)),
});

export const TextArea = connect(
  mapStateToProps, mapDispatchToProps
)(TextAreaComponent);
