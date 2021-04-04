/* 
    Created by longdq
*/

import { APP_CONFIGS } from 'core/common/app-config';
import { fetch, post, put, deletes } from 'core/common/networking/api-helper';
import { URL_PATHS } from 'core/common/networking/url-paths';
import { GetUserReq, PageParams } from 'core/common/types/base-request';

export default class ListMembersServices {
  private static instance: ListMembersServices;

  static getInstance(): ListMembersServices {
    if (!ListMembersServices.instance) {
      ListMembersServices.instance = new ListMembersServices();
    }
    return ListMembersServices.instance;
  }

  searchUser = (params: GetUserReq, pageParams: PageParams) => {
    // const tmpPage = params?.pageParams?.page || APP_CONFIGS.DEFAULT_NUMBER_PAGE;
    // const tmpPageSize = params?.pageParams?.pageSize || APP_CONFIGS.CHAT_ITEM_PER_PAGE;
    const tmpPage = pageParams?.page || APP_CONFIGS.DEFAULT_NUMBER_PAGE;
    const tmpPageSize = pageParams?.pageSize || APP_CONFIGS.CHAT_ITEM_PER_PAGE;
    return fetch(
      URL_PATHS.SYNC_USER_IHCM,
      { value: params.value, pageSize: tmpPageSize, page: tmpPage },
      true
    );
  };

  searchUserByText = (params: GetUserReq) => {
    const tmpPage = params?.pageParams?.page || APP_CONFIGS.DEFAULT_NUMBER_PAGE;
    const tmpPageSize = params?.pageParams?.pageSize || APP_CONFIGS.CHAT_ITEM_PER_PAGE;
    console.log('SEARCH USER BY TEXT :', params);

    return fetch(
      URL_PATHS.SEARCH_USER,
      { text: params.value, pageSize: tmpPageSize, page: tmpPage },
      true
    );
  };
}
