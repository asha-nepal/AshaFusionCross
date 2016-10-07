import { PayloadAction, Action } from './action';

type PouchInstance = Object

interface DBSetInstancePayload {
  instance: PouchInstance,
}
interface DBSetInstanceAction extends PayloadAction<DBSetInstancePayload> {}

interface DBConnectRequestPayload {
  config: PouchConfig,
}
interface DBConnectRequestAction extends PayloadAction<DBConnectRequestPayload> {}

interface DBDisconnectRequestAction extends Action {}

export type DBAction =
  DBSetInstanceAction &
  DBConnectRequestAction &
  DBDisconnectRequestAction

export type DBState = {
  instance: ?PouchInstance,
}
