import { take, call, put, select } from 'redux-saga/effects';
import { eventChannel, END } from 'redux-saga';
import {
  fetchPatientList,
  changeActivePatient,
  insertOrChangeActiveRecord,
} from '../actions';

function createPouchChangeChannel(db: PouchInstance) {
  return eventChannel(emit => {
    const feed = db.changes({
      since: 'now',
      live: true,
      include_docs: true,
    })
    .on('change', change => {
      // handle change
      emit({
        type: 'change',
        payload: {
          change,
        },
      });
    })
    .on('complete', info => {
      // changes() was canceled
      emit({
        type: 'complete',
        payload: {
          info,
        },
      });
      emit(END);
    })
    .on('error', error => {
      emit({
        type: 'error',
        error,
      });
    });

    const unsubscribe = () => feed.cancel();

    return unsubscribe;
  });
}

export function* watchOnPouchChanges(db: PouchInstance) {
  const pouchChannel = yield call(createPouchChangeChannel, db);

  while (true) {
    const { type, payload } = yield take(pouchChannel);

    if (type === 'change') {
      const { change } = payload;

      // For PatientSelect
      yield put(fetchPatientList());  // TODO: 全件fetchし直すのは効率が悪い

      // For PatientView
      const activePatientId = yield select(state => state.activePatient._id);
      if (!activePatientId) { continue; }

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
  }
}
