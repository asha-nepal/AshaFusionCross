/* @flow */
import React from 'react';

export default ({
  field,
  asc,
  onFieldChange,
  onOrderChange,
}: {
  field: string,
  asc: boolean,
  onFieldChange: (field: string) => void,
  onOrderChange: (asc: boolean) => void,
}) => (
  <div className="control is-grouped">
    <span className="form-static">Sort:</span>
    <p className="control">
      <span className="select">
        <select
          value={field}
          onChange={e => onFieldChange(e.target.value)}
        >
          <option value="name">Name</option>
          <option value="number">No.</option>
        </select>
      </span>
    </p>
    <p className="form-static">
      <a
        onClick={e => {
          e.preventDefault();
          onOrderChange(!asc);
        }}
      >
        <span className="icon is-small" style={{ verticalAlign: 'middle' }}>
          <i className={`fa fa-sort-${asc ? 'asc' : 'desc'}`} />
        </span>
      </a>
    </p>
  </div>
);
