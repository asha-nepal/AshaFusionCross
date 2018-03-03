/**
 * Copyright 2017 Yuichiro Tsuchiya
 * Copyright 2017 Yuguan Xing
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
import ReactDataGrid from 'react-data-grid';
import { Link } from 'react-router-dom';
import Header from '../common/Header';
import Content from '../common/Content';
import DatePicker from '../DatePicker';
import StatsList from './StatsList';
import CsvExporter from './CsvExporter';
import type { Moment } from 'moment';

const ArrayFormatter = ({
  value,
}: {
  value: ?Array<string>,
}) => <span>{(value && value.join) ? value.join(', ') : ''}</span>;

const BooleanFormatter = ({
  value,
}: {
  value: ?boolean,
}) => <span>{(value != null) && value.toString()}</span>;


export default({
  columns,
  rows,
  stats,
  statsRules,
  load,
  date,
  setDate,
}: {
  columns: Array<{ key: string, name: string }>,
  rows: Array<Object>,
  stats: {[key: string]: number | string},
  statsRules: {[key: string]: {name: string}},
  load: () => void,
  date: Moment,
  setDate: (date: Moment) => void,
}) => {
  const _columns = columns.map(column => {
    if (column.isArray) {
      return {
        ...column,
        formatter: ArrayFormatter,
      };
    } else if (column.isBoolean) {
      return {
        ...column,
        formatter: BooleanFormatter,
      };
    }

    return column;
  });

  return (
    <div>
      <Header
        brand={[
          <Link
            key="back"
            className="navbar-item"
            to="/"
          >
            <span className="icon"><i className="fa fa-arrow-left" /></span>
          </Link>,
          <span
            key="title"
            className="is-size-3"
          >
            Stats
          </span>,
        ]}
      />

      <Content>
        <div className="level">
          <div className="level-left">
            <a
              className="button is-large"
              onClick={e => {
                e.preventDefault();
                load();
              }}
            >Load</a>
          </div>
          <div className="level-right">
            <DatePicker
              id="stats-filter-date"
              date={date}
              onDatesChange={setDate}
            />
          </div>
        </div>

        <ReactDataGrid
          columns={_columns}
          rowGetter={i => rows[i]}
          rowsCount={rows.length}
          minHeight={500}
        />

        <div className="block is-clearfix">
          <CsvExporter
            rows={rows}
            columns={columns}
            className="is-pulled-right"
          />
        </div>

        <div className="box">
          <StatsList
            stats={stats}
            statsRules={statsRules}
          />
        </div>
      </Content>
    </div>
  );
};
