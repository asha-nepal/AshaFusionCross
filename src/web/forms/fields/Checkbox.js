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
import classNames from 'classnames';
import _get from 'lodash.get';

export const CheckboxComponent = ({
  label,
  value,
  readonly = false,
  size = '',
  onChange,
}: {
  label: string,
  value: ?boolean,
  readonly?: boolean,
  size: string,
  onChange: (newValue: boolean) => void,
}) => (
  <div className="field">
    {label && <label className="label">{label}</label>}
    {readonly ? (
      <p className="form-static">
        {value ? <span className="icon"><i className="fa fa-check" /></span> : '---'}
      </p>
    ) : (
      <p className="control">
        <a
          className={classNames(
            'button',
            {
              'is-primary': value,
              [`is-${size}`]: size,
            }
          )}
          style={{ width: 32 }}
          onClick={e => {
            e.preventDefault();
            onChange(!value);
          }}
        >
          {value && <i className="fa fa-check" />}
        </a>
      </p>
    )}
  </div>
);

const mapStateToProps = (state, ownProps) => ({
  value: _get(state, ownProps.model, false),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onChange: (newValue) => dispatch(actions.change(ownProps.model, newValue)),
});

export const Checkbox = connect(
  mapStateToProps, mapDispatchToProps
)(CheckboxComponent);
