/* @flow */
import React from 'react';
import type { FormFieldDefinition } from '.';
import Row from './Row';


export default ({
  label,
  values,
  fields,
}: {
  label?: ?string,
  values: ?Array<Object | string>,
  fields: Array<FormFieldDefinition>,
}) => (
  <div className="control">
    {label && <label className="label">{label}</label>}
    <div className="panel">
      {(values || []).map((value, i) =>
        <Row
          key={i}
          value={value}
          fields={fields}
          readonly
        />
      )}
    </div>
  </div>
);
