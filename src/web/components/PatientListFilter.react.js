/* @flow */

import React from 'react';
export default ({
  filter,
  sortInAsc,
  setPatientListOrder,
  onFilterChange,
}: {
  filter: string,
  sortInAsc: boolean,
  setPatientListOrder: (sortInAsc: boolean) => void,
  onFilterChange: (newFilter: string) => void,
}) => (
  <div className="control is-grouped">
    <p className="control has-icon is-expanded">
      <input
        type="text"
        className="input"
        value={filter}
        onChange={e => onFilterChange(e.target.value)}
      />
      <i className="fa fa-search" />
    </p>
    <p className="control form-static">
      Sort:
      <a
        onClick={e => {
          e.preventDefault();
          setPatientListOrder(!sortInAsc);
        }}
      >
        <span className="icon is-small" style={{ verticalAlign: 'middle' }}>
          <i className={`fa fa-sort-${sortInAsc ? 'asc' : 'desc'}`} />
        </span>
      </a>
    </p>
  </div>
);
