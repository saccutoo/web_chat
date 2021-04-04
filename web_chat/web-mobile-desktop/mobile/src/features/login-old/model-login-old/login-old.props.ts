import {
  LoginMobileRequest,
  LoginMobileResponse
} from '../view/components/login-form-wv/login-form-wv.props';


export interface LoginOldProps {
  userInfo: LoginMobileResponse;
  loginMobile: (data: LoginMobileRequest) => void;
}

export interface GetTGTRequest {
  username: string;
  password: string;
  service: string;
}

export interface GetTokenResponse {
  status: string;
  accessToken: string;
}
