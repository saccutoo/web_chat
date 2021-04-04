import Sequelize, { DataTypes, Model, Optional } from "sequelize";
import type { attachments, attachmentsId } from "./attachments";
import type {
  chat_room_members,
  chat_room_membersId,
} from "./chat_room_members";
import type { chat_rooms, chat_roomsId } from "./chat_rooms";
import type { chats, chatsId } from "./chats";
import type { devices, devicesId } from "./devices";
import type { notifications, notificationsId } from "./notifications";

export interface usersAttributes {
  id: string;
  userName: string;
  email: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  salt?: string;
  gender?: "0" | "1" | "2";
  status?: "0" | "1";
  isOnline?: "0" | "1";
  isAdmin?: number;
  lastLogin?: Date;
  orgId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type usersPk = "id";
export type usersId = users[usersPk];
export type usersCreationAttributes = Optional<usersAttributes, usersPk>;

export class users
  extends Model<usersAttributes, usersCreationAttributes>
  implements usersAttributes {
  id!: string;
  userName!: string;
  email!: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  salt?: string;
  gender?: "0" | "1" | "2";
  status?: "0" | "1";
  isOnline?: "0" | "1";
  isAdmin?: number;
  lastLogin?: Date;
  orgId?: string;
  createdAt?: Date;
  updatedAt?: Date;

  // users hasMany attachments via updated_by
  attachments!: attachments[];
  getAttachments!: Sequelize.HasManyGetAssociationsMixin<attachments>;
  setAttachments!: Sequelize.HasManySetAssociationsMixin<
    attachments,
    attachmentsId
  >;
  addAttachment!: Sequelize.HasManyAddAssociationMixin<
    attachments,
    attachmentsId
  >;
  addAttachments!: Sequelize.HasManyAddAssociationsMixin<
    attachments,
    attachmentsId
  >;
  createAttachment!: Sequelize.HasManyCreateAssociationMixin<attachments>;
  removeAttachment!: Sequelize.HasManyRemoveAssociationMixin<
    attachments,
    attachmentsId
  >;
  removeAttachments!: Sequelize.HasManyRemoveAssociationsMixin<
    attachments,
    attachmentsId
  >;
  hasAttachment!: Sequelize.HasManyHasAssociationMixin<
    attachments,
    attachmentsId
  >;
  hasAttachments!: Sequelize.HasManyHasAssociationsMixin<
    attachments,
    attachmentsId
  >;
  countAttachments!: Sequelize.HasManyCountAssociationsMixin;
  // users hasMany chat_room_members via created_by
  chat_room_members!: chat_room_members[];
  getChat_room_members!: Sequelize.HasManyGetAssociationsMixin<chat_room_members>;
  setChat_room_members!: Sequelize.HasManySetAssociationsMixin<
    chat_room_members,
    chat_room_membersId
  >;
  addChat_room_member!: Sequelize.HasManyAddAssociationMixin<
    chat_room_members,
    chat_room_membersId
  >;
  addChat_room_members!: Sequelize.HasManyAddAssociationsMixin<
    chat_room_members,
    chat_room_membersId
  >;
  createChat_room_member!: Sequelize.HasManyCreateAssociationMixin<chat_room_members>;
  removeChat_room_member!: Sequelize.HasManyRemoveAssociationMixin<
    chat_room_members,
    chat_room_membersId
  >;
  removeChat_room_members!: Sequelize.HasManyRemoveAssociationsMixin<
    chat_room_members,
    chat_room_membersId
  >;
  hasChat_room_member!: Sequelize.HasManyHasAssociationMixin<
    chat_room_members,
    chat_room_membersId
  >;
  hasChat_room_members!: Sequelize.HasManyHasAssociationsMixin<
    chat_room_members,
    chat_room_membersId
  >;
  countChat_room_members!: Sequelize.HasManyCountAssociationsMixin;
  // users hasMany chat_room_members via updated_by
  updated_by_chat_room_members!: chat_room_members[];
  getUpdated_by_chat_room_members!: Sequelize.HasManyGetAssociationsMixin<chat_room_members>;
  setUpdated_by_chat_room_members!: Sequelize.HasManySetAssociationsMixin<
    chat_room_members,
    chat_room_membersId
  >;
  addUpdated_by_chat_room_member!: Sequelize.HasManyAddAssociationMixin<
    chat_room_members,
    chat_room_membersId
  >;
  addUpdated_by_chat_room_members!: Sequelize.HasManyAddAssociationsMixin<
    chat_room_members,
    chat_room_membersId
  >;
  createUpdated_by_chat_room_member!: Sequelize.HasManyCreateAssociationMixin<chat_room_members>;
  removeUpdated_by_chat_room_member!: Sequelize.HasManyRemoveAssociationMixin<
    chat_room_members,
    chat_room_membersId
  >;
  removeUpdated_by_chat_room_members!: Sequelize.HasManyRemoveAssociationsMixin<
    chat_room_members,
    chat_room_membersId
  >;
  hasUpdated_by_chat_room_member!: Sequelize.HasManyHasAssociationMixin<
    chat_room_members,
    chat_room_membersId
  >;
  hasUpdated_by_chat_room_members!: Sequelize.HasManyHasAssociationsMixin<
    chat_room_members,
    chat_room_membersId
  >;
  countUpdated_by_chat_room_members!: Sequelize.HasManyCountAssociationsMixin;
  // users hasMany chat_room_members via user_id
  user_chat_room_members!: chat_room_members[];
  getUser_chat_room_members!: Sequelize.HasManyGetAssociationsMixin<chat_room_members>;
  setUser_chat_room_members!: Sequelize.HasManySetAssociationsMixin<
    chat_room_members,
    chat_room_membersId
  >;
  addUser_chat_room_member!: Sequelize.HasManyAddAssociationMixin<
    chat_room_members,
    chat_room_membersId
  >;
  addUser_chat_room_members!: Sequelize.HasManyAddAssociationsMixin<
    chat_room_members,
    chat_room_membersId
  >;
  createUser_chat_room_member!: Sequelize.HasManyCreateAssociationMixin<chat_room_members>;
  removeUser_chat_room_member!: Sequelize.HasManyRemoveAssociationMixin<
    chat_room_members,
    chat_room_membersId
  >;
  removeUser_chat_room_members!: Sequelize.HasManyRemoveAssociationsMixin<
    chat_room_members,
    chat_room_membersId
  >;
  hasUser_chat_room_member!: Sequelize.HasManyHasAssociationMixin<
    chat_room_members,
    chat_room_membersId
  >;
  hasUser_chat_room_members!: Sequelize.HasManyHasAssociationsMixin<
    chat_room_members,
    chat_room_membersId
  >;
  countUser_chat_room_members!: Sequelize.HasManyCountAssociationsMixin;
  // users hasMany chat_rooms via created_by
  chat_rooms!: chat_rooms[];
  getChat_rooms!: Sequelize.HasManyGetAssociationsMixin<chat_rooms>;
  setChat_rooms!: Sequelize.HasManySetAssociationsMixin<
    chat_rooms,
    chat_roomsId
  >;
  addChat_room!: Sequelize.HasManyAddAssociationMixin<chat_rooms, chat_roomsId>;
  addChat_rooms!: Sequelize.HasManyAddAssociationsMixin<
    chat_rooms,
    chat_roomsId
  >;
  createChat_room!: Sequelize.HasManyCreateAssociationMixin<chat_rooms>;
  removeChat_room!: Sequelize.HasManyRemoveAssociationMixin<
    chat_rooms,
    chat_roomsId
  >;
  removeChat_rooms!: Sequelize.HasManyRemoveAssociationsMixin<
    chat_rooms,
    chat_roomsId
  >;
  hasChat_room!: Sequelize.HasManyHasAssociationMixin<chat_rooms, chat_roomsId>;
  hasChat_rooms!: Sequelize.HasManyHasAssociationsMixin<
    chat_rooms,
    chat_roomsId
  >;
  countChat_rooms!: Sequelize.HasManyCountAssociationsMixin;
  // users hasMany chats via user_id
  chats!: chats[];
  getChats!: Sequelize.HasManyGetAssociationsMixin<chats>;
  setChats!: Sequelize.HasManySetAssociationsMixin<chats, chatsId>;
  addChat!: Sequelize.HasManyAddAssociationMixin<chats, chatsId>;
  addChats!: Sequelize.HasManyAddAssociationsMixin<chats, chatsId>;
  createChat!: Sequelize.HasManyCreateAssociationMixin<chats>;
  removeChat!: Sequelize.HasManyRemoveAssociationMixin<chats, chatsId>;
  removeChats!: Sequelize.HasManyRemoveAssociationsMixin<chats, chatsId>;
  hasChat!: Sequelize.HasManyHasAssociationMixin<chats, chatsId>;
  hasChats!: Sequelize.HasManyHasAssociationsMixin<chats, chatsId>;
  countChats!: Sequelize.HasManyCountAssociationsMixin;
  // users hasMany devices via user_id
  devices!: devices[];
  getDevices!: Sequelize.HasManyGetAssociationsMixin<devices>;
  setDevices!: Sequelize.HasManySetAssociationsMixin<devices, devicesId>;
  addDevice!: Sequelize.HasManyAddAssociationMixin<devices, devicesId>;
  addDevices!: Sequelize.HasManyAddAssociationsMixin<devices, devicesId>;
  createDevice!: Sequelize.HasManyCreateAssociationMixin<devices>;
  removeDevice!: Sequelize.HasManyRemoveAssociationMixin<devices, devicesId>;
  removeDevices!: Sequelize.HasManyRemoveAssociationsMixin<devices, devicesId>;
  hasDevice!: Sequelize.HasManyHasAssociationMixin<devices, devicesId>;
  hasDevices!: Sequelize.HasManyHasAssociationsMixin<devices, devicesId>;
  countDevices!: Sequelize.HasManyCountAssociationsMixin;
  // users hasMany notifications via receiver_id
  notifications!: notifications[];
  getNotifications!: Sequelize.HasManyGetAssociationsMixin<notifications>;
  setNotifications!: Sequelize.HasManySetAssociationsMixin<
    notifications,
    notificationsId
  >;
  addNotification!: Sequelize.HasManyAddAssociationMixin<
    notifications,
    notificationsId
  >;
  addNotifications!: Sequelize.HasManyAddAssociationsMixin<
    notifications,
    notificationsId
  >;
  createNotification!: Sequelize.HasManyCreateAssociationMixin<notifications>;
  removeNotification!: Sequelize.HasManyRemoveAssociationMixin<
    notifications,
    notificationsId
  >;
  removeNotifications!: Sequelize.HasManyRemoveAssociationsMixin<
    notifications,
    notificationsId
  >;
  hasNotification!: Sequelize.HasManyHasAssociationMixin<
    notifications,
    notificationsId
  >;
  hasNotifications!: Sequelize.HasManyHasAssociationsMixin<
    notifications,
    notificationsId
  >;
  countNotifications!: Sequelize.HasManyCountAssociationsMixin;
  // users hasMany notifications via user_id
  user_notifications!: notifications[];
  getUser_notifications!: Sequelize.HasManyGetAssociationsMixin<notifications>;
  setUser_notifications!: Sequelize.HasManySetAssociationsMixin<
    notifications,
    notificationsId
  >;
  addUser_notification!: Sequelize.HasManyAddAssociationMixin<
    notifications,
    notificationsId
  >;
  addUser_notifications!: Sequelize.HasManyAddAssociationsMixin<
    notifications,
    notificationsId
  >;
  createUser_notification!: Sequelize.HasManyCreateAssociationMixin<notifications>;
  removeUser_notification!: Sequelize.HasManyRemoveAssociationMixin<
    notifications,
    notificationsId
  >;
  removeUser_notifications!: Sequelize.HasManyRemoveAssociationsMixin<
    notifications,
    notificationsId
  >;
  hasUser_notification!: Sequelize.HasManyHasAssociationMixin<
    notifications,
    notificationsId
  >;
  hasUser_notifications!: Sequelize.HasManyHasAssociationsMixin<
    notifications,
    notificationsId
  >;
  countUser_notifications!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof users {
    users.init(
      {
        id: {
          type: DataTypes.STRING(36),
          allowNull: false,
          primaryKey: true,
        },
        userName: {
          field: "user_name",
          type: DataTypes.STRING(50),
          allowNull: false,
          unique: "user_name",
        },
        email: {
          type: DataTypes.STRING(255),
          allowNull: true,
          // unique: "email",
        },
        password: {
          type: DataTypes.STRING(50),
          allowNull: true,
        },
        firstName: {
          field: "first_name",
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        lastName: {
          field: "last_name",
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        avatar: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        salt: {
          type: DataTypes.STRING(50),
          allowNull: true,
        },
        gender: {
          type: "ENUM('0','1','2')",
          allowNull: true,
        },
        status: {
          type: "ENUM('0','1')",
          allowNull: true,
        },
        isOnline: {
          field: "is_online",
          type: "ENUM('0','1')",
          allowNull: true,
        },
        isAdmin: {
          field: "is_admin",
          type: DataTypes.TINYINT,
          allowNull: true,
        },
        lastLogin: {
          field: "last_login",
          type: DataTypes.DATE,
          allowNull: true,
        },
        orgId: {
          field: "orgId",
          type: DataTypes.STRING(36),
          allowNull: true,
        },
        createdAt: {
          field: "created_at",
          type: DataTypes.DATE,
          allowNull: true,
        },
        updatedAt: {
          field: "updated_at",
          type: DataTypes.DATE,
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: "users",
        timestamps: true,
        indexes: [
          {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [{ name: "id" }],
          },
          {
            name: "user_name",
            unique: true,
            using: "BTREE",
            fields: [{ name: "user_name" }],
          },
          {
            name: "email",
            unique: true,
            using: "BTREE",
            fields: [{ name: "email" }],
          },
          {
            name: "ix_user_status",
            using: "BTREE",
            fields: [{ name: "status" }],
          },
          {
            name: "ix_user_is_online",
            using: "BTREE",
            fields: [{ name: "is_online" }],
          },
        ],
      }
    );
    return users;
  }
}
