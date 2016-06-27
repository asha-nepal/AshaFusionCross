/* @flow */

import PouchDB from 'pouchdb'
import PubSub from './pubsub'

export let db

// Initial settings
let hostname: string = (typeof location !== 'undefined' && location.hostname) ? location.hostname : '127.0.0.1'
let port: number     = 5984
let dbname: string   = 'asha-fusion-dev'

connect(hostname, port, dbname)

export const getParams = () => ({
  hostname,
  port,
  dbname,
})

const pubsub = new PubSub()

export function connect(
  _hostname: string,
  _port: number,
  _dbname: string
) {
  hostname = _hostname
  port = _port
  dbname = _dbname

  const url = 'http://' + hostname + ':' + port.toString() + '/' + dbname

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
