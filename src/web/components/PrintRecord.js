/* @flow */

import React from 'react';
import ReactDOM from 'react-dom';
import _get from 'lodash.get';

import { convert } from '../forms/fields/TextUnitInput';

const Body = ({
  patient,
  record,
}: {
  patient: PatientObject,
  record: RecordObject,
}) => (
  <div>
    <h1>{_get(patient, 'name')}</h1>
    <table>
      <thead>
        <tr>
          <th>Height</th>
          <th>Weight</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            {convert(_get(record, 'height'), 'cm', 1)} cm
          </td>
          <td>
            {convert(_get(record, 'weight'), 'kg', 1)} kg
          </td>
        </tr>
      </tbody>
    </table>
  </div>
);


export default ({
  patient,
  record,
  className,
}: {
  patient: PatientObject,
  record: RecordObject,
  className: ?string,
}) => (
  <span className={className}>
    <a
      className="icon"
      onClick={e => {
        e.preventDefault();

        const printWindow = window.open('');
        if (printWindow) {
          printWindow.document.write('<div id="root"></div>');
          ReactDOM.render(
            <Body patient={patient} record={record} />,
            printWindow.document.getElementById('root'),
            () => {
              printWindow.focus();
              printWindow.print();
              printWindow.close();
            }
          );
          printWindow.document.close();
        }
      }}
    ><i className="fa fa-print" /></a>
  </span>
);
