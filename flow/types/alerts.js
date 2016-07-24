interface AddAlertPayload {
  id: string,
  message: string,
  type: string,
};

interface AddAlertAction extends PayloadAction<AddAlertPayload> {};
interface RemoveAlertAction extends PayloadAction<{id: string}> {};

type AlertAction = AddAlertAction & RemoveAlertAction;

type Alert = {
  id: string,
  message: string,
  type: string,
};