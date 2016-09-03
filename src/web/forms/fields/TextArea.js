/* @flow */

import React from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import _get from 'lodash.get';

export const ReadonlyTextArea = ({
  label,
  value,
}: {
  label: ?string,
  value: ?string,
}) => (
  <p className="control">
    {label && <label className="label">{label}</label>}
    <span className="form-static is-multiline">
      {value && value.split('\n').reduce(
        (a, b, i) => a.concat([b, <br key={i} />]), []
      )}
    </span>
  </p>
);

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
}) => (readonly ? (
  <ReadonlyTextArea label={label} value={value} />
) : (
  <p className="control" style={style}>
    {label && <label className="label">{label}</label>}
    <textarea
      className="textarea"
      placeholder={placeholder}
      value={value || ''}
      onChange={e => onChange(e.target.value)}
    />
  </p>
));

const mapStateToProps = (state, ownProps) => ({
  value: _get(state, ownProps.model),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onChange: (newValue) => dispatch(actions.change(ownProps.model, newValue)),
});

export const TextArea = connect(
  mapStateToProps, mapDispatchToProps
)(TextAreaComponent);
