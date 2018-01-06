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
              <div className="field">
                <label className="label">
                  Username
                </label>
                <p className="control">
                  <input
                    className="input"
                    type="text"
                    ref="username"
                    autoCorrect="off"
                    autoCapitalize="off"
                  />
                </p>
              </div>
              <div className="field">
                <label className="label">
                  Password
                </label>
                <p className="control">
                  <input className="input" type="password" ref="password" />
                </p>
              </div>
              <nav className="level">
                <div className="level-left">
                  <div className="level-item">
                    <div className="field">
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
                </div>
                {isDBPublic &&
                  <div className="level-left">
                    <div className="level-item">or</div>
                    <div className="level-item">
                      <div className="field">
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
