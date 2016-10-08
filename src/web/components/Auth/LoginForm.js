/* @flow */

import React from 'react';

export default class extends React.Component {
  props: {
    login: (username: string, password: string) => void,
    isDBPublic: boolean,
    anonymousLogin: () => void,
  }

  render() {
    const {
      login,
      isDBPublic,
      anonymousLogin,
    } = this.props;

    return (
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
    );
  }
}
