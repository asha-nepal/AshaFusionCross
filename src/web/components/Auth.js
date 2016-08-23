/* @flow */

import React, { Component } from 'react';

type Props = {
  loggedIn: boolean,
  login: (username: string, password: string) => void,
  children: ReactElement,
}

export default class extends Component {
  props: Props;

  render() {
    const {
      loggedIn,
      login,
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
                      <input className="input" type="text" ref="username" />
                    </label>
                  </p>
                  <p className="control">
                    <label className="label">
                      Password
                      <input className="input" type="password" ref="password" />
                    </label>
                  </p>
                  <p className="control">
                    <button
                      className="button is-primary"
                      onClick={e => {
                        e.preventDefault();
                        login(this.refs.username.value, this.refs.password.value);
                      }}
                    >Login</button>
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
