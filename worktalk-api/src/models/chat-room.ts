import { chat_rooms } from '../db-export-default/chat_rooms'
import { ChatRoomMember } from './chat-room-member';


    
export class ChatRoom extends chat_rooms {
    public static TABLE_NAME = "chat_rooms";
    public static TABLE_JOIN_NAME = "chat_room";

    public static STATUS_ACTIVE: '1' = '1';
    public static STATUS_CANCEL: '0' = '0';
    
    public static TYPE_GROUP = "1";
    public static TYPE_SINGLE = "0";

    public static FIELD_id = "id";
    public static FIELD_avatar = "avatar";
    public static FIELD_title = "title";
    public static FIELD_slogan = "slogan";
    public static FIELD_description = "description";
    public static FIELD_status = "status";
    public static FIELD_type = "type";
    public static FIELD_createdBy = "createdBy";
    public static FIELD_createdAt = "createdAt";
    public static FIELD_updatedAt = "updatedAt";
    public static FIELD_isOnline = "isOnline";

    chatRoomMemberList: ChatRoomMember[] = [];

}