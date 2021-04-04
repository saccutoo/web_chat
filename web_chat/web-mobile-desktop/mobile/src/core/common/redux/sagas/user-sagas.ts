import LoginOldServices from 'features/login-old/model-login-old/login-old.services';
import { LoginMobileResponse } from '../../types/login';
import AsyncStorageHelpers, { StorageKey } from 'helpers/async-storage-helpers';
import { hideLoading, showLoading } from 'libraries/loading/loading-modal';
import { call, put } from 'redux-saga/effects';
import { UPDATE_USER } from 'core/common/redux/actions';
import NavigationService from 'routers/navigation-service';
import { BottomTab } from 'routers/screen-name';
import { HyperUtils } from '../../hyper-utils';
import { SUCCESS, CREATED } from '../../networking/status';

export function* loginMobileSaga(action: any) {
  const params = action?.data;
  if (params) {
    showLoading();
    console.log('test_loginMobile: ', params);
    // const res = yield call(LoginOldServices.getInstance().loginMobile, params);
    const res = yield call(LoginOldServices.getInstance().sycnUserIHCM, params);
    console.log('test_res: ', res);
    if (res) {
      // yield put({ type: UPDATE_USER, payload: res.data });
      // const userInfo = res.data;
      // const deviceId = yield DeviceInfo.getDeviceId();
      // const form = {
      //   userId: userInfo && userInfo.user && userInfo.user.id,
      //   tokenLogin: userInfo.token,
      //   id: deviceId,
      // };
      // const result = yield call(LoginOldServices.getInstance().updateDevices, form);
      // if (result) {
      // }
      // return;
      // console.log(result, 'helo ....==================');
      // if (result) {
      // }
      // ApiService.post('devices/quickUpdate', form).then(async res => {
      //   await AsyncStorage.setItem('deviceInfo', JSON.stringify(res));
      // });
      const loginResponse: LoginMobileResponse = { user: res?.data, token: params?.token };
      switch (res?.status) {
        case SUCCESS:
          // AsyncStorageHelpers.save(StorageKey.USER_INFO, JSON.stringify(res.data));
          // AsyncStorageHelpers.save(StorageKey.USER_INFO, JSON.stringify(res.data));

          console.log('test_loginResponse:' , loginResponse, '- res?.status');
          yield put({ type: UPDATE_USER, payload: loginResponse });
          //Save user info
          AsyncStorageHelpers.save(StorageKey.USER_INFO, JSON.stringify(loginResponse));
          //Get device info
          let deviceInfo = yield call(getDeviceInfo);
          deviceInfo.userId = loginResponse?.user?.id || '';
          deviceInfo.token = loginResponse?.token || '';

          if (HyperUtils.isNotEmpty(deviceInfo)) {
            yield call(LoginOldServices.getInstance().updateDevices, deviceInfo);
            hideLoading();

            NavigationService.reset(BottomTab);
          }
          break;
        case CREATED:
          // const loginResponse: LoginMobileResponse = { user: res.data, token: params.token };
          console.log('test_loginResponse:', loginResponse);
          yield put({ type: UPDATE_USER, payload: loginResponse });
          //Save user info
          AsyncStorageHelpers.save(StorageKey.USER_INFO, JSON.stringify(loginResponse));
          NavigationService.reset(BottomTab);
          break;
      }
    }

    hideLoading();
  }
}

async function getDeviceInfo() {
  const deviceInfo = (await AsyncStorageHelpers.get(StorageKey.DEVICE_INFO)) as string;
  return JSON.parse(deviceInfo);
}

function* loginMobile() {}
