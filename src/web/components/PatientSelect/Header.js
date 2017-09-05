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

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

type Props = {
  isLoggedIn: boolean,
  loggedInUser: ?string,
  isAdmin: boolean,
  logout?: () => void,
};

export default class extends Component {
  constructor(props: Props) {
    super(props);

    this.state = {
      isMenuOpen: false,
    };
  }

  state: {
    isMenuOpen: boolean,
  };

  props: Props;

  render() {
    const {
      isLoggedIn,
      loggedInUser,
      isAdmin,
      logout,
    } = this.props;

    return (
      <section className="hero is-primary is-bold">
        <div className="hero-head">
          <div className="container">
            <nav className="nav">
              <div className="nav-left">
                <span className="nav-item is-brand title">ASHA fusion</span>
              </div>

              <span
                className="nav-toggle"
                onClick={e => {
                  e.preventDefault();
                  this.setState({ isMenuOpen: !this.state.isMenuOpen });
                }}
              >
                <span></span>
                <span></span>
                <span></span>
              </span>
              {isLoggedIn &&
                <div className={`nav-right nav-menu${this.state.isMenuOpen ? ' is-active' : ''}`}>
                  <p className="nav-item">{loggedInUser || '(anonymous user)'}</p>
                  {isAdmin && <Link className="nav-item" to="admin">Admin</Link>}
                  {logout &&
                    <a
                      className="nav-item"
                      onClick={e => {
                        e.preventDefault();
                        logout();
                      }}
                    >Log out</a>
                  }
                </div>
              }
            </nav>
          </div>
        </div>
      </section>
    );
  }
}
