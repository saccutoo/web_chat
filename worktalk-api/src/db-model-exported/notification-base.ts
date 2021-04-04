import { DataTypes, Model, Sequelize } from 'sequelize';

// export interface notificationAttributes {
//   id?: string;
//   user_id?: string;
//   chat_id?: string;
//   chat_room_id?: string;
//   receiver_id?: string;
//   content?: string;
//   status?: any;
//   type?: any;
//   is_read?: number;
//   created_at?: Date;
//   updated_at?: Date;
// }

// export class notification extends Model<notificationAttributes, notificationAttributes> implements notificationAttributes {
//   id?: string;
//   user_id?: string;
//   chat_id?: string;
//   chat_room_id?: string;
//   receiver_id?: string;
//   content?: string;
//   status?: any;
//   type?: any;
//   is_read?: number;
//   created_at?: Date;
//   updated_at?: Date;

export class notification extends Model {

  static initModel(sequelize: Sequelize) {
    notification.init({
    id: {
      field: 'id',
      type: DataTypes.STRING(36),
      allowNull: false,
      primaryKey: true
    },
    userId: {
      field: 'user_id',
      type: DataTypes.STRING(36),
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    chatId: {
      field: 'chat_id',
      type: DataTypes.STRING(36),
      allowNull: true,
      references: {
        model: 'chat',
        key: 'id'
      }
    },
    chatRoomId: {
      field: 'chat_room_id',
      type: DataTypes.STRING(36),
      allowNull: true,
      references: {
        model: 'chat_room',
        key: 'id'
      }
    },
    receiverId: {
      field: 'receiver_id',
      type: DataTypes.STRING(36),
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    content: {
      field: 'content',
      type: DataTypes.TEXT,
      allowNull: false
    },
    status: {
      field: 'status',
      type: DataTypes.ENUM('0','1'),
      allowNull: true
    },
    type: {
      field: 'type',
      type: DataTypes.ENUM('0','1','2','3','4','5','6'),
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
      allowNull: true,
      get() {
        return Date.parse(this.getDataValue("createdAt"));
      },
    },
    updatedAt: {
      field: 'updated_at',
      type: DataTypes.DATE,
      allowNull: true,
      get() {
        return Date.parse(this.getDataValue("updatedAt"));
      },
    }
  }, {
    sequelize,
    tableName: 'notification',
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
  return notification;
  }
}
