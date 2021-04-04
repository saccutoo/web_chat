import Sequelize, { DataTypes, Model, Optional } from 'sequelize';
import type { attachments, attachmentsId } from './attachments';
import type { chat_rooms, chat_roomsId } from './chat_rooms';
import type { notifications, notificationsId } from './notifications';
import type { users, usersId } from './users';

export interface chatsAttributes {
  id: string;
  userId: string;
  chatRoomId: string;
  parentId?: string;
  message?: string;
  messageType?: '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7';
  messageStatus?: '0' | '1' | '2' | '3' | '4' | '5';
  status?: '0' | '1';
  reaction?: string;
  createdAt?: Date;
  updatedAt?: Date;
  statusVideoCall?: '0' | '1' | '2' | '3' | '4';
  timeVideoCall?: Date;
  startTimeVideo?: Date;
  endTimeVideo?: Date;
}

export type chatsPk = "id";
export type chatsId = chats[chatsPk];
export type chatsCreationAttributes = Optional<chatsAttributes, chatsPk>;

export class chats extends Model<chatsAttributes, chatsCreationAttributes> implements chatsAttributes {
  id!: string;
  userId!: string;
  chatRoomId!: string;
  parentId?: string;
  message?: string;
  messageType?: '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7';
  messageStatus?: '0' | '1' | '2' | '3' | '4' | '5';
  status?: '0' | '1';
  reaction?: string;
  createdAt?: Date;
  updatedAt?: Date;
  statusVideoCall?: '0' | '1' | '2' | '3' | '4';
  timeVideoCall?: Date;
  startTimeVideo?: Date;
  endTimeVideo?: Date;
  // chats hasMany attachments via chat_id
  attachments!: attachments[];
  getAttachments!: Sequelize.HasManyGetAssociationsMixin<attachments>;
  setAttachments!: Sequelize.HasManySetAssociationsMixin<attachments, attachmentsId>;
  addAttachment!: Sequelize.HasManyAddAssociationMixin<attachments, attachmentsId>;
  addAttachments!: Sequelize.HasManyAddAssociationsMixin<attachments, attachmentsId>;
  createAttachment!: Sequelize.HasManyCreateAssociationMixin<attachments>;
  removeAttachment!: Sequelize.HasManyRemoveAssociationMixin<attachments, attachmentsId>;
  removeAttachments!: Sequelize.HasManyRemoveAssociationsMixin<attachments, attachmentsId>;
  hasAttachment!: Sequelize.HasManyHasAssociationMixin<attachments, attachmentsId>;
  hasAttachments!: Sequelize.HasManyHasAssociationsMixin<attachments, attachmentsId>;
  countAttachments!: Sequelize.HasManyCountAssociationsMixin;
  // chats belongsTo chat_rooms via chat_room_id
  chat_room!: chat_rooms;
  getChat_room!: Sequelize.BelongsToGetAssociationMixin<chat_rooms>;
  setChat_room!: Sequelize.BelongsToSetAssociationMixin<chat_rooms, chat_roomsId>;
  createChat_room!: Sequelize.BelongsToCreateAssociationMixin<chat_rooms>;
  // chats belongsTo chats via parent_id
  parent!: chats;
  getParent!: Sequelize.BelongsToGetAssociationMixin<chats>;
  setParent!: Sequelize.BelongsToSetAssociationMixin<chats, chatsId>;
  createParent!: Sequelize.BelongsToCreateAssociationMixin<chats>;
  // chats belongsTo users via user_id
  user!: users;
  getUser!: Sequelize.BelongsToGetAssociationMixin<users>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<users, usersId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<users>;
  // chats hasMany notifications via chat_id
  notifications!: notifications[];
  getNotifications!: Sequelize.HasManyGetAssociationsMixin<notifications>;
  setNotifications!: Sequelize.HasManySetAssociationsMixin<notifications, notificationsId>;
  addNotification!: Sequelize.HasManyAddAssociationMixin<notifications, notificationsId>;
  addNotifications!: Sequelize.HasManyAddAssociationsMixin<notifications, notificationsId>;
  createNotification!: Sequelize.HasManyCreateAssociationMixin<notifications>;
  removeNotification!: Sequelize.HasManyRemoveAssociationMixin<notifications, notificationsId>;
  removeNotifications!: Sequelize.HasManyRemoveAssociationsMixin<notifications, notificationsId>;
  hasNotification!: Sequelize.HasManyHasAssociationMixin<notifications, notificationsId>;
  hasNotifications!: Sequelize.HasManyHasAssociationsMixin<notifications, notificationsId>;
  countNotifications!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof chats {
    chats.init({
      id: {
        type: DataTypes.STRING(36),
        allowNull: false,
        primaryKey: true
      },
      userId: {
        field: 'user_id',
        type: DataTypes.STRING(36),
        allowNull: false,
        // references: {
        //   model: 'users',
        //   key: 'id'
        // }
      },
      chatRoomId: {
        field: 'chat_room_id',
        type: DataTypes.STRING(36),
        allowNull: false,
        // references: {
        //   model: 'chat_rooms',
        //   key: 'id'
        // }
      },
      parentId: {
        field: 'parent_id',
        type: DataTypes.STRING(36),
        allowNull: true,
        // references: {
        //   model: 'chats',
        //   key: 'id'
        // }
      },
      message: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      messageType: {
        field: 'message_type',
        type: "ENUM('0','1','2','3','4','5','6')",
        allowNull: true
      },
      messageStatus: {
        field: 'message_status',
        type: "ENUM('0','1','2')",
        allowNull: true
      },
      status: {
        type: "ENUM('0','1')",
        allowNull: true
      },
      reaction: {
        field: 'reaction',
        type: DataTypes.STRING(255),
      },
      createdAt: {
        field: 'created_at',
        type: DataTypes.DATE,
        allowNull: true
      },
      updatedAt: {
        field: 'updated_at',
        type: DataTypes.DATE,
        allowNull: true
      },
      statusVideoCall: {
        field: 'status_video_call',
        type: "ENUM('0','1','2','3','4')",
        allowNull: true
      },
      timeVideoCall: {
        field: 'time_video_call',
        type: DataTypes.DATE,
        allowNull: true
      },
      startTimeVideo: {
        field: 'start_time_video',
        type: DataTypes.DATE,
        allowNull: true
      },
      endTimeVideo: {
        field: 'end_time_video',
        type: DataTypes.DATE,
        allowNull: true
      },
    }, {
      sequelize,
      tableName: 'chats',
      timestamps: true,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [
            { name: "id" },
          ]
        },
        {
          name: "_chat_room_id_created_at_uc",
          using: "BTREE",
          fields: [
            { name: "chat_room_id" },
            { name: "created_at" },
          ]
        },
        {
          name: "user_id",
          using: "BTREE",
          fields: [
            { name: "user_id" },
          ]
        },
        {
          name: "ix_chat_status",
          using: "BTREE",
          fields: [
            { name: "status" },
          ]
        },
        {
          name: "chat_ibfk_3_idx",
          using: "BTREE",
          fields: [
            { name: "parent_id" },
          ]
        },
      ]
    });
    return chats;
  }
}
