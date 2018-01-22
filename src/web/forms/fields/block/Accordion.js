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
import classNames from 'classnames';
import { BlockBody} from './Block';

type Props = {
  label: ?string,
  widthaligned: boolean,
  layout: ?string,
  children?: React$Element<any>,
};

export class Accordion extends Component {
  constructor(props: Props) {
    super(props);

    this.state = {
      isOpen: false,
    };
  }

  state: {
    isOpen: boolean,
  };

  props: Props;

  render() {
    const {
      label,
      children,
      widthaligned = false,
      layout = null,
    } = this.props;

    return (
      <div className="card is-fullwidth field">
        <a
          className="card-header"
          style={{ cursor: 'pointer' }}
          onClick={e => {
            e.preventDefault();
            this.setState({ isOpen: !this.state.isOpen });
          }}
        >
          <p className="card-header-title">
            {label}
          </p>
          <span className="card-header-icon">
            <i className={this.state.isOpen ? 'fa fa-angle-up' : 'fa fa-angle-down'}></i>
          </span>
        </a>
        <div className="card-content" style={{ display: this.state.isOpen ? null : 'none' }}>
          <BlockBody
            layout={layout}
            widthaligned={widthaligned}
          >{children}</BlockBody>
        </div>
      </div>
    );
  }
}
