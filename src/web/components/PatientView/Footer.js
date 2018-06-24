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
  componentDidMount() {
    if (document.documentElement) {
      document.documentElement.classList.add('has-navbar-fixed-bottom');
    }
  }

  componentWillUnmount() {
    if (document.documentElement) {
      document.documentElement.classList.remove('has-navbar-fixed-bottom');
    }
  }

  props: {
    onSubmit?: () => void,
    freeze: boolean,
  }

  render() {
    const {
      onSubmit,
      freeze,
    } = this.props;

    return (
      <nav className="navbar is-fixed-bottom is-light">
        <div className="container">
          <div className="navbar-brand">
            <div className="navbar-item">
              <button
                className="button is-primary"
                disabled={freeze || !onSubmit}
                onClick={(e) => {
                  e.preventDefault();
                  if (onSubmit) onSubmit();
                }}
              >
Submit
              </button>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}
