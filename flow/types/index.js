interface PouchDocType {
  _id: string,
  _rev: string,
  _attachments?: Object,
}

export type PatientObject = PouchDocType & {
  type: string,
  name: string,
  age?: number,
  sex?: number,
  address?: string,
  number?: number,
}

export type RecordObject = PouchDocType & {
  _id: string,
  type: string,
  $created_at: ?number,
  $updated_at: ?number,
  $initialized_at: ?number,
}

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
  value: ?string,
  unit: ?string,
}
