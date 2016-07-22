/* @flow */

import { connect } from 'react-redux';
import { actions as formActions } from 'react-redux-form';
import {
  fetchPatient,
  putPatient,
  putRecord,
  initActivePatient,
  addNewActiveRecord,
  selectActiveRecord,
} from '../actions';

import { subscribe } from '../db';

// TODO: このActionCreatorはリファクタリングの上，actions/に移動する
const insertOrChangeActiveRecord = (record: RecordObject) => (dispatch, getState) => {
  const key = '_id';
  const model = 'activeRecords';
  const collection = getState().activeRecords;
  const index = collection.findIndex(c => c[key] === record[key]);

  if (index > -1) {
    dispatch(formActions.change(`${model}[${index}]`, record));
  } else {
    // pushでの末尾追加ではない
    // IDでソートし，複数端末間で時間差submitしても順序を一意に保つ
    dispatch(formActions.change(model, collection.concat(record).sort((a, b) => a._id > b._id)));
  }
};

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
          dispatch(formActions.change('activePatient', doc));
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
