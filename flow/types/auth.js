import PayloadAction from './action';

interface LoginSuccessPayload {
  response: {
    name: ?string,
    roles: Array<string>,
  }
}

interface LoginSuccessAction extends PayloadAction<LoginSuccessPayload> {}

export type AuthAction = LoginSuccessAction
