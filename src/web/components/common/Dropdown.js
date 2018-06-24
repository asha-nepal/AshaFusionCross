/**
 * Copyright 2018 Yuichiro Tsuchiya
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

import FaIcon from './FaIcon';


type Props = {
  hoverable?: boolean,
  up?: boolean,
  right?: boolean,
  title: React$Element<*>,
  items: Array<React$Element<*>>,
}

export default class extends React.Component {
  constructor(props: Props) {
    super(props);

    this.state = {
      open: false,
    };
  }

  state: {
    open: boolean,
  }

  props: Props

  render() {
    const {
      hoverable = false,
      up = false,
      right = false,
      title,
      items = [],
    } = this.props;

    return (
      <div
        className={classNames(
          'dropdown',
          {
            'is-hoverable': hoverable,
            'is-up': up,
            'is-right': right,
            'is-active': !hoverable && this.state.open,
          },
        )}
      >
        <div className="dropdown-trigger">
          <button
            className="button"
            onClick={() => !hoverable && this.setState({ open: !this.state.open })}
          >
            <span>
              {title}
            </span>
            <FaIcon type={up ? 'angle-up' : 'angle-down'} size="small" />
          </button>
        </div>
        <div className="dropdown-menu" role="menu">
          <div className="dropdown-content">
            {items.map((item, i) => (
              <div key={i} className="dropdown-item">
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
