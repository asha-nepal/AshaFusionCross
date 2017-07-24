/* @flow */
import React from 'react';

export default ({
  label,
  values,
}: {
  label?: ?string,
  values: ?Array<string>,
}) => (
  <div className="control">
  {label && <label className="label">{label}</label>}
  {values &&
    <div className="form-static is-multiline">
      <ul>
        {values.map((v, i) => <li key={i}>{v}</li>)}
      </ul>
    </div>
  }
  </div>
);
