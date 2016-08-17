/* @flow */

import React from 'react';

export default ({
  children,
  isOpen,
  onClose,
}: {
  children: ReactElement,
  isOpen: ?boolean,
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
      onClick={onClose}
    />
  </div>
);
