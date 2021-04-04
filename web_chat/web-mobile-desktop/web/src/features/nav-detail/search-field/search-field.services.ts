import { URL_PATHS } from "../../../helpers/networking/url-paths";
import { fetch, post } from '../../../helpers/api/api-helper'
export const SearchFieldServices = {
  getInforGroupDetail: async (chatRoomId: string, userId: string) => {
    const params = {
      chatRoomId: chatRoomId,
      userId: userId
    };

    return await fetch(
      URL_PATHS.GET_CHATROOM_DETAIL,
      params,
      true
    )
  },
  getUserById: async (userId: any) => {
    const data = {
      text: userId
    }
    return post(URL_PATHS.POST_GET_USER_BY_ID, data, true)
  },
  getSingleRoom: async (userIdList: any) => {
    return post(URL_PATHS.GET_SINGLE_ROOM, userIdList, true)
  },
}


