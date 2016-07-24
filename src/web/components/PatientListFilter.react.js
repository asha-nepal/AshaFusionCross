/* @flow */

import React from 'react';
export default ({
  filter,
  onFilterChange,
}: {
  filter: string,
  onFilterChange: (newFilter: string) => void,
}) => (
  <p className="control">
    <input
      type="text"
      className="input"
      value={filter}
      onChange={e => onFilterChange(e.target.value)}
    />
  </p>
);
