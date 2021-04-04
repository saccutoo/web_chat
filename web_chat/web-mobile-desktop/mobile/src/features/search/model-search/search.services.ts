/* 
    Created by longdq
*/

import { APP_CONFIGS } from 'core/common/app-config';
import { fetch, post, put, deletes } from 'core/common/networking/api-helper';
import { URL_PATHS } from 'core/common/networking/url-paths';
import { GetUserReq } from 'core/common/types/base-request';

export default class SearchServices {
  private static instance: SearchServices;

  static getInstance(): SearchServices {
    if (!SearchServices.instance) {
      SearchServices.instance = new SearchServices();
    }
    return SearchServices.instance;
  }

  searchUser = (params: GetUserReq) => {
    const tmpPage = params?.pageParams?.page || APP_CONFIGS.DEFAULT_NUMBER_PAGE;
    const tmpPageSize = params?.pageParams?.pageSize || APP_CONFIGS.CHAT_ITEM_PER_PAGE;
    return fetch(
      URL_PATHS.SYNC_USER_IHCM,
      { value: params.value, pageSize: tmpPageSize, page: tmpPage },
      true
    );
  };
}
