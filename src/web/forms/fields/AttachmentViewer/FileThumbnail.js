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
    className="image is-128x128 attachment-file"
    onClick={e => {
      e.preventDefault();
      onClick();
    }}
  >
    <span className="icon">
      <i className="fa fa-file" />
    </span>
    <span className="filename">{label}</span>
  </a>
);
