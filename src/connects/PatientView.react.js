/**
 * Copyright 2016-2017 Yuichiro Tsuchiya
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

import { connect } from 'react-redux';
import {
  fetchPatient,
  putActivePatient,
  putActiveRecord,
  removeActivePatient,
  initActivePatient,
  addNewActiveRecord,
  selectActiveRecord,
  setPatientFormVisibility,
  setRecordFormStyleId,
} from '../actions';

import {
  getActivePatient,
  makeGetDuplicatedPatients,
  getRecordFormStyles,
  getRecordFormStyleId,
  getRecordFormStyle,
  getPatientFormStyle,
  getActiveRecords,
  getSelectedActiveRecordIndex,
  getActiveRecordsFormPristineness,
  getPatientMax,
} from '../selectors';

const getNameDuplicatedPatients = makeGetDuplicatedPatients('name');
const getNumberDuplicatedPatients = makeGetDuplicatedPatients('number');

const mapStateToProps = (state) => {
  const patient = getActivePatient(state);

  return {
    patient,
    records: getActiveRecords(state),
    selectedActiveRecordIndex: getSelectedActiveRecordIndex(state),
    isNew: !patient.hasOwnProperty('_rev'),
    isFetching: state.status.isFetchingPatient,
    isPuttingPatient: state.status.isPuttingPatient,
    isPuttingRecord: state.status.isPuttingRecord,
    patientFormVisibility: state.patientView.patientFormVisibility,
    patientFormStyle: getPatientFormStyle(state),
    recordFormStyles: getRecordFormStyles(state),
    recordFormStyleId: getRecordFormStyleId(state),
    recordFormStyle: getRecordFormStyle(state),
    duplicatedPatientsExist: {
      name: getNameDuplicatedPatients(state).length > 0,
      number: getNumberDuplicatedPatients(state).length > 0,
    },
    activeRecordsFormPristineness: getActiveRecordsFormPristineness(state),
    nextPatientNumber: getPatientMax(state, 'number') + 1,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const patientId = ownProps.patientId || ownProps.match && ownProps.match.params.patientId;

  return {
    init: () => {
      if (patientId) dispatch(fetchPatient(patientId));
      else dispatch(initActivePatient());
    },
    addNewActiveRecord: () => dispatch(addNewActiveRecord(patientId)),
    selectActiveRecord: (id) => dispatch(selectActiveRecord(id)),
    putActivePatient: () => dispatch(putActivePatient(patient =>
      ownProps.history && ownProps.history.push(`/patient/${patient._id}`)
    )),
    putActiveRecord: (index) => dispatch(putActiveRecord(index)),
    removeActivePatient: () => dispatch(removeActivePatient(() =>
      ownProps.history && ownProps.history.replace('/')
    )),
    setPatientFormVisibility: (visibility: boolean) =>
      dispatch(setPatientFormVisibility(visibility)),
    setRecordFormStyleId: (styleId) => dispatch(setRecordFormStyleId(styleId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
