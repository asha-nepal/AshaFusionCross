/* @flow */

import { connect } from 'react-redux';
import {
  fetchPatient,
  putActivePatient,
  putActiveRecord,
  initActivePatient,
  addNewActiveRecord,
  selectActiveRecord,
  setActivePatient,
  insertOrChangeActiveRecord,
  setRecordFormStyleId,
} from '../actions';

import { subscribe } from '../db';

import formStyle from '../form-style';
const recordFormStyleIds = Object.keys(formStyle.record);

const mapStateToProps = (state) => {
  const patient = state.activePatient;
  const records = state.activeRecords;
  const selectedActiveRecordIndex =
    records && records.findIndex(r => r._id === state.patientView.selectedActiveRecordId);

  return {
    patient,
    records,
    selectedActiveRecordIndex,
    isFetching: state.status.isFetchingPatient,
    isPuttingPatient: state.status.isPuttingPatient,
    isPuttingRecord: state.status.isPuttingRecord,
    recordFormStyleIds,
    recordFormStyle: formStyle.record[state.patientView.recordFormStyleId || 'normal'],
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
    setRecordFormStyleId: (styleId) => dispatch(setRecordFormStyleId(styleId)),
    subscribeChange: () => {
      if (!patientId) {
        return null;
      }

      const patientIdBody = patientId.replace(/^patient_/, '');

      return subscribe('change', change => {
        const doc = change.doc;
        if (doc._id === patientId) {
          dispatch(setActivePatient(doc));
        } else if (doc.type === 'record') {
          const match = doc._id.match(/record_(.+)_.+/);  // Extract patientId
          if (match && (match[1] === patientIdBody)) {
            dispatch(insertOrChangeActiveRecord(doc));
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
