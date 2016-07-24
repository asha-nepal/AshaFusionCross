/* @flow */

import React, { Component } from 'react';
import { Link } from 'react-router';

export default class PatientSelect extends Component {
  state: {
    unsubscribeChange: () => void;
  };

  componentWillMount() {
    this.props.fetchPatientList();

    this.setState({
      unsubscribeChange: this.props.subscribeChange(),
    });
  }

  componentWillUnmount() {
    if (this.state.unsubscribeChange) {
      this.state.unsubscribeChange();
    }
  }

  props: {
    isFetching: boolean,
    fetchPatientList: () => void,
    subscribeChange: () => () => void,
    patientList: Array<PatientObject>,
  };

  render() {
    const {
      isFetching,
      patientList,
    } = this.props;

    if (isFetching) {
      return <div>Fetching patient list...</div>;
    }

    return (
      <div>
        <section className="section">
          <div className="container">
            <nav className="panel">
              <div className="panel-block">
                <Link to={'/patient/'} className="button is-primary is-outlined is-fullwidth">
                  New
                </Link>
              </div>
              {patientList.map((patient) =>
                <Link
                  key={patient._id}
                  className="panel-block"
                  to={`/patient/${patient._id}`}
                >{patient.name || ''}</Link>
              )}
            </nav>
          </div>
        </section>
      </div>
    );
  }
}
