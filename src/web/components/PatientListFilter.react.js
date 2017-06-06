/* @flow */

import React from 'react';
import DatePicker from './Stats/DatePicker';

export default ({
  filter,
  sortBy,
  sortInAsc,
  filterDate,
  setPatientListSortField,
  setPatientListSortOrder,
  onFilterChange,
  setFilterTime,
}: {
  filter: string,
  sortBy: string,
  sortInAsc: boolean,
  filterDate: Moment,
  setPatientListSortField: (sortBy: string) => void,
  setPatientListSortOrder: (sortInAsc: boolean) => void,
  onFilterChange: (newFilter: string) => void,
  setFilterTime: (date: Moment) => void,
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
    <DatePicker
      date={filterDate}
      onDatesChange={setFilterTime}
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
