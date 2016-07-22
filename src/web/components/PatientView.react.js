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
    selectedActiveRecordIndex: number,
    selectActiveRecord: (id: string) => void,
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
      selectedActiveRecordIndex,
      selectActiveRecord,
    } = this.props;

    if (isFetching) {
      return <div>Fetching...</div>;
    }

    return (
      <div>

        <section className="hero is-primary is-bold">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">
                <Link to="/">&lt; </Link>
                {patient && patient.name || ''}
              </h1>
              <h2 className="subtitle">
                {(patient && patient.age) ? `Age: ${patient.age}` : ''}
              </h2>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <PatientForm
              model="activePatient"
              onSubmit={params => putPatient(params)}
              freeze={isPuttingPatient}
            />
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="tabs">
              <ul>
                {records.map((record, i) =>
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
                    >{i + 1}</a>
                  </li>
                )}
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

            {selectedActiveRecordIndex > -1 && (
              <div className="container">
                <RecordForm
                  model={`activeRecords[${selectedActiveRecordIndex}]`}
                  onSubmit={(params) => putRecord(params)}
                  freeze={isPuttingRecord}
                />
              </div>
            )}
          </div>
        </section>
      </div>
    );
  }
}
