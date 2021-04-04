/* 
    Created by thaolt
*/

import { fetch, post, put, deletes } from 'core/common/networking/api-helper';
import { URL_PATHS } from 'core/common/networking/url-paths';
import { UpdateDeviceInfoRequest } from './root-component.props';
import { User } from '../../../core/common/types/user';

export default class RootComponentServices {
  private static instance: RootComponentServices;

  static getInstance(): RootComponentServices {
    if (!RootComponentServices.instance) {
      RootComponentServices.instance = new RootComponentServices();
    }
    return RootComponentServices.instance;
  }

  updateDeviceInfo = (data: UpdateDeviceInfoRequest) => {
    return post(URL_PATHS.UPDATE_DEVICE_INFO, data, false);
  };

  updateStatusUser = (data: User) => {
    return post(URL_PATHS.UPDATE_STATUS_USER, data, true);
  };
}
