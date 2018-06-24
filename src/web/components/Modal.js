/**
 * Copyright 2017 Yuichiro Tsuchiya
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

/* @flow */

import React from 'react';

export default ({
  children,
  isOpen = false,
  onClose,
}: {
  children?: React$Element<any>, // FIXME: flow@0.32.0がJSXのchildren propを正しく検出してくれないためWorkaround
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
      onClick={(e) => {
        e.preventDefault();
        onClose();
        return false;
      }}
    />
  </div>
);
