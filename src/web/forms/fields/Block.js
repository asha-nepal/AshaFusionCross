/* @flow */

import React from 'react';

export const Block = ({
  label,
  children,
  wrap = true,
}: {
  label: ?string,
  children: ReactElement,
  wrap: boolean,
}) => (label ? (
  <div className="control">
    {label && <label className="label">{label}</label>}
    <div className="control is-grouped" style={wrap ? { flexWrap: 'wrap' } : {}}>
      {children}
    </div>
  </div>
) : (
  <div className="control is-grouped" style={wrap ? { flexWrap: 'wrap' } : {}}>
    {children}
  </div>
));
