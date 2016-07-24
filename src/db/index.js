/* @flow */
/* eslint import/no-mutable-exports: 0*/

import PouchDB from 'pouchdb';
import PubSub from './pubsub';

export let db;

// Initial settings
const defaultHost = (typeof location !== 'undefined' && location.hostname)
  ? location.hostname
  : '127.0.0.1';
export const defaultConfig: PouchConfig = {
  isLocal: false,
  local: {
    dbname: 'asha-fusion-dev',
    isSynced: false,
  },
  remote: {
    hostname: `${defaultHost}:5984`,
    dbname: 'asha-fusion-dev',
  },
};

const pubsub = new PubSub();

export function connect(
  config: PouchConfig
) {
  const remoteUrl = `http://${config.remote.hostname}/${config.remote.dbname}`;

  if (config.isLocal) {
    db = new PouchDB(config.local.dbname);
    if (config.local.isSynced) {
      db.sync(remoteUrl, {
        live: true,
        retry: true,
      });
//      .on('change', info => {
//        // handle change
//        console.log('sync.change')
//      })
//      .on('paused', err => {
//        // replication paused (e.g. replication up to date, user went offline)
//        console.log('sync.paused')
//      })
//      .on('active', () => {
//        // replicate resumed (e.g. new changes replicating, user went back online)
//        console.log('sync.resumed')
//      })
//      .on('denied', err => {
//        // a document failed to replicate (e.g. due to permissions)
//        console.log('sync.denied')
//      })
//      .on('complete', info => {
//        // handle complete
//        console.log('sync.complete')
//      })
//      .on('error', err => {
//        // handle error
//        console.log('sync.error')
//      });
    }
  } else {
    db = new PouchDB(remoteUrl);
  }

  db.changes({
    since: 'now',
    live: true,
    include_docs: true,
  })
  .on('change', change => {
    // handle change
    pubsub.publish('change', change);
  })
  .on('complete', info => {
    // changes() was canceled
    pubsub.publish('complete', info);
  })
  .on('error', err => {
    pubsub.publish('error', err);
  });
}

connect(defaultConfig);

export const subscribe = (key: 'change' | 'error', cb: Function) => pubsub.subscribe(key, cb);
