/**
 * Copyright 2017 Yuichiro Tsuchiya
 * Copyright 2017 Yuguan Xing
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
import _get from 'lodash.get';

import Header from './Header';
import PatientInfoOneline from './PatientInfoOneline';
import RecordsTab from './RecordsTab';
import Footer from './Footer';

import RecordChartToggle from '../../containers/PatientView/RecordChartToggle';
import RecordChartSelector from '../../containers/PatientView/RecordChartSelector';
import DynamicForm from '../../forms/DynamicForm';
import Select from '../Select';

type Props = {
  init: () => void,
  isFetching: boolean,
  patient: PatientObject,
  records: Array<RecordObject>,
  addNewActiveRecord: () => void,
  putActivePatient: () => void,
  putActiveRecord: (index: number) => void,
  putDformStyles: () => void,
  removeActivePatient: () => void,
  isNew: boolean,
  isPuttingPatient: boolean,
  isPuttingRecord: boolean,
  patientFormVisibility: boolean,
  setPatientFormVisibility: (visibility: boolean) => void,
  selectedActiveRecordIndex: number,
  selectActiveRecord: (id: string) => void,
  setRecordFormStyleId: (styleId: string) => void,
  patientFormStyle: DformStyle,
  recordFormStyles: List<Map<string, DformStyle | string>>,
  recordFormStyleId: string,
  recordFormStyle: ?DformStyle,
  params: ?Object,
  patientId: ?string,
  duplicatedPatientsExist: {
    name: boolean,
    number: boolean,
  },
  activeRecordsFormPristineness: Array<boolean>,
  nextPatientNumber: number,
};

export default class PatientView extends Component {
  componentWillMount() {
    this.props.init();
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
      putDformStyles,
      removeActivePatient,
      isNew,
      isPuttingPatient,
      isPuttingRecord,
      patientFormVisibility,
      setPatientFormVisibility,
      selectedActiveRecordIndex,
      selectActiveRecord,
      setRecordFormStyleId,
      patientFormStyle,
      recordFormStyles,
      recordFormStyleId,
      recordFormStyle,
      duplicatedPatientsExist,
      activeRecordsFormPristineness,
      nextPatientNumber = 1,
    } = this.props;

    if (isFetching) {
      return <div className="loading-container"><div className="loading-content" /></div>;
      // return <div>Fetching...</div>;
    }

    const showRecord = !isNew && recordFormStyle;

    return (
      <div className="footer-fixed-container">
        <Header
          patient={patient}
          onBackClick={() => {
            if (activeRecordsFormPristineness.some(x => !x)) {
              return confirm('Record(s) is (are) changed but not saved.\nIs it ok to go back?');
            }
            return true;
          }}
        />

        {/* TODO: <Refactoring> Extract the block below to another component */}
        <div className="card">
          <div className="card-content">
            <div className="container">
            {(isNew || patientFormVisibility)
              ?
              <div className="columns">
                <div className="column">
                  <DynamicForm
                    model="activePatient"
                    style={patientFormStyle}
                    freeze={isPuttingPatient}
                    onSubmit={putActivePatient}
                    onRemove={isNew ? null : (() => {
                      if (confirm('Are you sure?')) {
                        removeActivePatient();
                      }
                    })}
                    warnings={duplicatedPatientsExist ? {
                      name: duplicatedPatientsExist.name && 'Duplicated',
                      number: duplicatedPatientsExist.number && 'Duplicated',
                    } : undefined}
                    fieldOptions={{
                      number: { nextPatientNumber },
                    }}
                  />
                </div>
                {!isNew &&
                  <div className="column is-narrow">
                    <a
                      className="delete is-pulled-right"
                      aria-label="close"
                      onClick={e => {
                        e.preventDefault();
                        setPatientFormVisibility(false);
                      }}
                    />
                  </div>
                }
              </div>
              :
              <div className="columns">
                <div className="column">
                  <PatientInfoOneline
                    patient={patient}
                  />
                </div>
                <div className="column is-narrow">
                  <a
                    className="icon is-pulled-right"
                    aria-label="edit"
                    onClick={e => {
                      e.preventDefault();
                      setPatientFormVisibility(true);
                    }}
                  >
                    <i className="fa fa-pencil-square-o" />
                  </a>
                </div>
              </div>
            }
            </div>
          </div>
        </div>

        {showRecord &&
          <section className="section">
            <div className="container">
              <div className="columns">
                <RecordsTab
                  records={records}
                  selectedActiveRecordIndex={selectedActiveRecordIndex}
                  selectActiveRecord={selectActiveRecord}
                  addNewActiveRecord={addNewActiveRecord}
                  pristinenessList={activeRecordsFormPristineness}
                />
                <div className="column is-narrow">
                  {recordFormStyles.size > 1 &&
                    <Select
                      value={recordFormStyleId}
                      onChange={setRecordFormStyleId}
                      options={recordFormStyles.map(style =>
                        ({ id: style.get('id'), label: style.get('label') })
                      )}
                    />
                  }
                  <RecordChartToggle />
                </div>
              </div>

              <RecordChartSelector records={records} />

              {selectedActiveRecordIndex > -1 && (
                <div className="container">
                  <DynamicForm
                    model={`activeRecords[${selectedActiveRecordIndex}]`}
                    formGroup="record"
                    formStyleId={recordFormStyleId}
                    style={recordFormStyle}
                    freeze={isPuttingRecord}
                    getPreviousData={(path: string) => {
                      // FIXME: Logics in view component.
                      // This function should be outside of this component.
                      const prevIndex = selectedActiveRecordIndex - 1;
                      const prevRecord = records[prevIndex];
                      if (prevRecord) {
                        return _get(prevRecord, path);
                      }

                      return null;
                    }}
                    onFormsSave={putDformStyles}
                    // customizable // TODO: Temporarily disabled
                  />
                </div>
              )}
            </div>
          </section>
        }

        {showRecord &&
          <Footer
            onSubmit={
              selectedActiveRecordIndex > -1
              && !activeRecordsFormPristineness[selectedActiveRecordIndex]
                ? () => putActiveRecord(selectedActiveRecordIndex) : undefined
            }
            freeze={isPuttingRecord}
          />
        }
      </div>
    );
  }
}
