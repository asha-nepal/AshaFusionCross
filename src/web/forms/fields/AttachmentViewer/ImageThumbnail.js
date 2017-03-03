/* @flow */
import React from 'react';

export default ({
  blob,
  alt,
  onClick,
}: {
  blob: Blob,
  alt: string,
  onClick: () => void,
}) => (
  <a
    onClick={e => {
      e.preventDefault();
      onClick();
    }}
  >
    <img src={URL.createObjectURL(blob)} alt={alt} />
  </a>
);
