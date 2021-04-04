import {
  LoginMobileRequestCas,
  SyncUserIHCMeRequest,
} from '../view/components/login-form-wv/login-form-wv.props';
/* 
    Created by thaolt
*/

import { fetch, post, put, deletes } from 'core/common/networking/api-helper';
import { URL_PATHS } from '../../../core/common/networking/url-paths';
import { LoginMobileRequest } from '../view/components/login-form-wv/login-form-wv.props';
import { GetTGTRequest } from './login-old.props';

export default class LoginOldServices {
  private static instance: LoginOldServices;

  static getInstance(): LoginOldServices {
    if (!LoginOldServices.instance) {
      LoginOldServices.instance = new LoginOldServices();
    }
    return LoginOldServices.instance;
  }

  checkTicket = (ticket: string) => {
    let url = URL_PATHS.CHECK_TICKET.replace('my_ticket', ticket);
    return fetch(url, {}, false, true);

    //With token
    // post(URL_PATH.REGISTER_OTP_CUSTOMER_NK, data, true);
  };

  loginMobile = (data: LoginMobileRequest) => {
    setImmediate;
    return post(URL_PATHS.MOBILE_LOGIN, data, true);
  };

  // NEW LOGIN
  sycnUserIHCM = (data: SyncUserIHCMeRequest) => {
    return post(URL_PATHS.SYNC_USER_IHCM, data, true);
  };

  updateDevices = (data: any) => {
    return post(URL_PATHS.UPDATE_DEVICE_ID, data, true);
  };

  getTGT = (data: GetTGTRequest) => {
    return post(URL_PATHS.CAS_TGT, data, false, true);
  };
}
