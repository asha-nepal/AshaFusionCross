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
      {ICD10.map(icd10 =>
        <a
          key={icd10.code}
          className="panel-block"
          onClick={e => {
            e.preventDefault();
            onSelect(icd10.code);
          }}
        >
          <small style={{ display: 'inline-block', width: 60 }}>{icd10.code}</small>
          {icd10.description}
        </a>
      )}
      </nav>
    </div>
  </Modal>
);
