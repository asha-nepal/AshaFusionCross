/* @flow */

import React, { Component } from 'react';

import Header from './Header';
import RecordsTab from './RecordsTab';

import RecordChartSelector from '../../containers/PatientView/RecordChartSelector';
import PatientForm from '../../forms/PatientForm';
import RecordForm from '../../forms/RecordForm';

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
    isNew: boolean,
    isPuttingPatient: boolean,
    isPuttingRecord: boolean,
    patientFormVisibility: boolean,
    setPatientFormVisibility: (visibility: boolean) => void,
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
      isNew,
      isPuttingPatient,
      isPuttingRecord,
      patientFormVisibility,
      setPatientFormVisibility,
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
        <Header
          patient={patient}
          verbose={!isNew && !patientFormVisibility}
          onPatientFormShowRequested={() => setPatientFormVisibility(true)}
        />

        {(isNew || patientFormVisibility) &&
          <section className="section">
            <div className="card is-fullwidth">
              <div className="card-content">
                <div className="container">
                  <PatientForm
                    model="activePatient"
                    onSubmit={putActivePatient}
                    freeze={isPuttingPatient}
                  />
                </div>
              </div>
              {!isNew &&
                <footer className="card-footer">
                  <a
                    className="card-footer-item"
                    onClick={e => {
                      e.preventDefault();
                      setPatientFormVisibility(false);
                    }}
                  >
                    <i className="fa fa-caret-square-o-up" />
                  </a>
                </footer>
              }
            </div>
          </section>
        }

        <section className="section">
          <RecordChartSelector records={records} />
        </section>

        {!isNew &&
          <section className="section">
            <div className="container">
              <div className="columns">
                <RecordsTab
                  records={records}
                  selectedActiveRecordIndex={selectedActiveRecordIndex}
                  selectActiveRecord={selectActiveRecord}
                  addNewActiveRecord={addNewActiveRecord}
                />
                <div className="column is-narrow control">
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
        }
      </div>
    );
  }
}
