import { User } from './user';
export interface IHyperMessage {
    _id: string | number;
    text: string;
    createdAt: Date | number;
    user: User;
    image?: string;
    video?: string;
    audio?: string;
    system?: boolean;
    sent?: boolean;
    received?: boolean;
    pending?: boolean;
    quickReplies?: QuickReplies;
    type: KindOfMsg;
    path?: string;
    reply?: string;
    fileExtension?: string;
    attachment: Attachment[];
    deleted: number;
    chatId: number;
}
export interface Attachment {
    contentType: string;
    createdAt: string;
    fileExtension: string;
    fileSize: number;
    id: string;
    path: string;
    status: string;
    type: string;
    typeRole: string;
    updatedAt: string;
}
export interface INewUserChat {
    userId: string;
    chatId: string;
    triggerId: string;
    isAdmin: boolean;
    typeChat: MessageTypes;
    position: number;
    lastMessengerId: string;
    notification: boolean;
}
interface Reply {
    title: string;
    value: string;
    messageId?: any;
}
interface QuickReplies {
    type: 'radio' | 'checkbox';
    values: Reply[];
    keepIt?: boolean;
}
export declare enum KindOfMsg {
    'TYPE_TEXT' = "TEXT",
    'TYPE_IMAGE' = "IMAGE",
    'TYPE_LINK' = "LINK",
    'TYPE_FILE' = "FILE",
    'TYPE_UNDEFINED' = "UNDEFINED",
    'STATUS_ORIGINAL' = "ORIGINAL",
    'STATUS_EDITED' = "EDITED",
    'STATUS_DELETED' = "DELETED",
    'STATUS_DISABLED' = "DISABLED",
    'TYPE_ROLE_PRIMARY' = "PRIMARY",
    'TYPE_ROLE_ATTACHED' = "ATTACHED",
    'TYPE_ROLE_NOTIFIED' = "NOTIFIED",
    'TYPE_VIDEO_CALL_INCOMING' = "TYPE_VIDEO_CALL_INCOMING",
    'TYPE_VIDEO_CALL_OUTGOING' = "TYPE_VIDEO_CALL_OUTGOING",
    'TYPE_VIDEO_CALL_ACCEPT' = "TYPE_VIDEO_CALL_ACCEPT",
    'TYPE_VIDEO_CALL_FINISH' = "TYPE_VIDEO_CALL_FINISH",
    'TYPE_VIDEO_CALL_DENY' = "TYPE_VIDEO_CALL_DENY"
}
export declare enum MessageTypes {
    CHAT_GROUP = "CHAT_GROUP",
    CHAT_USER = "CHAT_USER"
}
export {};
