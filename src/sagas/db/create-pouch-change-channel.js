/**
 * Copyright 2017 Yuichiro Tsuchiya
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* @flow */
import { eventChannel, END } from 'redux-saga';

export default function (db: PouchInstance) {
  return eventChannel((emit) => {
    let feed;

    function startChangesFeed() {
      feed = db.changes({
        since: 'now',
        live: true,
        include_docs: true,
      })
        .on('change', (change) => {
        // handle change
          emit({
            type: 'change',
            payload: {
              change,
            },
          });
        })
        .on('complete', (info) => {
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
        .on('error', (error) => {
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
