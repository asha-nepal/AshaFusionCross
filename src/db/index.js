/* @flow */

import PouchDB from 'pouchdb'
import Subscriber from './subscriber'

const hostname = (typeof location !== 'undefined' && location.hostname) ? location.hostname : '127.0.0.1'
const port = '5984'
const dbname = 'asha-fusion-dev'
const url = 'http://' + hostname + ':' + port + '/' + dbname

export const db = new PouchDB(url)

const subscriber = new Subscriber()

db.changes({
  since: 'now',
  live: true,
  include_docs: true,
})
.on('change', change => {
  subscriber.trigger('change', change)
})
.on('error', err => {
  subscriber.trigger('error', err)
})

export const subscribe = (key: 'change' | 'error', cb: Function) => subscriber.subscribe(key, cb)
