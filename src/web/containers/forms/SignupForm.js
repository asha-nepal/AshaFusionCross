/* @flow */

import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import {
  Form,
  Control,
  actions,
} from 'react-redux-form';

const TextControl = ({
  label,
  form,
  ...props
}: {
  label: string,
  form: Object,
}) => (
  <p className="control">
    <label className="label">
      {label}
      <Control.text
        {...props}
        className={classNames('input', { 'is-danger': !form.valid })}
      />
      {!form.valid &&
        <span className="help is-danger">
          {Object.keys(form.errors).filter(key => form.errors[key]).join(', ')}
        </span>
      }
    </label>
  </p>
);

const SignupForm = ({
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
        <h1 className="title">Sign up</h1>
        <Form
          model="forms.signup"
          validators={{
            '': {
              // Form-level validator
              passwordsMatch: (vals) => vals.password === vals.passwordConfirm,
            },
          }}
          onSubmit={({ username, password }) =>
            form.$form.valid && signup(username, password) && reset()}
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

          <p className="control">
            <button
              className="button is-primary"
              disabled={!form.$form.valid}
              type="submit"
            >Sign up</button>
          </p>
        </Form>
      </div>
    </div>
  </div>
);

export default connect(
  state => ({
    form: state.forms.forms.signup,
  }),
  dispatch => ({
    reset: () => dispatch(actions.reset('forms.signup')),
  })
)(SignupForm);
