import PayloadAction from './action';

interface SetSummaryRecordsPayload {
  records: Array<RecordObject>,
}

interface SetSummaryRecordsAction extends PayloadAction<SetSummaryRecordsPayload> {}

export type SummaryAction =
  SetSummaryRecordsAction


export type SummaryState = {
  records: ?Array<RecordObject>,
}
