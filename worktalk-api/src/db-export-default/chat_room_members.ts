import Sequelize, { DataTypes, Model, Optional } from 'sequelize';
import type { chat_rooms, chat_roomsId } from './chat_rooms';
import type { users, usersId } from './users';

export interface chat_room_membersAttributes {
  id: string;
  userId: string;
  chatRoomId: string;
  isAdmin?: number;
  status?: '0' | '1';
  createdBy: string;
  updatedBy: string;
  createdAt?: Date;
  updatedAt?: Date;
  onNotification?: '0' | '1';
}

export type chat_room_membersPk = "id";
export type chat_room_membersId = chat_room_members[chat_room_membersPk];
export type chat_room_membersCreationAttributes = Optional<chat_room_membersAttributes, chat_room_membersPk>;

export class chat_room_members extends Model<chat_room_membersAttributes, chat_room_membersCreationAttributes> implements chat_room_membersAttributes {
  id!: string;
  userId!: string;
  chatRoomId!: string;
  isAdmin?: number;
  status?: '0' | '1';
  createdBy!: string;
  updatedBy!: string;
  createdAt?: Date;
  updatedAt?: Date;
  onNotification?: '0' | '1';

  // chat_room_members belongsTo chat_rooms via chat_room_id
  chat_room!: chat_rooms;
  getChat_room!: Sequelize.BelongsToGetAssociationMixin<chat_rooms>;
  setChat_room!: Sequelize.BelongsToSetAssociationMixin<chat_rooms, chat_roomsId>;
  createChat_room!: Sequelize.BelongsToCreateAssociationMixin<chat_rooms>;
  // chat_room_members belongsTo users via created_by
  created_by_user!: users;
  getCreated_by_user!: Sequelize.BelongsToGetAssociationMixin<users>;
  setCreated_by_user!: Sequelize.BelongsToSetAssociationMixin<users, usersId>;
  createCreated_by_user!: Sequelize.BelongsToCreateAssociationMixin<users>;
  // chat_room_members belongsTo users via updated_by
  updated_by_user!: users;
  getUpdated_by_user!: Sequelize.BelongsToGetAssociationMixin<users>;
  setUpdated_by_user!: Sequelize.BelongsToSetAssociationMixin<users, usersId>;
  createUpdated_by_user!: Sequelize.BelongsToCreateAssociationMixin<users>;
  // chat_room_members belongsTo users via user_id
  user!: users;
  getUser!: Sequelize.BelongsToGetAssociationMixin<users>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<users, usersId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<users>;

  static initModel(sequelize: Sequelize.Sequelize): typeof chat_room_members {
    chat_room_members.init({
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
      isAdmin: {
        field: 'is_admin',
        type: DataTypes.TINYINT,
        allowNull: true
      },
      status: {
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
      updatedBy: {
        field: 'updated_by',
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
      },
      onNotification: {
        field: 'on_notification',
        type: "ENUM('0','1')",
        allowNull: true
      }
    }, {
      sequelize,
      tableName: 'chat_room_members',
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
          name: "user_id",
          using: "BTREE",
          fields: [
            { name: "user_id" },
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
          name: "created_by",
          using: "BTREE",
          fields: [
            { name: "created_by" },
          ]
        },
        {
          name: "updated_by",
          using: "BTREE",
          fields: [
            { name: "updated_by" },
          ]
        },
        {
          name: "on_notification",
          using: "BTREE",
          fields: [
            { name: "on_notification" },
          ]
        },
        {
          name: "ix_chat_room_member_status",
          using: "BTREE",
          fields: [
            { name: "status" },
          ]
        },
      ]
    });
    return chat_room_members;
  }
}
