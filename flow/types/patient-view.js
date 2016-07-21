interface SelectActiveRecordPayload {
  id: string,
}

interface SelectActiveRecordAction extends PayloadAction<SelectActiveRecordPayload> {};

type PatientViewAction = SelectActiveRecordAction;
