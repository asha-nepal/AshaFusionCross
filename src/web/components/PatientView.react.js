/* @flow */

import React, { Component } from 'react';

import {
  Link,
} from 'react-router';

import PatientForm from '../forms/PatientForm.react';
import RecordForm from '../forms/RecordForm.react';

export default class PatientView extends Component {
  state: {
    unsubscribeChange: () => void;
  };

  componentWillMount() {
    this.props.init();

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
    init: () => void,
    subscribeChange: () => () => void,
    isFetching: boolean,
    patient: PatientObject,
    records: Array<RecordObject>,
    addNewActiveRecord: () => void,
    putPatient: (patient: PatientObject) => void,
    putRecord: (record: RecordObject) => void,
    isPuttingPatient: boolean,
    isPuttingRecord: boolean,
  };

  render() {
    const {
      isFetching,
      patient,
      records,
      addNewActiveRecord,
      putPatient,
      putRecord,
      isPuttingPatient,
      isPuttingRecord,
    } = this.props;

    if (isFetching) {
      return <div>Fetching...</div>;
    }

    return (
      <div>
        <h2>{patient && patient.name || ''}</h2>

        <PatientForm
          initialValues={patient}
          onSubmit={params => putPatient(params)}
          freeze={isPuttingPatient}
        />

        <a
          href="#"
          onClick={e => {
            e.preventDefault();
            addNewActiveRecord();
          }}
        >ADD RECORD</a>

        {records.map(record =>
          <RecordForm
            key={record._id}
            formKey={record._id}
            initialValues={record}
            onSubmit={params => putRecord(params)}
            freeze={isPuttingRecord}
          />
        )}

        <Link to="/">Top</Link>
      </div>
    );
  }
}
