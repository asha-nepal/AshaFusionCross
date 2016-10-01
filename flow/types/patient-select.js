import PayloadAction from './action';

interface SetPatientListFilterPayload {
  filter: string,
}
interface SetPatientListFilterAction extends PayloadAction<SetPatientListFilterPayload> {}

interface SetPatientListOrderPayload {
  sortInAsc: boolean,
}
interface SetPatientListOrderAction extends PayloadAction<SetPatientListOrderPayload> {}

export type PatientSelectAction =
  SetPatientListFilterAction &
  SetPatientListOrderAction;


export type PatientSelectState = {
  filter: string,
  sortInAsc: boolean,
}
