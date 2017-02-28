/* @flow */
import React from 'react';
import stringify from 'csv-stringify';
import moment from 'moment';
import classnames from 'classnames';

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
    onClick={e => {
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
          const link = document.createElement('a');
          const datetimeString = moment().format('YYYY-MM-DD-HH-mm-ss');
          link.download = `asha-${datetimeString}.csv`;
          link.href = URL.createObjectURL(blob);
          link.click();
        }
      );
    }}
  >Export as CSV</a>
);
