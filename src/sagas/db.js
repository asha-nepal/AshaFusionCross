import { take, call } from 'redux-saga/effects';
import { eventChannel, END } from 'redux-saga';

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
        payload: change,
      });
    })
    .on('complete', info => {
      // changes() was canceled
      emit({
        type: 'complete',
        payload: info,
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
    const { type, payload, error } = yield take(pouchChannel);

    console.log(type, payload, error);
  }
}
