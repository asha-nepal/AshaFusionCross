/* @flow */

import React, { Component } from 'react';

import {
  Link,
} from 'react-router';

import PatientForm from '../forms/PatientForm';
import RecordForm from '../forms/RecordForm';

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
    putActivePatient: () => void,
    putActiveRecord: (index: number) => void,
    isPuttingPatient: boolean,
    isPuttingRecord: boolean,
    selectedActiveRecordIndex: number,
    selectActiveRecord: (id: string) => void,
    setRecordFormStyleId: (styleId: string) => void,
    recordFormStyles: Array<Object>,
    recordFormStyleId: string,
    recordFormStyle: ?string,
  };

  render() {
    const {
      isFetching,
      patient,
      records,
      addNewActiveRecord,
      putActivePatient,
      putActiveRecord,
      isPuttingPatient,
      isPuttingRecord,
      selectedActiveRecordIndex,
      selectActiveRecord,
      setRecordFormStyleId,
      recordFormStyles,
      recordFormStyleId,
      recordFormStyle,
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
              onSubmit={putActivePatient}
              freeze={isPuttingPatient}
            />
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="columns">
              <div className="column">
                <div className="tabs">
                  <ul>
                    {records.map((record, i) => {
                      const createdAt = new Date(record.$created_at);
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
                            {isNaN(createdAt.getTime()) ||
                              <small style={{ paddingLeft: 8 }}>
                                {createdAt.toDateString()}
                              </small>
                            }
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
              </div>

              <div className="column control" style={{ flex: 'none' }}>
                <span className="select">
                  <select
                    value={recordFormStyleId}
                    onChange={e => {
                      setRecordFormStyleId(e.target.value);
                    }}
                  >
                  {recordFormStyles.map(style =>
                    <option key={style.id} value={style.id}>{style.label}</option>
                  )}
                  </select>
                </span>
              </div>
            </div>


            {selectedActiveRecordIndex > -1 && (
              <div className="container">
                <RecordForm
                  model={`activeRecords[${selectedActiveRecordIndex}]`}
                  style={recordFormStyle}
                  onSubmit={() => putActiveRecord(selectedActiveRecordIndex)}
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
