import PayloadAction from './action';

interface AddAlertPayload {
  id: string,
  message: string,
  type: string,
}

interface AddAlertAction extends PayloadAction<AddAlertPayload> {}
interface RemoveAlertAction extends PayloadAction<{id: string}> {}

export type AlertAction = AddAlertAction & RemoveAlertAction;

export type Alert = {
  id: string,
  message: string,
  type: string,
};
