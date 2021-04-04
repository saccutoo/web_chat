import { devices } from "../db-export-default/devices";

export class Device extends devices {
    public static TABLE_NAME = "devices";

    public static FIELD_id = "id";
    public static FIELD_chatId = "chatId";
    public static FIELD_userId = "userId";
    public static FIELD_brand = "brand";
    public static FIELD_version = "version";
    public static FIELD_manufacturer = "manufacturer";
    public static FIELD_model = "model";
    public static FIELD_osName = "osName";
    public static FIELD_osVersion = "osVersion";
    public static FIELD_status = "status";
    public static FIELD_token = "token";
    public static FIELD_fcmToken = "fcmToken";
    public static FIELD_sessionCode = "sessionCode";
    public static FIELD_createdAt = "createdAt";
    public static FIELD_updatedAt = "updatedAt";

}
