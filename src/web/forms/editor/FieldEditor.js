/* @flow */

import React from 'react';
import { fieldComponentList } from '../fields';

export default ({
  field,
  onFieldChange,
}: {
  field: FormField,
  onFieldChange: (updatedField: FormField) => void,
}) => (
  <div
    className="card"
    style={{
      position: 'absolute',
      zIndex: 1000,
      maxWidth: 'initial',
      width: 300,
    }}
  >
    <div className="card-content">
      <div className="control">
        <label className="label">
          Label
          <input
            className="input"
            type="text"
            value={field.label}
            onChange={e => onFieldChange({
              ...field,
              label: e.target.value,
            })}
          />
        </label>
      </div>

      <div className="control">
        <label className="label">
          Type
        </label>
        <span className="select">
          <select
            value={field.class}
            onChange={e => onFieldChange({
              ...field,
              class: e.target.value,
            })}
          >
            {Object.keys(fieldComponentList).map(key =>
              <option value={key} key={key}>{key}</option>
            )}
          </select>
        </span>
      </div>
    </div>
  </div>
);
