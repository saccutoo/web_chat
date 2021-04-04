import Sequelize, { DataTypes, Model, Optional } from 'sequelize';
import type { chat_room_members, chat_room_membersId } from './chat_room_members';
import type { chats, chatsId } from './chats';
import type { notifications, notificationsId } from './notifications';
import type { users, usersId } from './users';

export interface chat_roomsAttributes {
  id: string;
  avatar?: string;
  title?: string;
  slogan?: string;
  description?: string;
  status?: '0' | '1';
  type?: '0' | '1';
  createdBy: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type chat_roomsPk = "id";
export type chat_roomsId = chat_rooms[chat_roomsPk];
export type chat_roomsCreationAttributes = Optional<chat_roomsAttributes, chat_roomsPk>;

export class chat_rooms extends Model<chat_roomsAttributes, chat_roomsCreationAttributes> implements chat_roomsAttributes {
  id!: string;
  avatar?: string;
  title?: string;
  slogan?: string;
  description?: string;
  status?: '0' | '1';
  type?: '0' | '1';
  createdBy!: string;
  createdAt?: Date;
  updatedAt?: Date;

  // chat_rooms hasMany chat_room_members via chat_room_id
  chat_room_members!: chat_room_members[];
  getChat_room_members!: Sequelize.HasManyGetAssociationsMixin<chat_room_members>;
  setChat_room_members!: Sequelize.HasManySetAssociationsMixin<chat_room_members, chat_room_membersId>;
  addChat_room_member!: Sequelize.HasManyAddAssociationMixin<chat_room_members, chat_room_membersId>;
  addChat_room_members!: Sequelize.HasManyAddAssociationsMixin<chat_room_members, chat_room_membersId>;
  createChat_room_member!: Sequelize.HasManyCreateAssociationMixin<chat_room_members>;
  removeChat_room_member!: Sequelize.HasManyRemoveAssociationMixin<chat_room_members, chat_room_membersId>;
  removeChat_room_members!: Sequelize.HasManyRemoveAssociationsMixin<chat_room_members, chat_room_membersId>;
  hasChat_room_member!: Sequelize.HasManyHasAssociationMixin<chat_room_members, chat_room_membersId>;
  hasChat_room_members!: Sequelize.HasManyHasAssociationsMixin<chat_room_members, chat_room_membersId>;
  countChat_room_members!: Sequelize.HasManyCountAssociationsMixin;
  // chat_rooms belongsTo users via created_by
  created_by_user!: users;
  getCreated_by_user!: Sequelize.BelongsToGetAssociationMixin<users>;
  setCreated_by_user!: Sequelize.BelongsToSetAssociationMixin<users, usersId>;
  createCreated_by_user!: Sequelize.BelongsToCreateAssociationMixin<users>;
  // chat_rooms hasMany chats via chat_room_id
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
  // chat_rooms hasMany notifications via chat_room_id
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

  static initModel(sequelize: Sequelize.Sequelize): typeof chat_rooms {
    chat_rooms.init({
      id: {
        type: DataTypes.STRING(36),
        allowNull: false,
        primaryKey: true
      },
      avatar: {
        type: DataTypes.STRING(255),
        allowNull: true
      },
      title: {
        type: DataTypes.STRING(255),
        allowNull: true
      },
      slogan: {
        type: DataTypes.STRING(255),
        allowNull: true
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      status: {
        type: "ENUM('0','1')",
        allowNull: true
      },
      type: {
        type: "ENUM('0','1')",
        allowNull: true
      },
      createdBy: {
        field: 'created_by',
        type: DataTypes.STRING(36),
        allowNull: false,
        // references: {
        //   model: 'users',
        //   key: 'id'
        // }
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
      tableName: 'chat_rooms',
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
          name: "created_by",
          using: "BTREE",
          fields: [
            { name: "created_by" },
          ]
        },
        {
          name: "ix_chat_room_status",
          using: "BTREE",
          fields: [
            { name: "status" },
          ]
        },
      ]
    });
    return chat_rooms;
  }
}
