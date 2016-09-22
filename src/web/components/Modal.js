/* @flow */

import React from 'react';

export default ({
  children,
  isOpen,
  onClose,
}: {
  children: ReactElement,
  isOpen: ?boolean,
  onClose: ?() => void,
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
    {onClose &&
      <button
        className="modal-close"
        onClick={e => {
          e.preventDefault();
          if (onClose) onClose();  // FIXME: Workaround for flow@0.25.0
          return false;
        }}
      />
    }
  </div>
);
