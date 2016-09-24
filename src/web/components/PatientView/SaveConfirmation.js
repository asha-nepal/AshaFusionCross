/* @flow */

import React from 'react';
import Modal from '../Modal';

export default ({
  isOpen,
  onSave,
  onNotSave,
  onCancel,
}: {
  isOpen: boolean,
  onSave: () => void,
  onNotSave: () => void,
  onCancel: () => void,
}) => (
  <Modal
    isOpen={isOpen}
  >
    <div
      className="box"
    >
      <p className="content">
        You have unsaved data.
        Save?
      </p>
      <div className="control is-grouped">
        <p className="control">
          <a
            className="button is-primary"
            onClick={e => {
              e.preventDefault();
              onSave();
            }}
          >Save</a>
        </p>
        <p className="control">
          <a
            className="button is-danger"
            onClick={e => {
              e.preventDefault();
              onNotSave();
            }}
          >Don't save</a>
        </p>
        <p className="control">
          <a
            className="button"
            onClick={e => {
              e.preventDefault();
              onCancel();
            }}
          >Cancel</a>
        </p>
      </div>
    </div>
  </Modal>
);
