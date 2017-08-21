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

export default class extends Component {
  props: {
    defaultValue: PouchConfig,
    onConnect: (config: PouchConfig) => void,
  }

  render() {
    const {
      defaultValue,
      onConnect,
    } = this.props;

    return (
      <div className="columns">
        <div className="column is-half-tablet is-offset-one-quarter-tablet">
          <div className="box">
            <h1 className="title">Connect</h1>
            <form>
              <p className="control">
                <label className="label">
                  Host
                  <input
                    ref="hostname"
                    type="text"
                    defaultValue={defaultValue.remote.hostname}
                    className="input"
                    autoCapitalize="off"
                  />
                </label>
              </p>
              <p className="control">
                <label className="label">
                  DB name
                  <input
                    ref="dbname"
                    type="text"
                    defaultValue={defaultValue.remote.dbname}
                    className="input"
                    autoCapitalize="off"
                  />
                </label>
              </p>

              <button
                className="button is-primary"
                onClick={e => {
                  e.preventDefault();

                  const config = Object.assign({}, defaultValue, {
                    remote: {
                      hostname: this.refs.hostname.value,
                      dbname: this.refs.dbname.value,
                    },
                  });

                  onConnect(config);
                }}
              >Connect</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
