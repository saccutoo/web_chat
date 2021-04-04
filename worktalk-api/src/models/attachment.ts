import { attachments } from '../db-export-default/attachments';

export class Attachment extends attachments {
    public static TABLE_NAME = "attachments";
    public static STATUS_CANCEL = 1;

    public static FIELD_id = "id";
    public static FIELD_chatId = "chatId";
    public static FIELD_fileSize = "fileSize";
    public static FIELD_contentType = "contentType";
    public static FIELD_fileExtension = "fileExtension";
    public static FIELD_path = "path";
    public static FIELD_name = "name";
    public static FIELD_type = "type";
    public static FIELD_status = "status";
    public static FIELD_createdBy = "createdBy";
    public static FIELD_updatedBy = "updatedBy";
    public static FIELD_createdAt = "createdAt";
    public static FIELD_updatedAt = "updatedAt";
    public static FIELD_guiId = "guiId";

}
