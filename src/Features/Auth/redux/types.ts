export type AuthenticationStateType = {
  authState: AuthStateEnum;
  loginState: number;
  summary : string;
  transcript : string;
};

export interface LoginModel {
  User: string;
  Password: string;
  RememberMe: boolean;
}

export enum AuthStateEnum {
  SIGNUP,
  LOGIN,
}
  