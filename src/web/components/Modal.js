/* @flow */

import React from 'react';

export default ({
  children,
  isOpen = false,
  onClose,
}: {
  children?: React$Element<any>,  // FIXME: flow@0.32.0がJSXのchildren propを正しく検出してくれないためWorkaround
  isOpen?: boolean,
  onClose: () => void,
}) => (
  <div className={isOpen ? 'modal is-active' : 'modal'}>
    <div
      className="modal-background"
      onClick={onClose}
    />
    <div className="modal-container">
      <div className="modal-content">
        {children}
      </div>
    </div>
    <button
      className="modal-close"
      onClick={e => {
        e.preventDefault();
        onClose();
        return false;
      }}
    />
  </div>
);
