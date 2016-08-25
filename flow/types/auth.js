import PayloadAction from './action';

interface LoginSuccessPayload {
  name: ?string,
  roles: Array<string>,
}

interface AuthPayload {
  username: string,
  password: string,
}

interface SetIsDBPublicPayload {
  isDBPublic: boolean,
}

interface LoginSuccessAction extends PayloadAction<LoginSuccessPayload> {}
interface RequestLoginAction extends PayloadAction<AuthPayload> {}
interface RequestSignupAction extends PayloadAction<AuthPayload> {}
interface SetIsDBPublicAction extends PayloadAction<SetIsDBPublicPayload> {}

export type AuthAction =
  LoginSuccessAction &
  RequestLoginAction &
  RequestSignupAction &
  SetIsDBPublicAction
