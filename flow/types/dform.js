import { PayloadAction } from './action';

export type DformStyle = List<Map<string, any> | string>

interface DformStyleFieldInsertPayload {
  group: string,
  id: string,
  parentPath: string,
  index: number,
  field: FormField,
}

interface DformStyleFieldUpdatePayload {
  group: string,
  id: string,
  parentPath: string,
  index: number,
  field: FormField,
  merge: boolean,
}

interface DformStyleFieldRemovePayload {
  group: string,
  id: string,
  parentPath: string,
  index: number,
}

interface DformStyleFieldMovePayload {
  group: string,
  id: string,
  fromParentPath: string,
  fromIndex: number,
  toParentPath: string,
  toIndex: number,
}

interface DformStyleFormAddPayload {
  group: string,
  id: string,
  label: string,
}

interface DformStyleFieldInsertAction extends PayloadAction<DformStyleFieldInsertPayload> {}
interface DformStyleFieldUpdateAction extends PayloadAction<DformStyleFieldUpdatePayload> {}
interface DformStyleFieldRemoveAction extends PayloadAction<DformStyleFieldRemovePayload> {}
interface DformStyleFieldMoveAction extends PayloadAction<DformStyleFieldMovePayload> {}
interface DformStyleFormAddAction extends PayloadAction<DformStyleFormAddPayload> {}

export type DformStyleAction =
  DformStyleFieldInsertAction &
  DformStyleFieldUpdateAction &
  DformStyleFieldRemoveAction &
  DformStyleFieldMoveAction &
  DformStyleFormAddAction
