/* @flow */
import { eventChannel, END } from 'redux-saga';

export default function (db: PouchInstance) {
  return eventChannel(emit => {
    let feed;

    function startChangesFeed() {
      feed = db.changes({
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
        if (error.code === 'ETIMEDOUT') {
          // Retry if timeout error occurs because some proxy intercepts heartbeat signals
          // and it is able to start listening changes again in such case.
          console.log('ETIMEDOUT');
          feed.cancel();
          startChangesFeed();
          return;
        }

        emit({
          type: 'error',
          error,
        });
        feed.cancel();
        emit(END);
      });
    }

    startChangesFeed();

    const unsubscribe = () => feed.cancel();

    return unsubscribe;
  });
}
