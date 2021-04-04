/* 
    Created by longdq
*/

import { APP_CONFIGS } from 'core/common/app-config';
import { fetch, post, put, deletes, postFile } from 'core/common/networking/api-helper';
import { URL_PATHS } from 'core/common/networking/url-paths';
import { GetUserReq, PageParams } from 'core/common/types/base-request';

export default class CreateGroupServices {
  private static instance: CreateGroupServices;

  static getInstance(): CreateGroupServices {
    if (!CreateGroupServices.instance) {
      CreateGroupServices.instance = new CreateGroupServices();
    }
    return CreateGroupServices.instance;
  }

  searchUser = (params: GetUserReq, pageParams: PageParams) => {
    const tmpPage = pageParams?.page || APP_CONFIGS.DEFAULT_NUMBER_PAGE;
    const tmpPageSize = pageParams?.pageSize || APP_CONFIGS.CHAT_ITEM_PER_PAGE;
    return fetch(
      URL_PATHS.SYNC_USER_IHCM,
      { value: params.value, pageSize: tmpPageSize, page: tmpPage },
      true
    );
  };

  uploadFile = (data: any) => {
    return postFile(URL_PATHS.UPLOAD_FILE, data, true);
  };

  onCreateGr = (data: any) => {
    return post(URL_PATHS.CREATE_GROUP, data, true);
  };

  insertMessage = (data: any) => {
    return post(URL_PATHS.INSERT_MESSAGE, data, true);
  };
}
