export type PatientObject = {_id: string, type: string}
export type RecordObject = {_id: string, type: string}
export type ErrorObject = {}

export type PouchConfig = {
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

export type ValueUnitType = {
  value: string,
  unit: string,
}
