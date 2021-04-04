import Sequelize, { DataTypes, Model, Optional } from 'sequelize';
import type { chats, chatsId } from './chats';
import type { users, usersId } from './users';

//hungdm - update type 0,1,2,3 -> 0,1,2,3,4,5,6,7
export interface attachmentsAttributes {
  id?: string;
  chatId?: string;
  fileSize?: number;
  contentType?: string;
  fileExtension?: string;
  path?: string;
  name?: string;
  type?: '0' | '1' | '2' | '3' | '4' | '5' | '6'| '7';
  status?: '0' | '1';
  createdBy?: string;
  updatedBy?: string;
  createdAt?: Date;
  updatedAt?: Date;
  guiId?: string;
}

export type attachmentsPk = "id";
export type attachmentsId = attachments[attachmentsPk];
export type attachmentsCreationAttributes = Optional<attachmentsAttributes, attachmentsPk>;

export class attachments extends Model<attachmentsAttributes, attachmentsCreationAttributes> implements attachmentsAttributes {

  id!: string;
  chatId!: string;
  fileSize?: number;
  contentType?: string;
  fileExtension?: string;
  path?: string;
  name?: string;
  type?: '0' | '1' | '2' | '3' | '4' | '5' | '6'| '7';
  status?: '0' | '1';
  createdBy!: string;
  updatedBy!: string;
  createdAt?: Date;
  updatedAt?: Date;
  guiId!: string;


  // attachments belongsTo chats via chat_id
  chat!: chats;
  getChat!: Sequelize.BelongsToGetAssociationMixin<chats>;
  setChat!: Sequelize.BelongsToSetAssociationMixin<chats, chatsId>;
  createChat!: Sequelize.BelongsToCreateAssociationMixin<chats>;
  // attachments belongsTo users via updated_by
  updated_by_user!: users;
  getUpdated_by_user!: Sequelize.BelongsToGetAssociationMixin<users>;
  setUpdated_by_user!: Sequelize.BelongsToSetAssociationMixin<users, usersId>;
  createUpdated_by_user!: Sequelize.BelongsToCreateAssociationMixin<users>;

  static initModel(sequelize: Sequelize.Sequelize): typeof attachments {
    attachments.init({
      id: {
        type: DataTypes.STRING(36),
        allowNull: false,
        primaryKey: true
      },
      chatId: {
        field: 'chat_id',
        type: DataTypes.STRING(36),
        allowNull: false,
        // references: {
        //   model: 'chats',
        //   key: 'id'
        // }
      },
      fileSize: {
        field: 'file_size',
        type: DataTypes.INTEGER,
        allowNull: true
      },
      contentType: {
        field: 'content_type',
        type: DataTypes.STRING(50),
        allowNull: true
      },
      fileExtension: {
        field: 'file_extension',
        type: DataTypes.STRING(10),
        allowNull: true
      },
      path: {
        type: DataTypes.STRING(255),
        allowNull: true
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: true
      },
      type: {
        type: "ENUM('0', '1', '2', '3', '4', '5', '6', '7')",
        allowNull: true
      },
      status: {
        type: "ENUM('0','1')",
        allowNull: true
      },
      createdBy: {
        field: 'created_by',
        type: DataTypes.STRING(36),
        allowNull: false
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
      guiId: {
        field: 'gui_id',
        type: DataTypes.STRING(100),
        allowNull: true,
      }
    }, {
      sequelize,
      tableName: 'attachments',
      timestamps: false,
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
          name: "chat_id",
          using: "BTREE",
          fields: [
            { name: "chat_id" },
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
          name: "ix_attachment_status",
          using: "BTREE",
          fields: [
            { name: "status" },
          ]
        },
      ]
    });
    return attachments;
  }
}
