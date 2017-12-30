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
import classNames from 'classnames';
import logo from '../../../../assets/img/logo-white.svg';

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
      <nav className="navbar is-primary">
        <div className="container">
          <div className="navbar-brand">
            <div className="navbar-item">
              <img src={logo} alt="ASHA fusion" />
            </div>
            <div
              className={classNames('navbar-burger', { 'is-active': this.state.isMenuOpen })}
              onClick={e => {
                e.preventDefault();
                this.setState({ isMenuOpen: !this.state.isMenuOpen });
              }}
            >
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>

          <div className={classNames('navbar-menu', { 'is-active': this.state.isMenuOpen })}>
            {isLoggedIn &&
              <div className="navbar-end">
                <div className="navbar-item">{loggedInUser || '(anonymous user)'}</div>
                {isAdmin && <Link className="navbar-item" to="admin">Admin</Link>}
                {logout &&
                  <a
                    className="navbar-item"
                    onClick={e => {
                      e.preventDefault();
                      logout();
                    }}
                  >Log out</a>
                }
              </div>
            }
          </div>
        </div>
      </nav>
    );
  }
}
