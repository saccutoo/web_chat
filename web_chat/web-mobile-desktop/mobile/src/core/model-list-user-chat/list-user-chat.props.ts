/* 
    Created by longdq
*/

import { LoginMobileResponse } from '../common/types/login';

export interface ListUserChatProps {
  userInfo: LoginMobileResponse;
  getListChat: () => void;
  dataListChat: MessengerModel[];
}

export interface MessengerModel {
  chatId: string;
  contentType: string;
  createdAt: string;
  fileExtension: string;
  fileSize: string;
  id: string;
  message: string;
  modifiedDate: string;
  path: string;
  refId: string;
  replyId: string;
  role: string;
  seenId: string;
  status: string;
  title: string;
  type: string;
  typeRole: string;
  updatedAt: string;
  userId: string;
}

// export interface ListChatModel {
//   avatar_url: string;
//   contact: User;
//   id: string;
//   messengers: MessengerModel[];
//   slogan: string;
//   title: string;
//   totalMessengers: number;
//   type: string;
//   userPosition: number;
//   statusUser: StatusUserTypes;
//   nameTitle: string;
// }

export interface ListChatModel {
  avatar: string;
  chats: [];
  createdAt: string;
  createdBy: string;
  created_by: string;
  description: string;
  id: string;
  slogan: string;
  status: string;
  title: string;
  type: string;
  updatedAt: string;
}
