/* @flow */

import PouchDB from 'pouchdb'
import PubSub from './pubsub'

export let db

// Initial settings
let config: PouchConfig = {
  hostname: ((typeof location !== 'undefined' && location.hostname) ? location.hostname : '127.0.0.1') + ':5984',
  dbname: 'asha-fusion-dev',
}

connect(config)

export const getParams = () => config

const pubsub = new PubSub()

export function connect(
  _config: PouchConfig
) {
  config = _config

  const url = 'http://' + config.hostname + '/' + config.dbname

  db = new PouchDB(url)

  db.changes({
    since: 'now',
    live: true,
    include_docs: true,
  })
  .on('change', change => {
    pubsub.publish('change', change)
  })
  .on('error', err => {
    pubsub.publish('error', err)
  })
}

export const subscribe = (key: 'change' | 'error', cb: Function) => pubsub.subscribe(key, cb)
