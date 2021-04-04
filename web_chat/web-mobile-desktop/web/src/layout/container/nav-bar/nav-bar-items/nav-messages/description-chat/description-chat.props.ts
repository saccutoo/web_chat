export interface IDescriptionChatComp {
    descriptionChat: IDescriptionChat,
    activedDescriptionChat: any,
    onClick: any
}

export interface IDescriptionChat {
    id: string,
    avatar: string,
    title: string,
    slogan: string,
    description: string
    status: string,
    type: string,
    createdBy: string,
    createdAt: string,
    updated_at: string,
    lastMessage: string,
    chat_room_members: any,
    lastCreatedAt: string
}

interface IChat {
    message: string,
    messageType: string,
    messageStatus: string
    userId: string,
    createdAt: string,
    user: IUser
}

interface IUser {
    userName: string,
    avatar: string,
    status: string
}

export interface ISearchChatRoom {
    _id: string;
    _index: string;
    _score: string;
    _source: {
        avatar: string;
        id: string;
        status: string;
        title: string;
        userName: string;
    }

    _type: string;
}
