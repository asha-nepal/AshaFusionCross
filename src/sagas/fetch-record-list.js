import { take, put, call, select } from 'redux-saga/effects';
import {
  FETCH_RECORD_LIST,
  requestFetchRecordList,
  successFetchRecordList,
  failureFetchRecordList,
  alertInfo,
  alertError,
} from '../actions';

function pouchFetchRecordList(db: PouchInstance) {
  return db.allDocs({
    include_docs: true,
    startkey: 'record_',
    endkey: 'record_\uffff',
  })
  .then(res => res.rows.map(r => r.doc));
}

export function* fetchRecordList(db: PouchInstance) {
  yield put(requestFetchRecordList());
  try {
    const patientList = yield call(pouchFetchRecordList, db);
    yield put(alertInfo('Record list loaded'));
    yield put(successFetchRecordList(patientList));
  } catch (error) {
    yield put(alertError('Failed loading record list'));
    yield put(failureFetchRecordList(error));
  }
}

export function* watchFetchRecordList() {
  while (true) {
    yield take(FETCH_RECORD_LIST);
    const db = yield select(state => state.db.instance);
    yield call(fetchRecordList, db);
  }
}
