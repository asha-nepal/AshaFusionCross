/* @flow */

import PouchDB from 'pouchdb'
import PubSub from './pubsub'

const hostname = (typeof location !== 'undefined' && location.hostname) ? location.hostname : '127.0.0.1'
const port = '5984'
const dbname = 'asha-fusion-dev'
const url = 'http://' + hostname + ':' + port + '/' + dbname

export const db = new PouchDB(url)

const pubsub = new PubSub()

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

export const subscribe = (key: 'change' | 'error', cb: Function) => pubsub.subscribe(key, cb)
