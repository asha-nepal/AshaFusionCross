/* @flow */

import React, { Component } from 'react';

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
