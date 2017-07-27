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
              <div className="panel-block">
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
