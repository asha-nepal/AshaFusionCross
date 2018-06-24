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

type Props = {
  load: Promise<ReactClass<any>>,
  innerProps: ?Object,
}

export default class extends Component {
  constructor(props: Props) {
    super(props);

    this.state = {
      failed: false,
      component: null,
    };
  }

  state: {
    failed: boolean,
    component: ?ReactClass<any>,
  }

  componentWillMount = () => {
    this.executeLoad(this.props.load);
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.load !== this.props.load) {
      this.executeLoad(nextProps.load);
    }
  }

  props: Props

  executeLoad(load: Promise<ReactClass<any>>) {
    this.setState({
      failed: false,
      component: null,
    });

    load
      .then((c) => {
        this.setState({ component: c.default || c, failed: false });
      })
      .catch(() => {
        this.setState({ component: null, failed: true });
      });
  }

  render() {
    if (this.state.failed) {
      return (
        <div>
          <h1 className="title">
Error occurred
          </h1>
          <p>
Please check the network connection or some other incidents.
          </p>
        </div>
      );
    }
    if (!this.state.component) {
      return (
        <div className="loading-container">
          <div className="loading-content" />
        </div>
      );
    }

    return React.createElement(this.state.component, this.props.innerProps);
  }
}
