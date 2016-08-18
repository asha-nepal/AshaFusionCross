import React from 'react';
import Modal from '../../../components/Modal';
import { ICD10 } from '../../../../data';


export default ({
  isOpen,
  onClose,
  onSelect,
}: {
  isOpen: boolean,
  onClose: () => void,
  onSelect: (code: string) => void,
}) => (
  <Modal
    isOpen={isOpen}
    onClose={onClose}
  >
    <div className="box">
      <nav className="panel">
        {Object.keys(ICD10).map(code =>
          <a
            key={code}
            className="panel-block"
            onClick={e => {
              e.preventDefault();
              onSelect(code);
            }}
          >
            <small style={{ display: 'inline-block', width: 60 }}>{code}</small>
            {ICD10[code]}
          </a>
        )}
      </nav>
    </div>
  </Modal>
);
