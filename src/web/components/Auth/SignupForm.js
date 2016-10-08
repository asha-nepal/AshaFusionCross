/* @flow */

import React from 'react';

export default class extends React.Component {
  props: {
    signup: (username: string, password: string) => void,
  }

  render() {
    const {
      signup,
    } = this.props;

    return (
      <div className="columns">
        <div className="column is-half-tablet is-offset-one-quarter-tablet">
          <div className="box">
            <h1 className="title">Sign up</h1>
            <form>
              <p className="control">
                <label className="label">
                  Username
                  <input
                    className="input"
                    type="text"
                    ref="signup_username"
                    autoCorrect="off"
                    autoCapitalize="off"
                  />
                </label>
              </p>
              <p className="control">
                <label className="label">
                  Password
                  <input className="input" type="password" ref="signup_password" />
                </label>
              </p>
              <p className="control">
                <label className="label">
                  Password (confirm)
                  <input type="password" className="input" ref="signup_password_confirm" />
                </label>
              </p>
              <p className="control">
                <button
                  className="button is-primary"
                  onClick={e => {
                    e.preventDefault();
                    const username = this.refs.signup_username.value;
                    const password = this.refs.signup_password.value;
                    const passwordConfirm = this.refs.signup_password_confirm.value;

                    if (!username) {
                      alert('Please input valid username');  // TODO Validationは然るべき場所に移す
                      return;
                    }

                    if (!password) {
                      alert('Please input valid password');  // TODO Validationは然るべき場所に移す
                      return;
                    }

                    if (password !== passwordConfirm) {
                      alert('Password mismatch');  // TODO Validationは然るべき場所に移す
                      return;
                    }

                    signup(username, password);
                  }}
                >Sign up</button>
              </p>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
