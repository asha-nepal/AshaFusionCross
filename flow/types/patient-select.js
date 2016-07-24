interface SetPatientListFilterPayload {
  filter: string,
}

interface SetPatientListFilterAction extends PayloadAction<SetPatientListFilterPayload> {};

type PatientSelectAction = SetPatientListFilterAction;
type PatientSelectState = {
  filter: string
}
