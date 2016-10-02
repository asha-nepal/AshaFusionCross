import PayloadAction from './action';

interface SetPatientListFilterPayload {
  filter: string,
}
interface SetPatientListFilterAction extends PayloadAction<SetPatientListFilterPayload> {}

interface SetPatientListSortFieldPayload {
  sortBy: string,
}
interface SetPatientListSortFieldAction extends PayloadAction<SetPatientListSortFieldPayload> {}

interface SetPatientListSortOrderPayload {
  sortInAsc: boolean,
}
interface SetPatientListSortOrderAction extends PayloadAction<SetPatientListSortOrderPayload> {}

export type PatientSelectAction =
  SetPatientListFilterAction &
  SetPatientListSortFieldAction &
  SetPatientListSortOrderAction;


export type PatientSelectState = {
  filter: string,
  sortBy: string,
  sortInAsc: boolean,
}
