import Sequelize, { DataTypes, Model, Optional } from 'sequelize';
import type { chat_rooms, chat_roomsId } from './chat_rooms';
import type { chats, chatsId } from './chats';
import type { users, usersId } from './users';

export interface notificationsAttributes {
  id: string;
  userId: string;
  chatId?: string;
  chatRoomId?: string;
  receiverId: string;
  content: string;
  status?: '0' | '1';
  type?: '0' | '1' | '2' | '3' | '4' | '5' | '6';
  isRead?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export type notificationsPk = "id";
export type notificationsId = notifications[notificationsPk];
export type notificationsCreationAttributes = Optional<notificationsAttributes, notificationsPk>;

export class notifications extends Model<notificationsAttributes, notificationsCreationAttributes> implements notificationsAttributes {
  id!: string;
  userId!: string;
  chatId?: string;
  chatRoomId?: string;
  receiverId!: string;
  content!: string;
  status?: '0' | '1';
  type?: '0' | '1' | '2' | '3' | '4' | '5' | '6';
  isRead?: number;
  createdAt?: Date;
  updatedAt?: Date;

  // notifications belongsTo chats via chat_id
  chat!: chats;
  getChat!: Sequelize.BelongsToGetAssociationMixin<chats>;
  setChat!: Sequelize.BelongsToSetAssociationMixin<chats, chatsId>;
  createChat!: Sequelize.BelongsToCreateAssociationMixin<chats>;
  // notifications belongsTo chat_rooms via chat_room_id
  chat_room!: chat_rooms;
  getChat_room!: Sequelize.BelongsToGetAssociationMixin<chat_rooms>;
  setChat_room!: Sequelize.BelongsToSetAssociationMixin<chat_rooms, chat_roomsId>;
  createChat_room!: Sequelize.BelongsToCreateAssociationMixin<chat_rooms>;
  // notifications belongsTo users via receiver_id
  receiver!: users;
  getReceiver!: Sequelize.BelongsToGetAssociationMixin<users>;
  setReceiver!: Sequelize.BelongsToSetAssociationMixin<users, usersId>;
  createReceiver!: Sequelize.BelongsToCreateAssociationMixin<users>;
  // notifications belongsTo users via user_id
  user!: users;
  getUser!: Sequelize.BelongsToGetAssociationMixin<users>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<users, usersId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<users>;

  static initModel(sequelize: Sequelize.Sequelize): typeof notifications {
    notifications.init({
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
      chatId: {
        field: 'chat_id',
        type: DataTypes.STRING(36),
        allowNull: true,
        // references: {
        //   model: 'chats',
        //   key: 'id'
        // }
      },
      chatRoomId: {
        field: 'chat_room_id',
        type: DataTypes.STRING(36),
        allowNull: true,
        // references: {
        //   model: 'chat_rooms',
        //   key: 'id'
        // }
      },
      receiverId: {
        field: 'receiver_id',
        type: DataTypes.STRING(36),
        allowNull: false,
        // references: {
        //   model: 'users',
        //   key: 'id'
        // }
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      status: {
        type: "ENUM('0','1')",
        allowNull: true
      },
      type: {
        type: "ENUM('0','1','2','3','4','5','6')",
        allowNull: true
      },
      isRead: {
        field: 'is_read',
        type: DataTypes.TINYINT,
        allowNull: true
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
      }
    }, {
      sequelize,
      tableName: 'notifications',
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
          name: "_type_chat_id_uc",
          unique: true,
          using: "BTREE",
          fields: [
            { name: "type" },
            { name: "chat_id" },
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
          name: "chat_id",
          using: "BTREE",
          fields: [
            { name: "chat_id" },
          ]
        },
        {
          name: "chat_room_id",
          using: "BTREE",
          fields: [
            { name: "chat_room_id" },
          ]
        },
        {
          name: "receiver_id",
          using: "BTREE",
          fields: [
            { name: "receiver_id" },
          ]
        },
        {
          name: "ix_notification_status",
          using: "BTREE",
          fields: [
            { name: "status" },
          ]
        },
      ]
    });
    return notifications;
  }
}
