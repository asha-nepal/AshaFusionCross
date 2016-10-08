/* @flow */

import React from 'react';
import { Field } from 'react-redux-form';

export default ({
  onConnect,
}: {
  onConnect: () => void,
}) => (
  <div className="columns">
    <div className="column is-half-tablet is-offset-one-quarter-tablet">
      <div className="box">
        <h1 className="title">Connect</h1>
        <form>
          <Field model="pouchConfig.remote.hostname" className="control">
            <label className="label">
              Host
              <input
                type="text"
                className="input"
                autoCapitalize="off"
              />
            </label>
          </Field>
          <Field
            model="pouchConfig.remote.dbname"
            className="control"
          >
            <label className="label">
              DB name
              <input
                type="text"
                className="input"
                autoCapitalize="off"
              />
            </label>
          </Field>
          <button
            className="button is-primary"
            onClick={e => {
              e.preventDefault();
              onConnect();
            }}
          >Connect</button>
        </form>
      </div>
    </div>
  </div>
);
