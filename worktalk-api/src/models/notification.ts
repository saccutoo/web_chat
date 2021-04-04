import { notifications } from "../db-export-default/notifications";

export class Notification extends notifications {
    public static TABLE_NAME = "notifications";
    public static STATUS_ACTIVE = "1";
    public static IS_READ_ACTIVE = 1;
    public static IS_READ_NOT_ACTIVE = 0;

    public static FIELD_id = "id";
    public static FIELD_chatId = "chatId";
    public static FIELD_brand = "brand";
    public static FIELD_version = "version";
    public static FIELD_manufacturer = "manufacturer";
    public static FIELD_model = "mode";
    public static FIELD_osName = "osName";
    public static FIELD_osVersion = "osVersion";
    public static FIELD_createdAt = "createdAt";
    public static FIELD_updatedAt = "updatedAt";
    public static FIELD_userId = "userId";
    public static FIELD_chatRoomId = "chatRoomId";
    public static FIELD_type = "type";
    public static FIELD_content = "content";
    public static FIELD_isRead = "isRead";
    public static FIELD_status = "status";
    public static FIELD_receiverId = "receiverId";

}
