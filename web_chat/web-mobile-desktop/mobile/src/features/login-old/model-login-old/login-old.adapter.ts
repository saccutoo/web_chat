/* 
    Created by thaolt
*/

import { URL_PATHS } from 'core/common/networking/url-paths';
import asyncStorageHelpers, { StorageKey } from 'helpers/async-storage-helpers';
import { Platform } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { translate } from 'res/languages';
import RNFetchBlob from 'rn-fetch-blob';
import LoginOldContainer from 'features/login-old/view/login-old.screen';
import { User2 } from 'core/common/types/user';
import { GetTokenResponse } from './login-old.props';
var HTMLParser = require('fast-html-parser');

export class LoginOldAdapter {
  LoginOldContainer: LoginOldContainer;
  domainCompany: string = '';
  constructor(container: LoginOldContainer) {
    this.LoginOldContainer = container;
  }

  //Main
  loginSSO = async (username: string, pass: string) => {
    this.domainCompany = (await asyncStorageHelpers.get(StorageKey.DOMAIN_COMPANY)) || '';
    this.getTGT(username, pass);
    // this.LoginOldContainer.refLoginFormWvComponent.current?.LoginFormWvComponentAdapter.fillFormWv(
    //   username,
    //   pass
    // );
  };

  getTGT = async (username: string, pass: string) => {
    const data = {
      username: username,
      password: pass,
      service: URL_PATHS.BASE_URL_IHCM.replace('@domain', this.domainCompany),
    };

    var formBody = [];
    console.log('test_formBody_0: ', data);
    for (var property in data) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(data[property]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');

    console.log('test_formBody: ', formBody);
    await RNFetchBlob.config({
      trusty: true,
    })
      .fetch(
        'POST',
        URL_PATHS.CAS_TGT,
        { 'Content-type': 'application/x-www-form-urlencoded' },
        formBody
      )
      .then((res) => console.log(this.getTGTSuccess(res?.respInfo)))
      .catch((error) => {
        showMessage({
          message: translate('error.mesSys'),
          description: translate('error.errDes'),
          type: 'danger',
          icon: 'danger',
          floating: true,
          autoHide: true,
          hideOnPress: true,
        });
      });
  };

  getTGTSuccess = async (res: any) => {
    console.log('getTGTSuccess====', res);
    const tmp_res = Platform.OS === 'android' ? res?.headers?.location : res?.headers?.Location;
    console.log('getTGTSuccess_res====', tmp_res);
    if (tmp_res) {
      // const response = res.headers.location;
      const splits = tmp_res.split('/');
      if (splits && splits.length) {
        this.getTicket(splits[splits.length - 1]);
        console.log('test_ticket: ', splits[splits.length - 1]);
      }
    }
  };

  getTicket = (TGT: string) => {
    let url = `${URL_PATHS.CAS_TGT}/${TGT}?service=${URL_PATHS.BASE_URL_IHCM.replace(
      '@domain',
      this.domainCompany
    )}`;
    console.log(url, 'url');

    RNFetchBlob.config({
      trusty: true,
    })
      .fetch('POST', url, {
        'Content-type': 'application/x-www-form-urlencoded',
      })
      .then((res) => {
        if (res) {
          console.log('test_getTicket_response: ', res?.data);
          this.getTokeniHcm(res?.data);
        }
      })
      .catch((error) => {
        showMessage({
          message: translate('error.mesSys'),
          description: translate('error.errDes'),
          type: 'danger',
          icon: 'danger',
          floating: true,
          autoHide: true,
          hideOnPress: true,
        });
      });
  };

  getTokeniHcm = (ticket: string) => {
    if (!ticket) return;
    let url = URL_PATHS.TOKEN_IHCM.replace('@domain', this.domainCompany).replace(
      '@ticket',
      ticket
    );
    RNFetchBlob.config({
      trusty: true,
    })
      .fetch('GET', url)
      .then((response) => response.json())
      .then((res) => this.getProfile(res))
      .catch((error) => {
        showMessage({
          message: translate('error.mesSys'),
          description: translate('error.errDes'),
          type: 'danger',
          icon: 'danger',
          floating: true,
          autoHide: true,
          hideOnPress: true,
        });
      });
  };

  getProfile = (res: GetTokenResponse) => {
    let url = URL_PATHS.PROFILE_IHCM.replace('@domain', this.domainCompany);
    const token = res?.accessToken;
    console.log('getprofile =====', res);
    if (res && token) {
      RNFetchBlob.config({
        trusty: true,
      });
      fetch(url, {
        method: 'POST',
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      })
        .then((res) => res.json())
        .then((response) => {
          console.log('test_ihcm_profile: ', response);
          const tmpUser = response?.user;
          if (tmpUser) {
            const user: User2 = {
              id: tmpUser.id,
              userName: tmpUser.username,
              email: tmpUser.username,
              password: tmpUser.password,
              firstName: response?.firstName,
              lastName: response?.lastName,
              avatar: response?.fullPathPhoto,
              salt: '',
              gender: response?.gender === 'M' ? '0' : '1',
              status: tmpUser.status,
              isAdmin: tmpUser.orgAdmin,
              lastLogin: tmpUser.loginDate,
              orgId: tmpUser.orgId,
              createdAt: tmpUser.createdDate,
              updatedAt: tmpUser.modifiedDate,
              token: token,
            };
            this.login(user);
          }
        })
        .catch((error) => {
          showMessage({
            message: translate('error.mesSys'),
            description: translate('error.errDes'),
            type: 'danger',
            icon: 'danger',
            floating: true,
            autoHide: true,
            hideOnPress: true,
          });
        });
    }
  };

  login = (user: any) => {
    const { loginMobile } = this.LoginOldContainer.props;
    loginMobile(user);
  };

  loginSuccess = (res: any) => {
    console.log(res);
  };

  setting = () => {};

  /**
   * List user mới nhất
   */
  listUserHoz = () => {};

  /**
   * Ds bạn bè
   */
  listUserVer = () => {};

  /**
   * Tìm kiếm bạn bè
   */
  search = () => {};

  //OTHER
}
