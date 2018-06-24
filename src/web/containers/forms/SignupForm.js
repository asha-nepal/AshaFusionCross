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
import classNames from 'classnames';
import {
  Form,
  Control,
  actions,
} from 'react-redux-form';

import outerConnect from '../../../connects/forms/SignupForm';

const TextControl = ({
  label,
  form,
  type = 'text',
  ...props
}: {
  label: string,
  type: string,
  form: Object,
}) => (
  <div className="field">
    <label className="label">
      {label}
    </label>
    <div className="control">
      <Control.input
        type={type}
        {...props}
        className={classNames('input', { 'is-danger': !form.valid })}
      />
    </div>
    {!form.valid
      && (
      <p className="help is-danger">
        {Object.keys(form.errors).filter(key => form.errors[key]).join(', ')}
      </p>
      )
    }
  </div>
);

let SignupForm = ({
  form,
  signup,
  reset,
}: {
  form: Object,
  signup: (username: string, password: string) => void,
  reset: () => void,
}) => (
  <div className="columns">
    <div className="column is-half-tablet is-offset-one-quarter-tablet">
      <div className="box">
        <h1 className="title">
Sign up
        </h1>
        <Form
          model="forms.signup"
          validators={{
            '': {
              // Form-level validator
              passwordsMatch: vals => vals.password === vals.passwordConfirm,
            },
          }}
          onSubmit={({ username, password }) => form.$form.valid && signup(username, password) && reset()}
        >
          <TextControl
            label="Username"
            form={form.username}
            model=".username"
            type="text"
            autoCorrect="off"
            autoCapitalize="off"
            required
          />

          <TextControl
            label="Password"
            form={form.password}
            model=".password"
            type="password"
            required
          />

          <TextControl
            label="Password (confirm)"
            form={form.passwordConfirm}
            model=".passwordConfirm"
            type="password"
            required
          />

          <div className="field">
            <p className="control">
              <button
                className="button is-primary"
                disabled={!form.$form.valid}
                type="submit"
              >
Sign up
              </button>
            </p>
          </div>
        </Form>
      </div>
    </div>
  </div>
);

SignupForm = connect(
  state => ({
    form: state.forms.forms.signup,
  }),
  dispatch => ({
    reset: () => dispatch(actions.reset('forms.signup')),
  }),
)(SignupForm);

export default outerConnect(SignupForm);
