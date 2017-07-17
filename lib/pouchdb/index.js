import PouchDB from 'pouchdb';
import pouchdbAuthentication from 'pouchdb-authentication';

PouchDB.plugin(pouchdbAuthentication);

export default PouchDB;
