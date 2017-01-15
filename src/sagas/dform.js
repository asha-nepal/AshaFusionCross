import { call, put, take, select } from 'redux-saga/effects';
import {
  DFORM_STYLES_FETCH,
  DFORM_STYLES_PUT,
  LOGIN_SUCCESS,
  setDformStyleForm,
  alertInfo,
  alertError,
} from '../actions';
import {
  getDformStyles,
} from '../selectors';

export function * fetchDformStyles(db: PouchInstance) {
  const docPrefix = 'dformStyle:';
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
    const idMatch = doc._id.match(/dformStyle:([^:]+):([^:]+)/);
    if (!idMatch) continue;
    const group = idMatch[1];
    const formId = idMatch[2];
    yield put(setDformStyleForm(group, formId, doc.label, doc.style, doc._rev));
  }
}

export function * watchDformStyleFetch() {
  while (true) {
    yield take([DFORM_STYLES_FETCH, LOGIN_SUCCESS]);
    const db = yield select(state => state.db.instance);
    yield call(fetchDformStyles, db);
  }
}

export function * putDformStyles(db: PouchInstance) {
  const dformState: Map<> = yield select(getDformStyles);

  try {
    const groups = dformState.keys();
    for (const group of groups) {
      const groupForms = dformState.get(group);

      yield* groupForms.map(form => {
        const putDoc = {
          _id: `dformStyle:${group}:${form.get('id')}`,
          label: form.get('label'),
          style: form.get('style').toJS(),
        };
        if (form.get('rev')) {
          putDoc._rev = form.get('rev');
        }

        return call([db, db.put], putDoc);
      }).toArray();
    }
    yield put(alertInfo('Form styles saved'));
  } catch (error) {
    yield put(alertError('Failed to save form styles'));
  }
}

export function * watchDformStylePut() {
  while (true) {
    yield take(DFORM_STYLES_PUT);
    const db = yield select(state => state.db.instance);
    yield call(putDformStyles, db);
  }
}
