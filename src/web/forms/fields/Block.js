/* @flow */

import React from 'react';

export const Block = ({
  label,
  children,
  wrap = true,
}: {
  label?: string,
  children?: React$Element<any>,  // FIXME: flow@0.32.0がJSXのchildren propを正しく検出してくれないためWorkaround
  wrap?: boolean,
}): React$Element<any> => (label ? (
  <div className="control">
    <label className="label">{label}</label>
    <div className="control is-grouped" style={wrap ? { flexWrap: 'wrap' } : {}}>
      {children}
    </div>
  </div>
) : (
  <div className="control is-grouped" style={wrap ? { flexWrap: 'wrap' } : {}}>
    {children}
  </div>
));
