import { chat_room_members } from '../db-export-default/chat_room_members'




export class ChatRoomMember extends chat_room_members {
    public static TABLE_NAME = "chat_room_members";
    public static JOIN_TABLE_NAME = "chat_room_members";
    public static STATUS_ACTIVE: '1' = '1';
    public static STATUS_CANCEL: '0' = '0';
    public static IS_ADMIN = 1;
    public static IS_NOT_ADMIN = 0;

    public static NOTIFICATION_ACTIVE: '1' = '1';
    public static NOTIFICATION_CANCEL: '0' = '0';

    public static FIELD_id = "id";
    public static FIELD_userId = "userId";
    public static FIELD_chatRoomId = "chatRoomId";
    public static FIELD_isAdmin = "isAdmin";
    public static FIELD_status = "status";
    public static FIELD_createdBy = "createdBy";
    public static FIELD_updatedBy = "updatedBy";
    public static FIELD_createdAt = "createdAt";
    public static FIELD_updatedAt = "updatedAt";
    public static FIELD_onNotification= "onNotification";

}