/**
 * Copyright 2016-2017 Yuichiro Tsuchiya
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from 'react';
import Modal from '../../../../components/Modal';
import { getICD10 } from '../../../../../data';


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
      {getICD10().map(icd10 =>
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
