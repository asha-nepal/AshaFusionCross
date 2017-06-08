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
  putDformStyles,
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
    putDformStyles: () => dispatch(putDformStyles()),
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
