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

import {
  TextUnitInputComponent,
} from '../../forms/fields';
import PrintRecord from '../../containers/PrintRecord';

export default ({
  patient,
  verbose,
  onPatientFormShowRequested,
  onBackClick,
}: {
  patient: ?PatientObject,
  verbose: boolean,
  onPatientFormShowRequested: () => void,
  onBackClick?: () => boolean,
}) => (
  <section className="hero is-primary is-bold header-fixed">
    <div className="hero-head">
      <div className="container">
        <nav className="nav">
          <div className="nav-left">
            <Link
              className="nav-item"
              to="/"
              onClick={e => {
                if (onBackClick && !onBackClick()) {
                  e.preventDefault();
                  return false;
                }
                return true;
              }}
            >
              <span className="icon"><i className="fa fa-arrow-left" /></span>
            </Link>
            {verbose && patient && [
              patient.number && <span key="number" className="nav-item">[{patient.number}]</span>,
              patient.name && <span key="name" className="nav-item">
                <span className="title">{patient.name || ''}</span>
              </span>,
              patient.age &&
                <span key="age" className="nav-item">
                  Age:
                  {<TextUnitInputComponent
                    value={patient.age}
                    units={['years', 'months']}
                    readonly
                  />}
                </span>,
              patient.sex &&
                <span key="sex" className="nav-item">Sex: {patient.sex}</span>,
              patient.address &&
                <span key="address" className="nav-item">Address: {patient.address}</span>,
            ]}
            {verbose &&
              <a
                className="nav-item"
                onClick={e => {
                  e.preventDefault();
                  onPatientFormShowRequested();
                }}
              >
                <span className="icon"><i className="fa fa-pencil-square-o" /></span>
              </a>
            }
            <PrintRecord className="nav-item" />
          </div>
        </nav>
      </div>
    </div>
  </section>
);
