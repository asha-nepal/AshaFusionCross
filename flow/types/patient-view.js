import PayloadAction from './action';

interface SelectActiveRecordPayload {
  id: string,
}
interface SelectActiveRecordAction extends PayloadAction<SelectActiveRecordPayload> {}

interface SetRecordFormStyleIdPayload {
  styleId: string,
}
interface SetRecordFormStyleIdAction extends PayloadAction<SetRecordFormStyleIdPayload> {}

interface SetPatientFormVisibilityPayload {
  visibility: boolean,
}
interface SetPatientFormVisibilityAction extends PayloadAction<SetPatientFormVisibilityPayload> {}

export type PatientViewAction =
  SelectActiveRecordAction
  & SetRecordFormStyleIdAction
  & SetPatientFormVisibilityAction;
