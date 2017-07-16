/* @flow */
import { eventChannel, END } from 'redux-saga';

export default function (db: PouchInstance) {
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
      feed.cancel();
      emit(END);
    })
    .on('error', error => {
      emit({
        type: 'error',
        error,
      });
      feed.cancel();
      emit(END);
    });

    const unsubscribe = () => feed.cancel();

    return unsubscribe;
  });
}
