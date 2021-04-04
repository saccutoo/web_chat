/* 
    Created by longdq
*/

import { APP_CONFIGS } from 'core/common/app-config';
import { fetch, post, put, deletes } from 'core/common/networking/api-helper';
import { URL_PATHS } from 'core/common/networking/url-paths';
import { GetUserReq, PageParams } from 'core/common/types/base-request';

export default class NewMessageServices {
  private static instance: NewMessageServices;

  static getInstance(): NewMessageServices {
    if (!NewMessageServices.instance) {
      NewMessageServices.instance = new NewMessageServices();
    }
    return NewMessageServices.instance;
  }

  searchUser = (params: GetUserReq, pageParams: PageParams) => {
    const tmpPage = pageParams?.page || APP_CONFIGS.DEFAULT_NUMBER_PAGE;
    const tmpPageSize = pageParams?.pageSize || APP_CONFIGS.CHAT_ITEM_PER_PAGE;
    console.log('SEARCH USER BY TEXT :', params);
    return fetch(
      URL_PATHS.SYNC_USER_IHCM,
      { value: params.value, pageSize: tmpPageSize, page: tmpPage },
      true
    );
  };
}
