/* @flow */
/* eslint import/no-mutable-exports: 0*/

import PouchDB from 'pouchdb';
PouchDB.plugin(require('pouchdb-authentication'));
import PubSub from './pubsub';

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

function createPouch(config: PouchConfig, _pubsub: Object) {
  let _db;
  const remoteUrl = `http://${config.remote.hostname}/${config.remote.dbname}`;

  if (config.isLocal) {
    _db = new PouchDB(config.local.dbname);
    if (config.local.isSynced) {
      _db.sync(remoteUrl, {
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
    _db = new PouchDB(remoteUrl);
  }

  _db.changes({
    since: 'now',
    live: true,
    include_docs: true,
  })
  .on('change', change => {
    // handle change
    _pubsub.publish('change', change);
  })
  .on('complete', info => {
    // changes() was canceled
    _pubsub.publish('complete', info);
  })
  .on('error', err => {
    _pubsub.publish('error', err);
  });

  return _db;
}


const pubsub = new PubSub();

export let db = createPouch(defaultConfig, pubsub);

export function connect(
  config: PouchConfig
) {
  db = createPouch(config, pubsub);
}

export const subscribe = (key: 'change' | 'error', cb: Function) => pubsub.subscribe(key, cb);
