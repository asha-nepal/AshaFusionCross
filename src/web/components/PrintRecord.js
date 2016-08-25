/* @flow */

import React from 'react';
import ReactDOM from 'react-dom';
import _get from 'lodash.get';
import math from 'mathjs';

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
            {math.unit(_get(record, 'height.value'), _get(record, 'height.unit'))
              .toNumber('cm')}
            cm
          </td>
          <td>
            {math.unit(_get(record, 'weight.value'), _get(record, 'weight.unit'))
              .toNumber('kg')}
            kg
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
