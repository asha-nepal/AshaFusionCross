/* @flow */

import React, { Component } from 'react';

type Props = {
  fetchRecords: () => void,
  records: Array<RecordObject>,
};

export default class extends Component {
  componentDidMount() {
    this.props.fetchRecords();
  }

  props: Props;

  render() {
    const {
      records,
    } = this.props;

    if (!records) { return null; }

    return (
      <section className="section">
        <div className="container">
          <table className="table">
            <thead>
              <tr>
                <th>Height (cm)</th>
                <th>Weight (kg)</th>
                <th>Created at</th>
              </tr>
            </thead>
            <tbody>
            {records.map(record =>
              <tr key={record._id}>
                <td>{record.height}</td>
                <td>{record.weight}</td>
                <td>{new Date(record.$created_at).toString()}</td>
              </tr>
            )}
            </tbody>
          </table>
        </div>
      </section>
    );
  }
}
