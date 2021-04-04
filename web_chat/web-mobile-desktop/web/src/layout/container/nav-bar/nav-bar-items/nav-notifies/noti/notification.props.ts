export interface INotification {
    id: string,
    userId: string,
    chatId: string,
    chatRoomId: string,
    receiverId: string,
    content?: string,
    type: string,
    isRead: boolean,
    createdAt: string,
    user: {
        avatar: string,
        id: string,
        lastLogin: string,
        status: string,
        userName: string
    },
    onClick: any

}
