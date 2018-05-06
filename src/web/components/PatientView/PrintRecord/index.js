/**
 * Copyright 2017 Yuichiro Tsuchiya
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
import ReactDOM from 'react-dom';
import PrintPage from './PrintPage';

const formatList = [
  { label: 'Report', Component: PrintPage },
];

export const createPrintSelector = ({
  Container,
  Item,
}) => ({
  patient,
  record,
}: {
  patient: PatientObject,
  record: RecordObject,
}) => (
  <Container>
    {formatList.map(({ label, Component }, i) =>
      <Item
        key={i}
        onClick={e => {
          e.preventDefault();

          const printWindow = window.open('/print.html');
          if (printWindow) {
            printWindow.onload = () => {
              ReactDOM.render(
                <Component patient={patient} record={record} />,
                printWindow.document.getElementById('root'),
                () => {
                  printWindow.focus();
                  setTimeout(() => printWindow.print(), 1);
    //                printWindow.close();
                }
              );
            };
          }
        }}
      >
        {label}
      </Item>
    )}
  </Container>
);
