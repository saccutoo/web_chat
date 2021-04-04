/* 
    Created by longdq
*/

import { APP_CONFIGS } from 'core/common/app-config';
import { fetch, post, put, deletes } from 'core/common/networking/api-helper';
import { GetRoomChatReq } from 'core/common/types/base-request';
import { URL_PATHS } from '../common/networking/url-paths';

export default class ListUserChatServices {
  private static instance: ListUserChatServices;

  static getInstance(): ListUserChatServices {
    if (!ListUserChatServices.instance) {
      ListUserChatServices.instance = new ListUserChatServices();
    }
    return ListUserChatServices.instance;
  }

  getListUser = () => {
    return post(URL_PATHS.LIST_USER, {}, true);
  };

  getRoomChat =  (params: GetRoomChatReq) => {
    const tmpPage = params?.pageParams?.page || APP_CONFIGS.DEFAULT_NUMBER_PAGE
    const tmpPageSize = params?.pageParams?.pageSize || APP_CONFIGS.CHAT_ITEM_PER_PAGE
    return fetch(URL_PATHS.LIST_ROOM_CHAT, { userId: params.userId, pageSize: tmpPageSize, page: tmpPage }, true);
  };
}
