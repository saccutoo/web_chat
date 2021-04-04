/* 
    Created by longdq
*/

import { fetch, post, put, deletes } from 'core/common/networking/api-helper';
import { URL_PATHS } from 'core/common/networking/url-paths';
import {
  GetAttachmentGroupReq,
  GetLinkGroupReq,
  GetUserConversationReq,
  PageParams,
} from 'core/common/types/base-request';

export default class ProfileGroupServices {
  private static instance: ProfileGroupServices;

  static getInstance(): ProfileGroupServices {
    if (!ProfileGroupServices.instance) {
      ` `;
      ProfileGroupServices.instance = new ProfileGroupServices();
    }
    return ProfileGroupServices.instance;
  }

  getInfoChat = (chatId: string) => {
    return post(URL_PATHS.CHAT_INFO, { chatId: chatId }, true);
  };

  removeUserGr = (userId: string, chatRoomId: string, userIdSend: string) => {
    return post(
      URL_PATHS.REMOVE_GROUP,
      { userId: userId, chatRoomId: chatRoomId, userIdSend: userIdSend },
      true
    );
  };

  getMemberGroup = (params: GetUserConversationReq, pageParams: PageParams) => {
    return fetch(URL_PATHS.GET_MEMBER_IN_CONVERSION, {
      chatRoomId: params.chatRoomId,
      userId: params.userId,
      // pageSize: params.pageParams?.pageSize,
      // page: params.pageParams?.page,
      pageSize: pageParams?.pageSize,
      page: pageParams?.page,
    });
  };

  getAttachmentGroup = (params: GetAttachmentGroupReq, pageParams: PageParams) => {
    return fetch(URL_PATHS.GET_LIST_ATTACHMENT_IN_ROOMCHAT, {
      chatRoomId: params.chatRoomId,
      typeAttachment: params.typeAttachment,
      // pageSize: params.pageParams?.pageSize,
      // page: params.pageParams?.page,
      pageSize: pageParams?.pageSize,
      page: pageParams?.page,
    });
  };

  getLinkGroup = (params: GetLinkGroupReq, pageParams: PageParams) => {
    return fetch(URL_PATHS.GET_LIST_LINK_IN_ROOMCHAT, {
      chatRoomId: params.chatRoomId,
      // pageSize: params.pageParams?.pageSize,
      // page: params.pageParams?.page,
      pageSize: pageParams?.pageSize,
      page: pageParams?.page,
    });
  };
}
