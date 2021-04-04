
export interface IRespondedMess {
    messageId: string;
    type: number,
    context: string,
    userName: string
}

export interface IEditedMess {
    messageId: string;
    type: number,
    context: string,
}

export interface IConversation {
    id: string,
    title: string,
    status: string,
    avatar: string,
    type: string,
    chats: IChat[],
}

export interface IRoomDetail {
    id: string,
    title: string,
    status: string,
    avatar: string
}

export interface IChat {
    message: string,
    messageType: string,
    messageStatus: string
    userId: string,
    user: IUser,
    chatRoomId?: string,
    attachments?: IAttachment[],
    createdAt: any,
    parentId?: string,
    statusVideoCall?: string,
    timeVideoCall?: any,
    startTimeVideo?: any,
    endTimeVideo?: any
}

interface IUser {
    userName: string,
    status: string,
    id?: string,
    avatar?: string,
}

export interface IAttachment {
    contentType: string,
    name: string,
    type: string,
    fileSize?: number,
    guiId: string,
    isUploading?: boolean
}


export interface ISearchMessage {
    _id: string
    _index: string
    _score: number
    _source: {
        id: string,
        message: string,
        chatRoomId: string,
        userId: string
    }
    _type: string
}
