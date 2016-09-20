/* @flow */

import React, { Component } from 'react';
import { convertToCsv } from '../../utils';
import { downloadBlob } from '../../utils/web';

type Props = {
  fetchRecords: () => void,
  columns: Array<{ field: string }>,
  records: Array<RecordObject>,
};

export default class extends Component {
  componentDidMount() {
    this.props.fetchRecords();
  }

  props: Props;

  render() {
    const {
      columns,
      records,
    } = this.props;

    if (!records) { return null; }

    return (
      <section className="section">
        <div className="container">
          <a
            className="button is-primary"
            onClick={e => {
              e.preventDefault();
              const csv = convertToCsv(records);
              const bom = new Uint8Array([0xEF, 0xBB, 0xBF]);
              const blob = new Blob([bom, csv], { type: 'text/csv' });
              const name = 'output.csv';
              downloadBlob(blob, name);
            }}
          >Download CSV</a>

          <table className="table">
            <thead>
              <tr>
              {columns.map((column, i) =>
                <th key={i}>{column.label || column.field}</th>
              )}
              </tr>
            </thead>
            <tbody>
            {records.map((record, i) =>
              <tr key={i}>
              {columns.map((column, j) =>
                <td key={j}>{record[column.field]}</td>
              )}
              </tr>
            )}
            </tbody>
          </table>
        </div>
      </section>
    );
  }
}
