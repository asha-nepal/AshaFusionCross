/* @flow */

import React from 'react';
import ReactDataGrid from 'react-data-grid';
import Header from './common/Header';
import Content from './common/Content';

export default({
  columns,
  rows,
}: {
  columns: Array<{ key: string, name: string }>,
  rows: Array<Object>,
}) => (
  <div>
    <Header
      title="Stats"
    />

    <Content>
      <ReactDataGrid
        columns={columns}
        rowGetter={i => rows[i]}
        rowsCount={rows.length}
        minHeight={500}
      />
    </Content>
  </div>
);
