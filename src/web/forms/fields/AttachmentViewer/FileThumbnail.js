/* @flow */
import React from 'react';

export default ({
  label,
  onClick,
}: {
  label: string,
  onClick: () => void,
}) => (
  <a
    title={label}
    style={{
      display: 'block',
      textAlign: 'center',
      wordWrap: 'break-word',
    }}
    onClick={e => {
      e.preventDefault();
      onClick();
    }}
  >
    <span className="icon is-large">
      <i className="fa fa-file" />
    </span>
    {label}
  </a>
);
