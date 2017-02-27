import PayloadAction from './action';

interface LoginSuccessPayload {
  name: ?string,
  roles: Array<string>,
}

interface LoginPayload {
  username: string,
  password: string,
}

interface SignupPayload {
  username: string,
  password: string,
  andLogin: boolean,
}

interface SetIsDBPublicPayload {
  isDBPublic: boolean,
}

interface LoginSuccessAction extends PayloadAction<LoginSuccessPayload> {}
interface RequestLoginAction extends PayloadAction<LoginPayload> {}
interface RequestSignupAction extends PayloadAction<SignupPayload> {}
interface SetIsDBPublicAction extends PayloadAction<SetIsDBPublicPayload> {}

export type AuthAction =
  LoginSuccessAction &
  RequestLoginAction &
  RequestSignupAction &
  SetIsDBPublicAction
