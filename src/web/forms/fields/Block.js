/* @flow */

import React from 'react';

export const Block = ({
  label,
  children,
}: {
  label: ?string,
  children: ReactElement,
}) => (label ? (
  <div className="control">
    {label && <label className="label">{label}</label>}
    <div className="control is-grouped">
      {children}
    </div>
  </div>
) : (
  <div className="control is-grouped">
    {children}
  </div>
));
