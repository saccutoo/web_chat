import { AuthenResponse } from 'features/authen/model';

export interface SplashView {
  onSaveAuthenRes(loginSession: AuthenResponse): void;
}
