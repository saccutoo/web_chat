export interface GetMessagesReq {
  chatId: string;
  pageParams?: PageParams;
}

export interface GetRoomChatReq {
  userId: string,
  pageParams?: PageParams;
}

export interface GetUserReq{
  value: string,
  pageParams?: PageParams
}
export interface PageParams {
  page?: number;
  pageSize?: number;
}

export interface GetNotificationReq{
  userId: string,
  pageParams?: PageParams
}

export interface GetUserConversationReq{
  chatRoomId: string,
  userId?:string,
  pageParams?: PageParams
}

export interface GetAttachmentGroupReq{
  chatRoomId: string,
  typeAttachment: number,
  pageParams?: PageParams
}

export interface GetLinkGroupReq{
  chatRoomId: string,
  pageParams?: PageParams
}

export interface AddMemberReq{
  id: string,
  chatRoomMemberList: string[]
}