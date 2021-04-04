/* 
    Created by longdq
*/

// import { fetch, post, put, deletes } from 'core/common/networking/api-helper';
import { fetch, post, put, deletes } from '../common/networking/api-helper';
import { APP_CONFIGS } from '../common/app-config';
import { GetRoomChatReq } from '../common/types/base-request';
import { URL_PATHS } from '../common/networking/url-paths';
export default class RoomChatServices {
  private static instance: RoomChatServices;

  static getInstance(): RoomChatServices {
    if (!RoomChatServices.instance) {
      RoomChatServices.instance = new RoomChatServices();
    }
    return RoomChatServices.instance;
  }

  getListUser = () => {
    return post(URL_PATHS.LIST_USER, {}, true);
  };

  getRoomChat = (params: GetRoomChatReq) => {
    console.log('test_get_chat_room');
    const tmpPage = params?.pageParams?.page || APP_CONFIGS.DEFAULT_NUMBER_PAGE;
    const tmpPageSize = params?.pageParams?.pageSize || APP_CONFIGS.ITEM_PER_PAGE;
    return fetch(
      URL_PATHS.LIST_ROOM_CHAT,
      { userId: params.userId, pageSize: tmpPageSize, page: tmpPage },
      true
    );
  };
}
