/* @flow */

import React from 'react';
import DatePicker from './DatePicker';
import type { Moment } from 'moment';

export default ({
  filter,
  sortBy,
  sortInAsc,
  filterDate,
  setPatientListSortField,
  setPatientListSortOrder,
  onFilterChange,
  setFilterDate,
}: {
  filter: string,
  sortBy: string,
  sortInAsc: boolean,
  filterDate: {startDate: Moment, endDate: Moment},
  setPatientListSortField: (sortBy: string) => void,
  setPatientListSortOrder: (sortInAsc: boolean) => void,
  onFilterChange: (newFilter: string) => void,
  setFilterDate: (date: {startDate: Moment, endDate: Moment}) => void,
}) => (
  <div className="control is-grouped">
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
    <div>
      <DatePicker
        date={filterDate}
        onDatesChange={setFilterDate}
      />
    </div>
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
