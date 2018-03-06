/**
 * Copyright 2017 Yuguan Xing
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

import React from 'react';
import TextSearchInput from './TextSearchInput';
import SortControl from './SortControl';
import DatePicker from '../DatePicker';
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
  <div className="columns">
    <div className="column">
      <TextSearchInput
        value={filter}
        onChange={onFilterChange}
      />
    </div>
    <div className="column is-narrow">
      <SortControl
        field={sortBy}
        asc={sortInAsc}
        onFieldChange={setPatientListSortField}
        onOrderChange={setPatientListSortOrder}
      />
    </div>
    <div className="column is-narrow is-low">
      <DatePicker
        date={filterDate}
        onDatesChange={setFilterDate}
      />
    </div>
  </div>
);
