import { chats } from "../db-export-default/chats";

export class Chat extends chats {
    public static TABLE_NAME = "chats";
    public static JOIN_TABLE_NAME = "chat";
    public static STATUS_ACTIVE = "1";
    public static FIELD_attachments = "attachments";
    public static PARENT = "parent";

    public static FIELD_id = "id";
    public static FIELD_userId = "userId";
    public static FIELD_chatRoomId = "chatRoomId";
    public static FIELD_parentId = "parentId";
    public static FIELD_message = "message";
    public static FIELD_messageType = "messageType";
    public static FIELD_messageStatus = "messageStatus";
    public static FIELD_status = "status";
    public static FIELD_reaction = "reaction";
    public static FIELD_statusVideoCall = "statusVideoCall";
    public static FIELD_timeVideoCall = "timeVideoCall";
    public static FIELD_startTimeVideo = "startTimeVideo";
    public static FIELD_endTimeVideo = "endTimeVideo";
    public static FIELD_createdBy = "createdBy";
    public static FIELD_updatedBy = "updatedBy";
    public static FIELD_createdAt = "createdAt";
    public static FIELD_updatedAt = "updatedAt";

}
