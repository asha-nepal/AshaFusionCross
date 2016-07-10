/* @flow */

import PouchDB from 'pouchdb'
import PubSub from './pubsub'

export let db

// Initial settings
let config: PouchConfig = {
  isLocal: false,
  local: {
    dbname: 'asha-fusion-dev',
    isSynced: false,
  },
  remote: {
    hostname: ((typeof location !== 'undefined' && location.hostname) ? location.hostname : '127.0.0.1') + ':5984',
    dbname: 'asha-fusion-dev',
  },
}

connect(config)

export const getConfig = () => config

const pubsub = new PubSub()

export function connect(
  _config: PouchConfig
) {
  config = _config

  const remoteUrl = 'http://' + config.remote.hostname + '/' + config.remote.dbname

  if (config.isLocal) {
    db = new PouchDB(config.local.dbname)
    if (config.local.isSynced) {
      db.sync(remoteUrl, {
        live: true,
        retry: true
      })
      .on('change', function (info) {
        // handle change
        console.log('sync.change')
      }).on('paused', function (err) {
        // replication paused (e.g. replication up to date, user went offline)
        console.log('sync.paused')
      }).on('active', function () {
        // replicate resumed (e.g. new changes replicating, user went back online)
        console.log('sync.resumed')
      }).on('denied', function (err) {
        // a document failed to replicate (e.g. due to permissions)
        console.log('sync.denied')
      }).on('complete', function (info) {
        // handle complete
        console.log('sync.complete')
      }).on('error', function (err) {
        // handle error
        console.log('sync.error')
      });
    }
  } else {
    db = new PouchDB(remoteUrl)
  }

  db.changes({
    since: 'now',
    live: true,
    include_docs: true,
  })
  .on('change', change => {
    // handle change
    pubsub.publish('change', change)
  })
  .on('complete', function(info) {
    // changes() was canceled
    pubsub.publish('complete', info)
  })
  .on('error', err => {
    pubsub.publish('error', err)
  })
}

export const subscribe = (key: 'change' | 'error', cb: Function) => pubsub.subscribe(key, cb)
