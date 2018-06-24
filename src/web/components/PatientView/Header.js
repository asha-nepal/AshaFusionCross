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
import {
  Link,
} from 'react-router-dom';

import Header from '../common/Header';
import FaIcon from '../common/FaIcon';
import { createPrintSelector } from './PrintRecord';

const PrintSelector = createPrintSelector({
  Container: ({ ...props }) => <div {...props} className="navbar-dropdown" />,
  Item: ({ ...props }) => <a {...props} className="navbar-item" />,
});

export default ({
  patient,
  record,
  onBackClick,
}: {
  patient: PatientObject,
  record: ?RecordObject,
  onBackClick?: () => boolean,
}) => (
  <Header
    brand={[
      <Link
        key="back"
        className="navbar-item"
        to="/"
        onClick={(e) => {
          if (onBackClick && !onBackClick()) {
            e.preventDefault();
            return false;
          }
          return true;
        }}
      >
        <span className="icon">
          <i className="fa fa-arrow-left" />
        </span>
      </Link>,
      <span
        key="name"
        className="navbar-item is-hidden-touch"
      >
        {(patient.number ? `[${patient.number}] ` : '') + (patient.name || '(No name)')}
      </span>,
    ]}
    menu={
      patient && record
        && (
        <div className="navbar-end">
          <div className="navbar-item has-dropdown is-hoverable">
            <a className="navbar-link">
              <FaIcon type="print" size="small" />
              {' '}
Print
            </a>
            <PrintSelector
              patient={patient}
              record={record}
            />
          </div>
        </div>
        )
    }
  />
);
