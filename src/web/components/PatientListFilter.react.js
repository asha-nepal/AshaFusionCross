/* @flow */

import React from 'react';
import Popup from 'react-popup';
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
    <Popup />
    <p className="control has-icon is-expanded">
      <input
        type="text"
        className="input withclear"
        value={filter}
        onChange={e => onFilterChange(e.target.value)}
      />
      <span className="clearbuttonwrapper">
        <i
          className="fa fa-times-circle clearbutton"
          onClick={() => onFilterChange('')}
        />
      </span>
      <i className="fa fa-search" />
    </p>
    <i className="fa fa-calendar date-picker-trigger"
       onClick={() => {Popup.alert('Hello!')}}
    />
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
