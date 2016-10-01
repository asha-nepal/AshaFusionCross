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
  changeActivePatient,
  insertOrChangeActiveRecord,
  setPatientFormVisibility,
  setRecordFormStyleId,
} from '../actions';

import { subscribe } from '../db';

import {
  getRecordFormStyles,
  getRecordFormStyleId,
  getRecordFormStyle,
  getPatientFormStyle,
} from '../selectors';

const mapStateToProps = (state) => {
  const patient = state.activePatient;
  const records = state.activeRecords;
  const selectedActiveRecordIndex =
    records && records.findIndex(r => r._id === state.patientView.selectedActiveRecordId);

  return {
    patient,
    records,
    selectedActiveRecordIndex,
    isNew: !patient.hasOwnProperty('_rev'),
    isFetching: state.status.isFetchingPatient,
    isPuttingPatient: state.status.isPuttingPatient,
    isPuttingRecord: state.status.isPuttingRecord,
    patientFormVisibility: state.patientView.patientFormVisibility,
    patientFormStyle: getPatientFormStyle(),
    recordFormStyles: getRecordFormStyles(state),
    recordFormStyleId: getRecordFormStyleId(state),
    recordFormStyle: getRecordFormStyle(state),
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const patientId = ownProps.patientId || ownProps.params && ownProps.params.patientId;

  return {
    init: () => {
      if (patientId) dispatch(fetchPatient(patientId));
      else dispatch(initActivePatient());
    },
    addNewActiveRecord: () => dispatch(addNewActiveRecord(patientId)),
    selectActiveRecord: (id) => dispatch(selectActiveRecord(id)),
    putActivePatient: () => dispatch(putActivePatient()),
    putActiveRecord: (index) => dispatch(putActiveRecord(index)),
    removeActivePatient: () => dispatch(removeActivePatient()),
    setPatientFormVisibility: (visibility: boolean) =>
      dispatch(setPatientFormVisibility(visibility)),
    setRecordFormStyleId: (styleId) => dispatch(setRecordFormStyleId(styleId)),
    subscribeChange: () => {
      if (!patientId) {
        return null;
      }

      const patientIdBody = patientId.replace(/^patient_/, '');

      return subscribe('change', change => {
        const doc = change.doc;
        if (doc._id === patientId) {
          dispatch(changeActivePatient(doc, { silent: true }));
        } else if (doc.type === 'record') {
          const match = doc._id.match(/record_(.+)_.+/);  // Extract patientId
          if (match && (match[1] === patientIdBody)) {
            dispatch(insertOrChangeActiveRecord(doc, { silent: true }));
          }
        }
      });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
