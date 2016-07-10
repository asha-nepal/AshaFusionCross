type PatientObject = {_id: string, type: string}
type RecordObject = {_id: string, type: string}
type ErrorObject = {}

type PouchConfig = {
  isLocal: boolean,
  local: {
    dbname: string,
    isSynced: boolean,
  },
  remote: {
    hostname: string,
    dbname: string,
  }
}
