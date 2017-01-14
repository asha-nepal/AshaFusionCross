import { call, put, take, select } from 'redux-saga/effects';
import {
  DFORM_STYLES_FETCH,
  LOGIN_SUCCESS,
  setDformStyleForm,
} from '../actions';

export function * fetchDformStyles(db: PouchInstance) {
  const group = 'record';  // TODO: To be configurable
  const docPrefix = `dformStyle:${group}:`;
  const docQuery = {
    startkey: docPrefix,
    endkey: `${docPrefix}\uffff`,
    include_docs: true,
  };

  const dformStylesDocs = yield call([db, db.allDocs], docQuery);

  const rows = dformStylesDocs.rows;
  for (let i = 0; i < rows.length; ++i) {
    const row = rows[i];
    const doc = row.doc;
    const idMatch = doc._id.match(new RegExp(`dformStyle:${group}:(.+)`));
    if (!idMatch) continue;
    const formId = idMatch[1];
    yield put(setDformStyleForm(group, formId, doc.label, doc.style));
  }
}

export function * watchDformStyleFetch() {
  while (true) {
    yield take([DFORM_STYLES_FETCH, LOGIN_SUCCESS]);
    const db = yield select(state => state.db.instance);
    yield call(fetchDformStyles, db);
  }
}
