import { User2 } from './user';

export interface GetMessagesRes {
  attachments: [];
  createdAt: string;
  id: string;
  message: string;
  messageStatus: string;
  messageType: string;
  parent: null;
  reaction: null;
  status: string;
  user: User2;
}

export interface GetRoomChatRes {
  avatar: string;
  chat_room_members: User2[];
  chats: GetMessagesRes[];
  createdAt: string;
  createdBy: string;
  created_by: string;
  lastCreatedAt: Date;
  lastUpdateAt: Date;
  description: string;
  id: string;
  lastMessage: string;
  slogan: string;
  status: string;
  title: string;
  type: string;
  updatedAt: string;
}

export interface GetNotificationRes {
  id: string;
  type: string;
  content: string;
  isRead: number;
  status: 1;
  chatRoomId: string;
  createdAt: Date;
  user: User2;
}

export interface GetUserConversationRes {
  chatRoomId: string;
  chat_room: GetRoomChatRes;
  chat_room_id: string;
  createdAt: Date;
  createdBy: string;
  created_by: string;
  id: string;
  isAdmin: 0;
  onNotification: any;
  status: string;
  updatedAt: Date;
  updatedBy: string;
  updated_by: string;
  user: User2;
  userId: string;
  user_id: string;
}

export interface GetAttachmentGroupRes {
  chat: GetMessagesRes;
  chatId: string;
  chat_id: string;
  contentType: string;
  createdAt: Date;
  createdBy: string;
  fileExtension: any;
  fileSize: any;
  guiId: string;
  id: string;
  name: string;
  path: string;
  status: string;
  type: string;
  updatedAt: Date;
  updatedBy: string;
  updated_by: string;
}

export interface GetLinkGroupRes {
  chatRoomId: string;
  chat_room_id: string;
  createdAt: Date;
  endTimeVideo: null;
  id: string;
  message: string;
  messageStatus: string;
  messageType: string;
  parentId: string;
  parent_id: string;
  reaction: string;
  startTimeVideo: string;
  status: string;
  statusVideoCall: string;
  timeVideoCall: string;
  updatedAt: Date;
  userId: string;
  user_id: string;
}
