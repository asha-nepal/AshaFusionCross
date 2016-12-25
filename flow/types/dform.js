import { PayloadAction } from './action';

export type DformStyle = List<Map<string, any> | string>

interface DformStyleInsertPayload {
  group: string,
  id: string,
  parentPath: string,
  index: number,
  field: FormField,
}

interface DformStyleUpdatePayload {
  group: string,
  id: string,
  parentPath: string,
  index: number,
  field: FormField,
  merge: boolean,
}

interface DformStyleDeletePayload {
  group: string,
  id: string,
  parentPath: string,
  index: number,
}

interface DformStyleMovePayload {
  group: string,
  id: string,
  fromParentPath: string,
  fromIndex: number,
  toParentPath: string,
  toIndex: number,
}

interface DformStyleInsertAction extends PayloadAction<DformStyleInsertPayload> {}
interface DformStyleUpdateAction extends PayloadAction<DformStyleUpdatePayload> {}
interface DformStyleDeleteAction extends PayloadAction<DformStyleDeletePayload> {}
interface DformStyleMoveAction extends PayloadAction<DformStyleMovePayload> {}

export type DformStyleAction =
  DformStyleInsertAction &
  DformStyleUpdateAction &
  DformStyleDeleteAction &
  DformStyleMoveAction
