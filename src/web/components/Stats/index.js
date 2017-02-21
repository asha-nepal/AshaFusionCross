/* @flow */

import React from 'react';
import ReactDataGrid from 'react-data-grid';
import Header from '../common/Header';
import Content from '../common/Content';
import StatsList from './StatsList';
import CsvExporter from './CsvExporter';

const ArrayFormatter = ({
  value,
}: {
  value: ?Array<string>,
}) => <span>{(value && value.join) ? value.join(', ') : ''}</span>;

export default({
  columns,
  rows,
  stats,
  statsRules,
  load,
}: {
  columns: Array<{ key: string, name: string }>,
  rows: Array<Object>,
  stats: {[key: string]: number | string},
  statsRules: {[key: string]: {name: string}},
  load: () => void,
}) => {
  const _columns = columns.map(column => {
    if (column.key === 'symptoms') {
      return {
        ...column,
        formatter: ArrayFormatter,
      };
    }

    return column;
  });

  return (
    <div>
      <Header
        title="Stats"
      />

      <Content>
        <div className="block">
          <a
            className="button"
            onClick={e => {
              e.preventDefault();
              load();
            }}
          >Load</a>
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
