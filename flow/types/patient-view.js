interface SelectActiveRecordPayload {
  id: string,
}
interface SelectActiveRecordAction extends PayloadAction<SelectActiveRecordPayload> {}

interface SetRecordFormStyleIdPayload {
  styleId: string,
}
interface SetRecordFormStyleIdAction extends PayloadAction<SetRecordFormStyleIdPayload> {}

type PatientViewAction = SelectActiveRecordAction & SetRecordFormStyleIdAction
