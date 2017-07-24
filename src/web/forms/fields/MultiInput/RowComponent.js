/* @flow */
import React from 'react';


export default ({
  type,
  value,
  onChange,
  onBlur,
  onFocusNextRequested,
  onRemoveItemRequested,
  inputRef,
}: {
  type?: string,
  value: string,
  onChange: Function,
  onBlur?: Function,
  onFocusNextRequested?: Function,
  onRemoveItemRequested?: Function,
  inputRef?: Function,
}) => (
  <p className={onRemoveItemRequested ? 'control has-addons' : 'control'}>
    <input
      className="input is-expanded"
      type={type}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      onKeyPress={e => {
        if (e.which === 13) {
          e.preventDefault();
          if (onFocusNextRequested) onFocusNextRequested();
          return false;
        }
        return true;
      }}
      ref={inputRef}
    />
    {onRemoveItemRequested &&
      <a
        className="button is-danger"
        onClick={e => {
          e.preventDefault();
          if (onRemoveItemRequested) onRemoveItemRequested();
        }}
      >
        <i className="fa fa-times" />
      </a>
    }
  </p>
);
