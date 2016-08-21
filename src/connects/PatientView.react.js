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
  setPatientFormVisibility,
  setRecordFormStyleId,
} from '../actions';

import { subscribe } from '../db';

import {
  recordFormStylesSelector,
  recordFormStyleIdSelector,
  recordFormStyleSelector,
} from '../selectors';

const mapStateToProps = (state) => {
  const patient = state.activePatient;
  const records = state.activeRecords;
  const selectedActiveRecordIndex =
    records && records.findIndex(r => r._id === state.patientView.selectedActiveRecordId);

  const recordFormStyle = recordFormStyleSelector(state);

  return {
    patient,
    records,
    selectedActiveRecordIndex,
    isFetching: state.status.isFetchingPatient,
    isPuttingPatient: state.status.isPuttingPatient,
    isPuttingRecord: state.status.isPuttingRecord,
    patientFormVisibility: state.patientView.patientFormVisibility,
    recordFormStyles: recordFormStylesSelector(state),
    recordFormStyleId: recordFormStyleIdSelector(state),
    recordFormStyle: recordFormStyle && recordFormStyle.style,
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
