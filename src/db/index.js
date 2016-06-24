/* @flow */

import PouchDB from 'pouchdb'

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

  return db
}
