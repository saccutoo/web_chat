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
    createdAt: string;
    createdBy: string;
    created_by: string;
    description: string;
    id: string;
    lastMessage: string;
    slogan: string;
    status: string;
    title: string;
    type: string;
    updatedAt: string;
}
