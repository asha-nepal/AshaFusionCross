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
