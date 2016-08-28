import PayloadAction from './action';

interface SelectActiveRecordPayload {
  id: string,
}
interface SelectActiveRecordAction extends PayloadAction<SelectActiveRecordPayload> {}

interface SetRecordFormStyleIdPayload {
  styleId: string,
}
interface SetRecordFormStyleIdAction extends PayloadAction<SetRecordFormStyleIdPayload> {}

interface SetVisibilityPayload {
  visibility: boolean,
}
interface SetPatientFormVisibilityAction extends PayloadAction<SetVisibilityPayload> {}
interface SetRecordChartVisibilityAction extends PayloadAction<SetVisibilityPayload> {}

interface SetRecordChartTypePayload {
  type: string,
}
interface SetRecordChartTypeAction extends PayloadAction<SetRecordChartTypePayload> {}

export type PatientViewAction =
  SelectActiveRecordAction
  & SetRecordFormStyleIdAction
  & SetPatientFormVisibilityAction
  & SetRecordChartVisibilityAction
  & SetRecordChartTypeAction;
