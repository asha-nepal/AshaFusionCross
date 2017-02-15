/* @flow */
import { take, select, call, put } from 'redux-saga/effects';
import {
  POUCH_DOCS_FETCH,
  requestFetchingPouchDocs,
  successFetchingPouchDocs,
  failFetchingPouchDocs,
  alertInfo,
  alertError,
} from '../actions';

function pouchFetchDocs(db: PouchInstance, prefix: string): Promise<Array<PouchDocType>> {
  return db.allDocs({
    include_docs: true,
    startkey: prefix,
    endkey: `${prefix}\uffff`,
  })
  .then(res => res.rows.map(r => r.doc));
}

export function* fetchPouchDocs(
  db: PouchInstance,
  name: string,
  opts: Object
): Generator<*, void, *> {
  yield put(requestFetchingPouchDocs(name));
  try {
    const { prefix } = opts;
    // $FlowFixMe
    const data: Array<PouchDocType> = yield call(pouchFetchDocs, db, prefix);
    yield put(alertInfo('Loaded'));
    yield put(successFetchingPouchDocs(name, data));
  } catch (error) {
    yield put(alertError('Failed loading'));
    yield put(failFetchingPouchDocs(name, error));
  }
}

export function* watchFetchPouchDocs(): Generator<*, void, *> {
  while (true) {
    // $FlowFixMe
    const { payload } = yield take(POUCH_DOCS_FETCH);
    const db = yield select(state => state.db.instance);
    yield call(fetchPouchDocs, db, payload.name, payload.opts);
  }
}
