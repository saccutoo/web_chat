import { users } from "../db-export-default/users";

export class User extends users {
  public static TABLE_NAME = "users";
  public static JOIN_CHAT_NAME = "user";
  // public static STATUS_CANCEL = 1;
  userName!: string;
  email!: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  salt?: string;
  gender?: '0' | '1' | '2';
  status?: '0' | '1';
  isOnline?: '0' | '1';
  isAdmin?: number;
  lastLogin?: Date;
  createdAt?: Date;
  updatedAt?: Date;

  public static online = '1';
  public static offline = '0';

  public static FIELD_id = "id";
  public static FIELD_orgId = "orgId";
  public static FIELD_userName = "userName";
  public static FIELD_email = "email";
  public static FIELD_password = "password";
  public static FIELD_firstName = "firstName";
  public static FIELD_lastName = "lastName";
  public static FIELD_avatar = "avatar";
  public static FIELD_salt = "salt";
  public static FIELD_gender = "gender";
  public static FIELD_status = "status";
  public static FIELD_isOnline = "isOnline";
  public static FIELD_isAdmin = "isAdmin";
  public static FIELD_lastLogin = "lastLogin";
  public static FIELD_createdBy = "createdBy";
  public static FIELD_updatedBy = "updatedBy";
  public static FIELD_createdAt = "createdAt";
  public static FIELD_updatedAt = "updatedAt";

}
