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
import stringify from 'csv-stringify';
import moment from 'moment';
import classnames from 'classnames';
import downloadBlob from 'lib/download-blob';

export default ({
  rows,
  columns,
  className,
  ...rest
}: {
  columns: Array<{ key: string, name: string }>,
  rows: Array<Object>,
  className?: string,
}) => (
  <a
    {...rest}
    className={classnames(['button', className])}
    onClick={(e) => {
      e.preventDefault();

      const csvColumns = {};
      columns.forEach(column => (csvColumns[column.key] = column.name));

      stringify(
        rows,
        {
          header: true,
          columns: csvColumns,
        },
        (err, output) => {
          const blob = new Blob([output], { type: 'text/comma-separated-values' });
          const datetimeString = moment().format('YYYY-MM-DD-HH-mm-ss');

          downloadBlob(blob, `asha-${datetimeString}.csv`);
        },
      );
    }}
  >
Export as CSV
  </a>
);
