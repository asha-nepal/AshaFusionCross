/* @flow */

import React from 'react';
import ReactDataGrid from 'react-data-grid';
import Header from '../common/Header';
import Content from '../common/Content';
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
  load,
}: {
  columns: Array<{ key: string, name: string }>,
  rows: Array<Object>,
  stats: {[key: string]: number | string},
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
        <a
          className="button"
          onClick={e => {
            e.preventDefault();
            load();
          }}
        >Load</a>
        <ReactDataGrid
          columns={_columns}
          rowGetter={i => rows[i]}
          rowsCount={rows.length}
          minHeight={500}
        />

        <ul>
          {columns.map(column =>
            <li key={column.key}>{column.name}: {stats[column.key]}</li>
          )}
        </ul>

        <CsvExporter
          rows={rows}
          columns={columns}
        />
      </Content>
    </div>
  );
};
