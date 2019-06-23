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
import { default as NepaliDate } from 'nepali-date';

const dirtyIcon = <span className="icon is-small has-text-warning fa fa-circle" />;

export default ({
  records,
  selectedActiveRecordIndex,
  selectActiveRecord,
  addNewActiveRecord,
  pristinenessList = [],
  nepaliDate = false,
}: {
  records: Array<RecordObject>,
  selectedActiveRecordIndex: number,
  selectActiveRecord: (id: string) => void,
  addNewActiveRecord: () => void,
  pristinenessList: Array<boolean>,
  nepaliDate: bool,
}) => (
  <div className="tabs is-boxed column">
    <ul>
      {records.map((record, i) => {
        const timestamp = record.$created_at || record.$initialized_at;
        const date = timestamp && new Date(timestamp);
        const hasAttachments =
          record._attachments && Object.keys(record._attachments).length > 0;

        return (
          <li
            key={record._id}
            className={(selectedActiveRecordIndex === i) && 'is-active'}
          >
            <a
              href="#"
              onClick={e => {
                e.preventDefault();
                selectActiveRecord(record._id);
              }}
            >
              {hasAttachments &&
                <span className="icon is-small">
                  <i className="fa fa-paperclip" />
                </span>
              }
              {i + 1}
              {date &&
                <small style={{ paddingLeft: 8 }}>
                  {nepaliDate ? new NepaliDate(date).format('yyyy-mm-dd') : date.toDateString()}
                </small>
              }
              {!pristinenessList[i] && dirtyIcon}
            </a>
          </li>
        );
      })}
      <li>
        <a
          href="#"
          onClick={e => {
            e.preventDefault();
            addNewActiveRecord();
          }}
        >+</a>
      </li>
    </ul>
  </div>
);
