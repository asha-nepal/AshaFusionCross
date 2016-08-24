import PayloadAction from './action';

interface SetPatientListFilterPayload {
  filter: string,
}

interface SetPatientListFilterAction extends PayloadAction<SetPatientListFilterPayload> {}

export type PatientSelectAction = SetPatientListFilterAction;
export type PatientSelectState = {
  filter: string
}
