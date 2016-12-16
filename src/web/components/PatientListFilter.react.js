/* @flow */

import React from 'react';
export default ({
  filter,
  sortBy,
  sortInAsc,
  setPatientListSortField,
  setPatientListSortOrder,
  onFilterChange,
}: {
  filter: string,
  sortBy: string,
  sortInAsc: boolean,
  setPatientListSortField: (sortBy: string) => void,
  setPatientListSortOrder: (sortInAsc: boolean) => void,
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
    <button onClick={() => onFilterChange('')}>Clear</button>
    <span className="form-static">Sort:</span>
    <p className="control">
      <span className="select">
        <select
          value={sortBy}
          onChange={e => setPatientListSortField(e.target.value)}
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
          setPatientListSortOrder(!sortInAsc);
        }}
      >
        <span className="icon is-small" style={{ verticalAlign: 'middle' }}>
          <i className={`fa fa-sort-${sortInAsc ? 'asc' : 'desc'}`} />
        </span>
      </a>
    </p>
  </div>
);
