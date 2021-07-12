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
  field,
  asc,
  onFieldChange,
  onOrderChange,
}: {
  field: string,
  asc: boolean,
  onFieldChange: (field: string) => void,
  onOrderChange: (asc: boolean) => void,
}) => (
  <div className="field is-grouped">
    <span className="form-static">Sort:</span>
    <p className="control">
      <span className="select">
        <select
          value={field}
          onChange={e => onFieldChange(e.target.value)}
        >
          <option value=""></option>
          <option value="name">Name</option>
          <option value="number">No.</option>
        </select>
      </span>
    </p>
    <p className="form-static">
      <a
        onClick={e => {
          e.preventDefault();
          onOrderChange(!asc);
        }}
      >
        <span className="icon is-small" style={{ verticalAlign: 'middle' }}>
          <i className={`fa fa-sort-${asc ? 'asc' : 'desc'}`} />
        </span>
      </a>
    </p>
  </div>
);
