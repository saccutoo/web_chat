import { LOGIN_MOBILE, UPDATE_USER, REMOVE_USER } from './index';
import {
  LoginMobileResponse,
  LoginMobileRequest,
} from '../../types/login';

export const loginMobileAction = (data: LoginMobileRequest) => {
  return {
    type: LOGIN_MOBILE,
    data: data,
  };
};

export const saveUserInfoAction = (data: LoginMobileResponse) => {
  return {
    type: UPDATE_USER,
    data: data,
  };
};

export const removeUserInfoAction = () => {
  return {
    type: REMOVE_USER,
  };
};
