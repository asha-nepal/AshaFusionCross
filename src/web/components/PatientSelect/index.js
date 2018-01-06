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

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../containers/PatientSelect/Header';
import PatientListFilter from '../../containers/PatientListFilter';
import AddButton from './AddButton';

export default class PatientSelect extends Component {
  componentWillMount() {
    this.props.fetchPatientList();
  }

  props: {
    isFetching?: boolean,
    fetchPatientList: () => void,
    patientList: Array<PatientObject>,
    logout?: () => void,
  };

  render() {
    const {
      isFetching,
      patientList,
      logout,
    } = this.props;

    if (isFetching) {
      return <div>Fetching patient list...</div>;
    }

    return (
      <div>
        <Header logout={logout} />
        <section className="section">
          <div className="container">
            <div className="block is-clearfix">
              <AddButton />

              <Link to="stats" className="button is-default is-pulled-right">
                <span className="icon">
                  <i className="fa fa-table" />
                </span>
                <span>Stats</span>
              </Link>
            </div>

            <nav className="panel">
              <div
                className="panel-block"
                style={{ display: 'block' }} // TODO: Workaround: https://github.com/jgthms/bulma/issues/812
              >
                <PatientListFilter />
              </div>
              {patientList.map((patient) =>
                <Link
                  key={patient._id}
                  className="panel-block"
                  to={`/patient/${patient._id}`}
                >{patient.number && `[${patient.number}] `} {patient.name || ''}</Link>
              )}
            </nav>
          </div>
        </section>
      </div>
    );
  }
}
