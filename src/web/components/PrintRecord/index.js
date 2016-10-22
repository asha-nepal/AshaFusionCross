/* @flow */

import React from 'react';
import ReactDOM from 'react-dom';

import PrintPage from './PrintPage';


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

        const printWindow = window.open('/print.html');
        if (printWindow) {
          printWindow.onload = () => {
            ReactDOM.render(
              <PrintPage patient={patient} record={record} />,
              printWindow.document.getElementById('root'),
              () => {
                printWindow.focus();
                printWindow.print();
//                printWindow.close();
              }
            );
          };
        }
      }}
    ><i className="fa fa-print" /></a>
  </span>
);
