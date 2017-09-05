/**
 * Copyright 2017 Yuichiro Tsuchiya
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* @flow */

import React from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import _get from 'lodash.get';

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
}: {
  value: ?string,
  label?: ?string,
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
