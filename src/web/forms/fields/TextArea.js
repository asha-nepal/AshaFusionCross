/* @flow */

import React from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import _get from 'lodash.get';

import EditableFieldWrapper from '../editor/EditableFieldWrapper';
import type { FieldEditPropsType } from '../editor/type';

export const ReadonlyTextArea = ({
  label,
  value,
}: {
  label?: ?string,
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
  fieldEditProps,
}: {
  value: ?string,
  label?: ?string,
  style: ?Object,
  placeholder: ?string,
  readonly: boolean,
  onChange: (newValue: string) => void,
  fieldEditProps: FieldEditPropsType,
}) => (readonly ? (
  <ReadonlyTextArea label={label} value={value} />
) : (
  <EditableFieldWrapper
    className="control" style={style} fieldEditProps={fieldEditProps}
  >
    {label && <label className="label">{label}</label>}
    <textarea
      className="textarea"
      placeholder={placeholder}
      value={value || ''}
      onChange={e => onChange(e.target.value)}
    />
  </EditableFieldWrapper>
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
