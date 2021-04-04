/*
    Created by longdq
*/
import { APP_CONFIGS } from 'core/common/app-config';
import { post, postFile, deletes, fetch } from 'core/common/networking/api-helper';
import { URL_PATHS } from 'core/common/networking/url-paths';
import { GetMessagesReq } from 'core/common/redux/base-request';
import { RemoveMessageParams } from './chat-detail.props';

export default class ChatDetailServices {
  private static instance: ChatDetailServices;

  static getInstance(): ChatDetailServices {
    if (!ChatDetailServices.instance) {
      ChatDetailServices.instance = new ChatDetailServices();
    }
    return ChatDetailServices.instance;
  }

  getListMessage = ( params: GetMessagesReq) => {
    const tmpPage = params?.pageParams?.page || APP_CONFIGS.DEFAULT_NUMBER_PAGE
    const tmpPageSize = params?.pageParams?.pageSize || APP_CONFIGS.CHAT_ITEM_PER_PAGE
    return fetch(
      URL_PATHS.GET_MESSAGES + '?roomId=' + params.chatId + '&page='+tmpPage+'&pageSize='+ tmpPageSize,
      // {
      //   chatId: chatId,
      //   position: 0,
      // },
      null,
      true
    );
  };

  insertMessage = (data: any) => {
    return post(URL_PATHS.INSERT_MESSAGE, data, true);
  };

  requestToUser = (id: string) => {
    return post(URL_PATHS.REQUEST_TO_USER, { userId: id }, true);
  };

  createRomChat = (id: string) => {
    return post(URL_PATHS.CREATE_ROM_CHAT, { userId: id }, true);
  };

  uploadFile = (data: any) => {
    return postFile(URL_PATHS.UPLOAD_FILE, data, true);
  };

  removeMessage = (data: RemoveMessageParams) => {
    return deletes(`${URL_PATHS.MESSAGE}`, data, true);
  };

  callVideo = (data : any) => {
    
    return post(URL_PATHS.POST_PUSH_STREAM_VIDEO_CALL,data, true)
  }
}
