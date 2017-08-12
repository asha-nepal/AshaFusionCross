import { put, select } from 'redux-saga/effects';
import {
  fetchPatientList,
  changeActivePatient,
  insertOrChangeActiveRecord,
} from 'actions';

export default function * (change) {
  // For PatientSelect
  yield put(fetchPatientList());  // TODO: 全件fetchし直すのは効率が悪い

  // For PatientView
  const activePatientId = yield select(state => state.activePatient._id);
  if (!activePatientId) { return; }

  const doc = change.doc;
  if (doc._id === activePatientId) {
    yield put(changeActivePatient(doc, { silent: true }));
  } else if (doc.type === 'record') {
    const activePatientIdBody = activePatientId.replace(/^patient_/, '');
    const match = doc._id.match(/record_(.+)_.+/);  // Extract patientId
    if (match && (match[1] === activePatientIdBody)) {
      yield put(insertOrChangeActiveRecord(doc, { silent: true }));
    }
  }
}
