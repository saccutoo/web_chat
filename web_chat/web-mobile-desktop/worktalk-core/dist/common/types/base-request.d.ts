export interface GetMessagesReq {
    chatId: string;
    pageParams?: PageParams;
}
export interface GetRoomChatReq {
    userId: string;
    pageParams?: PageParams;
}
export interface GetUserReq {
    value: string;
    pageParams?: PageParams;
}
export interface PageParams {
    page?: number;
    pageSize?: number;
}
