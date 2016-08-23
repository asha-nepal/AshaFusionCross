interface LoginSuccessPayload {
  response: {
    name: ?string,
    roles: Array<string>,
  }
}

interface LoginSuccessAction extends PayloadAction<LoginSuccessPayload> {};

type AuthAction = LoginSuccessAction;
