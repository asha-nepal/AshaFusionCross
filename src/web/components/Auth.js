/* @flow */

import React, { Component } from 'react';

type Props = {
  isDBPublic: boolean,
  loggedIn: boolean,
  login: (username: string, password: string) => void,
  anonymousLogin: () => void,
  signup: (username: string, password: string) => void,
  children: ReactElement,
}

export default class extends Component {
  props: Props;

  render() {
    const {
      isDBPublic,
      loggedIn,
      login,
      anonymousLogin,
      signup,
      children,
    } = this.props;

    if (loggedIn) return children;

    return (
      <section className="section">
        <div className="container">
          <div className="columns">
            <div className="column is-half-tablet is-offset-one-quarter-tablet">
              <div className="box">
                <h1 className="title">Log in</h1>
                <form>
                  <p className="control">
                    <label className="label">
                      Username
                      <input
                        className="input"
                        type="text"
                        ref="username"
                        autoCorrect="off"
                        autoCapitalize="off"
                      />
                    </label>
                  </p>
                  <p className="control">
                    <label className="label">
                      Password
                      <input className="input" type="password" ref="password" />
                    </label>
                  </p>
                  <nav className="level">
                    <div className="level-left">
                      <div className="level-item">
                        <p className="control">
                          <button
                            className="button is-primary"
                            onClick={e => {
                              e.preventDefault();
                              login(this.refs.username.value, this.refs.password.value);
                            }}
                          >Login</button>
                        </p>
                      </div>
                    </div>
                    {isDBPublic &&
                      <div className="level-left">
                        <div className="level-item">or</div>
                        <div className="level-item">
                          <p className="control">
                            <a
                              className="button"
                              onClick={e => {
                                e.preventDefault();
                                anonymousLogin();
                              }}
                            >Log in as anonymous user</a>
                          </p>
                        </div>
                      </div>
                    }
                  </nav>
                </form>
              </div>
            </div>
          </div>

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
        </div>
      </section>
    );
  }
}
