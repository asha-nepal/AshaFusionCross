/* @flow */

import { connect } from 'react-redux';
import {
  fetchPatient,
  putPatient,
  putRecord,
  updateActivePatient,
  initActivePatient,
  addNewActiveRecord,
  addOrUpdateActiveRecord,
  selectActiveRecord,
} from '../actions';

import { subscribe } from '../db';

const mapStateToProps = (state) => ({
  isFetching: state.status.isFetchingPatient,
  patient: state.activePatient,
  records: state.activeRecords,
  selectedActiveRecordId: state.patientView.selectedActiveRecordId,
  isPuttingPatient: state.status.isPuttingPatient,
  isPuttingRecord: state.status.isPuttingRecord,
});

const mapDispatchToProps = (dispatch, ownProps) => {
  const patientId = ownProps.patientId || ownProps.params && ownProps.params.patientId;

  return {
    init: () => {
      if (patientId) dispatch(fetchPatient(patientId));
      else dispatch(initActivePatient());
    },
    addNewActiveRecord: () => dispatch(addNewActiveRecord(patientId)),
    selectActiveRecord: (id) => dispatch(selectActiveRecord(id)),
    putPatient: (patient) => dispatch(putPatient(patient)),
    putRecord: (record) => dispatch(putRecord(record)),
    subscribeChange: () => {
      if (!patientId) {
        return null;
      }

      const patientIdBody = patientId.replace(/^patient_/, '');

      return subscribe('change', change => {
        const doc = change.doc;
        if (doc._id === patientId) {
          dispatch(updateActivePatient(doc));
        } else if (doc.type === 'record') {
          const match = doc._id.match(/record_(.+)_.+/);  // Extract patientId
          if (match && (match[1] === patientIdBody)) {
            dispatch(addOrUpdateActiveRecord(doc));
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
