/* @flow */

import React, { Component } from 'react';

import Header from './Header';
import RecordsTab from './RecordsTab';

import RecordChartToggle from '../../containers/PatientView/RecordChartToggle';
import RecordChartSelector from '../../containers/PatientView/RecordChartSelector';
import PatientForm from '../../forms/PatientForm';
import RecordForm from '../../forms/RecordForm';

type Props = {
  init: () => void,
  subscribeChange: () => () => void,
  isFetching: boolean,
  patient: PatientObject,
  records: Array<RecordObject>,
  addNewActiveRecord: () => void,
  putActivePatient: () => void,
  putActiveRecord: (index: number) => void,
  removeActivePatient: () => void,
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
  params: ?Object,
  patientId: ?string,
};

export default class PatientView extends Component {
  state: {
    unsubscribeChange: ?() => void;
  };

  componentWillMount() {
    this.props.init();

    this.setState({
      unsubscribeChange: this.props.subscribeChange(),
    });
  }

  componentWillReceiveProps(newProps: Props) {
    const patientIdChanged = this.props.params ? (
      newProps.params && (this.props.params.patientId !== newProps.params.patientId)
    ) : (
      this.props.patientId !== newProps.patientId
    );

    if (patientIdChanged) {
      if (this.state.unsubscribeChange) {
        this.state.unsubscribeChange();
      }

      this.setState({
        unsubscribeChange: newProps.subscribeChange(),
      });
    }
  }

  componentWillUnmount() {
    if (this.state.unsubscribeChange) {
      this.state.unsubscribeChange();

      this.setState({
        unsubscribeChange: null,
      });
    }
  }

  props: Props;

  render() {
    const {
      isFetching,
      patient,
      records,
      addNewActiveRecord,
      putActivePatient,
      putActiveRecord,
      removeActivePatient,
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
                    onRemove={isNew ? null : (() => {
                      if (confirm('Are you sure?')) {
                        removeActivePatient();
                      }
                    })}
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
                  <RecordChartToggle />
                </div>
              </div>

              <RecordChartSelector records={records} />

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
