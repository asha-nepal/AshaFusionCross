/**
 * Copyright 2016 Yuichiro Tsuchiya
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

const ReadOnly = ({
  value,
  options,
}: {
  value: ?Array<string>,
  options: Array<{id: string, label: string}>,
}) => (
  <div className="form-static">
    {options.map(option => {
      if (value && value.indexOf(option.id) > -1) {
        return (
          <p key={option.id}>
            <span className="icon">
              <i className="fa fa-check" />
            </span>
            {option.label}
          </p>);
      }

      return null;
    })}
  </div>
);

export const CheckGroupComponent = ({
  label,
  value,
  options,
  readonly = false,
  onChange,
}: {
  label?: ?string,
  value: ?Array<string>,
  options: Array<{id: string, label: string}>,
  readonly?: boolean,
  onChange?: (newValue: Array<string>) => void,
}) => (
  <div className="control">
    {label && <label className="label">{label}</label>}
    {readonly ? (
      <ReadOnly value={value} options={options} />
    ) : (
      <div className="checkgroup">
        {options.map(option => {
          const isChecked = value && value.indexOf(option.id) > -1;
          return (
            <a
              key={option.id}
              className={isChecked ? 'control button is-primary' : 'control button'}
              onClick={e => {
                e.preventDefault();
                if (onChange) {
                  onChange(
                    isChecked
                      ? (value || []).filter(v => v !== option.id)
                      : (value || []).concat(option.id)
                  );
                }
              }}
            >
              <span className="icon is-small">
                <i className={isChecked ? 'fa fa-check-square' : 'fa fa-square-o'} />
              </span>
              <span>{option.label}</span>
            </a>
          );
        })}
      </div>
    )}
  </div>
);

const mapStateToProps = (state, ownProps) => ({
  value: _get(state, ownProps.model),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onChange: (newValue) => dispatch(actions.change(ownProps.model, newValue)),
});

export const CheckGroup = connect(
  mapStateToProps,
  mapDispatchToProps
)(CheckGroupComponent);
