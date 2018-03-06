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
  <div className={onRemoveItemRequested ? 'field has-addons' : 'field'}>
    <p className="control is-expanded">
      <input
        className="input"
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
    </p>
    {onRemoveItemRequested &&
      <p className="control">
        <a
          className="button is-danger"
          onClick={e => {
            e.preventDefault();
            if (onRemoveItemRequested) onRemoveItemRequested();
          }}
        >
          <i className="fa fa-times" />
        </a>
      </p>
    }
  </div>
);
