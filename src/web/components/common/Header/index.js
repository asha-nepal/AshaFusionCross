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
import classNames from 'classnames';

type Props = {
  fixed: boolean,
  brand?: React$Element,
  menu?: React$Element,
}


export default class extends React.Component {
  constructor(props: Props) {
    super(props);

    this.state = {
      isMenuOpen: false,
    };
  }

  state: {
    isMenuOpen: boolean,
  };

  render() {
    const {
      fixed = false,
      brand,
      menu,
    } = this.props;

    return (
      <nav
        className={classNames(
          'navbar is-primary',
          { 'is-fixed-top': fixed },
        )}
      >
        <div className="container">
          <div className="navbar-brand">
            {brand}

            {menu
              && (
              <div
                className={classNames('navbar-burger', { 'is-active': this.state.isMenuOpen })}
                onClick={(e) => {
                  e.preventDefault();
                  this.setState({ isMenuOpen: !this.state.isMenuOpen });
                }}
              >
                <span />
                <span />
                <span />
              </div>
              )
            }
          </div>

          {menu
            && (
            <div
              className={classNames(
                'navbar-menu',
                { 'is-active': this.state.isMenuOpen },
              )}
            >
              {menu}
            </div>
            )
          }
        </div>
      </nav>
    );
  }
}
