import { User2 } from './user';

export interface LoginMobileResponse {
  user: User2;
  token: string;
  // message: string;
}

export interface LoginMobileRequest {
  email: string;
  password: string;
}
