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
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

type Props = {
  children?: React$Element<any>,
  value: any,
  onChange: (value: any) => void,
  getPreviousData: () => any,
}

class DittoContainer extends React.Component {
  constructor(props: Props) {
    super(props);

    this.state = {
      hover: false,
    };
  }

  state: {
    hover: boolean,
  }

  props: Props

  render() {
    const {
      children,
      value,
      onChange,
      getPreviousData,
      ...rest
    } = this.props;

    return (
      <div
        {...rest}
        ref="outer"
        style={{
          position: 'relative',
        }}
        onMouseEnter={() => this.setState({ hover: true })}
        onMouseLeave={() => this.setState({ hover: false })}
      >
        <ReactCSSTransitionGroup
          transitionName="field-tooltip"
          transitionEnterTimeout={100}
          transitionLeaveTimeout={100}
        >
          {this.state.hover && getPreviousData
          && (
          <div
            key="tooltip"
            className="field-tooltip"
            style={{
              top: this.refs.outer && this.refs.outer.getBoundingClientRect().height || 0,
              left: 0,
            }}
          >
            <a
              className="button is-primary"
              onClick={(e) => {
                e.preventDefault();

                if (!getPreviousData) return;

                const prev = getPreviousData();
                if (!prev) return;

                if (value && value !== prev) {
                  if (!confirm('This field is already filled. Are you sure to update?')) return;
                }

                onChange(prev);
              }}
            >
Ditto
            </a>
          </div>
          )
        }
        </ReactCSSTransitionGroup>
        {children}
      </div>
    );
  }
}

export default ({
  children,
  value,
  onChange,
  getPreviousData,
  ...rest
}: {
  children?: React$Element<any>,
  value: any,
  onChange: (value: any) => void,
  getPreviousData?: () => any,
}) => (
  getPreviousData
    ? (
      <DittoContainer
        value={value}
        onChange={onChange}
        getPreviousData={getPreviousData}
        {...rest}
      >
        {children}
      </DittoContainer>
    )
    : (
      <div {...rest}>
        {children}
      </div>
    )
);
