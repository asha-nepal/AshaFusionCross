import { PayloadAction } from './action';

export type DformStyle = List<Map<string, any> | string>

interface insertDformStyleFieldPayload {
  group: string,
  id: string,
  parentPath: string,
  index: number,
  field: FormField,
}

interface updateDformStyleFieldPayload {
  group: string,
  id: string,
  parentPath: string,
  index: number,
  field: FormField,
  merge: boolean,
}

interface removeDformStyleFieldPayload {
  group: string,
  id: string,
  parentPath: string,
  index: number,
}

interface moveDformStyleFieldPayload {
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

interface insertDformStyleFieldAction extends PayloadAction<insertDformStyleFieldPayload> {}
interface updateDformStyleFieldAction extends PayloadAction<updateDformStyleFieldPayload> {}
interface removeDformStyleFieldAction extends PayloadAction<removeDformStyleFieldPayload> {}
interface moveDformStyleFieldAction extends PayloadAction<moveDformStyleFieldPayload> {}
interface DformStyleFormAddAction extends PayloadAction<DformStyleFormAddPayload> {}

export type DformStyleAction =
  insertDformStyleFieldAction &
  updateDformStyleFieldAction &
  removeDformStyleFieldAction &
  moveDformStyleFieldAction &
  DformStyleFormAddAction
