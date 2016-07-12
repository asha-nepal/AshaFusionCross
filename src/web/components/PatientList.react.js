/* @flow */

import React, { Component } from 'react';
import { Link } from 'react-router';

export default class PatientList extends Component {
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
        <Link to={'/patient/'}>
          New
        </Link>
        <ul>
        {patientList.map((patient, i) =>
          <li key={i}>
            <Link to={`/patient/${patient._id}`}>
              {patient.name || ''}
            </Link>
          </li>
        )}
        </ul>
      </div>
    );
  }
}
