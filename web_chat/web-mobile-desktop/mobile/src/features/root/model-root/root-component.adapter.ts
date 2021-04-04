import messaging from '@react-native-firebase/messaging';
import AsyncStorageHelpers from 'helpers/async-storage-helpers';
import { HyperUtils } from 'core/common/hyper-utils';
import { processRequestRespository } from 'core/common/networking/api-helper';
import { AppStateStatus } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { setI18nConfig } from 'res/languages';
import NavigationService from 'routers/navigation-service';
import { BottomTab } from 'routers/screen-name';
import { StorageKey } from '../../../helpers/async-storage-helpers';
import { StatusUserTypes, User } from '../../../core/common/types/user';
import { LoginMobileResponse } from '../../login-old/view/components/login-form-wv/login-form-wv.props';
import RootComponent from '../view/root-component';
import { UpdateDeviceInfoRequest } from './root-component.props';
import RootComponentServices from './root-component.services';
import { Device } from 'core/common/types/device-types';

export class RootComponentAdapter {
  private RootComponent: RootComponent;

  constructor(Component: RootComponent) {
    this.RootComponent = Component;
    //Update FCM
    this.checkPermission();
    this.checkLogin();
  }

  getUserInfo= async()=> {
  const data: string = (await AsyncStorageHelpers.get(StorageKey.USER_INFO)) as string;
  const setting: any = JSON.parse(data);
  return setting;
}

  checkLogin = async () => {
    const userInfo: LoginMobileResponse = await this.getUserInfo();
    console.log('test_root_component: ', userInfo);
    if (userInfo?.token) {
      //Update userInfo
      this.RootComponent.props.saveUserInfoAction(userInfo);
      NavigationService.reset(BottomTab);
    }
  };

  checkPermission = async () => {
    const enabled = await messaging().hasPermission();
    console.log('test_checkPermission:', enabled);
    if (enabled) {
      this.getFcmToken();
    } else {
      this.requestUserPermission();
    }
  };

  requestUserPermission = async () => {
    try {
      await messaging().requestPermission();
      // User has authorised
      this.getFcmToken();
    } catch (error) {
      // User has rejected permissions
      console.log('test_requestUserPermission', error);
    }
  };

  getFcmToken = async () => {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      let deviceInfo = await AsyncStorageHelpers.get(StorageKey.DEVICE_INFO);
      console.log('test_deviceInfo: ', deviceInfo, '__fcmToken: ', fcmToken);
      // console.log(deviceInfo);
      if (HyperUtils.isEmpty(deviceInfo)) {
        let device: Device = {
          userId: '',
          brand: await DeviceInfo.getBrand(),
          name: await DeviceInfo.getDeviceName(),
          version: await DeviceInfo.getVersion(),
          manufacturer: await DeviceInfo.getManufacturer(),
          model: await DeviceInfo.getModel(),
          osName: await DeviceInfo.getSystemName(),
          osVersion: await DeviceInfo.getSystemVersion(),
          status: '1',
          token: '',
          fcmToken: fcmToken,
          sessionCode: 'sessionCode',
        };
        AsyncStorageHelpers.save(StorageKey.DEVICE_INFO, JSON.stringify(device));
        // this.updateDeviceInfo(form);
      }
    } else {
      console.log('test_getFcmToken: No token received');
    }
  };

  updateDeviceInfo = (info: UpdateDeviceInfoRequest) => {
    processRequestRespository(
      RootComponentServices.getInstance().updateDeviceInfo(info),
      this.updateDeviceInfoSuccess
    );
  };

  updateDeviceInfoSuccess = (res: any) => {
    console.log('test_updateDeviceInfoSuccess: ', JSON.stringify(res));
    AsyncStorageHelpers.save(StorageKey.DEVICE_INFO, JSON.stringify(res));
  };

  handleLocalizationChange = () => {
    setI18nConfig();
    this.RootComponent.forceUpdate();
  };

  handleAppStateChange = (nextAppState: AppStateStatus) => {
    if (nextAppState === 'background' || nextAppState === 'active') {
      const tmpUser = { ...this.RootComponent.props.userInfo?.user };
      console.log('test_nextAppState: ', nextAppState, '__', tmpUser);
      if (!HyperUtils.isEmpty(tmpUser)) {
        tmpUser.statusUser =
          nextAppState === 'background' ? StatusUserTypes.OFFLINE : StatusUserTypes.ONLINE;
        this.updateStatusUser(tmpUser);
      }
    }
  };

  public updateStatusUser = (user: User) => {
    processRequestRespository(
      RootComponentServices.getInstance().updateStatusUser(user),
      undefined,
      undefined,
      false
    );
  };
}
