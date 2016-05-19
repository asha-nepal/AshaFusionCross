import PouchDB from 'pouchdb'

const hostname = (typeof location !== 'undefined' && location.hostname) ? location.hostname : '127.0.0.1'
const port = '5984'
const dbname = 'asha-fusion-dev'
const url = 'http://' + hostname + ':' + port + '/' + dbname

export const db = new PouchDB(url)
