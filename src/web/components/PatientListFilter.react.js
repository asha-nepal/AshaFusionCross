/* @flow */

import React from 'react';
export default ({
  filter,
  onFilterChange,
}: {
  filter: string,
  onFilterChange: (newFilter: string) => void,
}) => (
  <p className="control has-icon">
    <input
      type="text"
      className="input"
      value={filter}
      onChange={e => onFilterChange(e.target.value)}
    />
    <i className="fa fa-search" />
  </p>
);
