import PayloadAction from './action';

interface SetPatientListFilterPayload {
  filter: string,
}
interface SetPatientListFilterAction extends PayloadAction<SetPatientListFilterPayload> {}

interface SetPatientListSortFieldPayload {
  sortBy: string,
}
interface SetPatientListSortFieldAction extends PayloadAction<SetPatientListSortFieldPayload> {}

interface SetPatientListOrderPayload {
  sortInAsc: boolean,
}
interface SetPatientListOrderAction extends PayloadAction<SetPatientListOrderPayload> {}

export type PatientSelectAction =
  SetPatientListFilterAction &
  SetPatientListSortFieldAction &
  SetPatientListOrderAction;


export type PatientSelectState = {
  filter: string,
  sortBy: string,
  sortInAsc: boolean,
}
