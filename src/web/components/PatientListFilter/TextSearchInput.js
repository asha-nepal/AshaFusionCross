/* @flow */
import React from 'react';

export default ({
  value,
  onChange,
}: {
  value: string,
  onChange: (value: string) => void,
}) => (
  <p className="control has-icon is-expanded">
    <input
      type="text"
      className="input withclear"
      value={value}
      onChange={e => onChange(e.target.value)}
    />
    <span className="clearbuttonwrapper">
      <i
        className="fa fa-times-circle clearbutton"
        onClick={() => onChange('')}
      />
    </span>
    <i className="fa fa-search" />
  </p>
);
