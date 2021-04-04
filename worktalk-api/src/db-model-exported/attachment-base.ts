import { DataTypes, Model, Sequelize } from 'sequelize';
// export interface attachmentAttributes {
//   id?: string;
//   chat_id?: string;
//   file_size?: number;
//   content_type?: string;
//   file_extension?: string;
//   path?: string;
//   name?: string;
//   type?: any;
//   status?: any;
//   created_by?: string;
//   updated_by?: string;
//   created_at?: Date;
//   updated_at?: Date;
// }

// export class attachment extends Model<attachmentAttributes, attachmentAttributes> implements attachmentAttributes {
//   id?: string;
//   chat_id?: string;
//   file_size?: number;
//   content_type?: string;
//   file_extension?: string;
//   path?: string;
//   name?: string;
//   type?: any;
//   status?: any;
//   created_by?: string;
//   updated_by?: string;
//   created_at?: Date;
//   updated_at?: Date;

export class attachment extends Model{

  static initModel(sequelize: Sequelize) {
    attachment.init({
    id: {
      field: 'id',
      type: DataTypes.STRING(36),
      allowNull: false,
      primaryKey: true
    },
    chatId: {
      field: 'chat_id',
      type: DataTypes.STRING(36),
      allowNull: false,
      references: {
        model: 'chat',
        key: 'id'
      }
      
    },
    fileSize: {
      field: 'file_size',
      type: DataTypes.INTEGER,
      allowNull: true
    },
    contentType: {
      field : 'content_type',
      type: DataTypes.STRING(50),
      allowNull: true
    },
    fileExtension: {
      field: 'file_extension',
      type: DataTypes.STRING(10),
      allowNull: true
    },
    path: {
      field: 'path',
      type: DataTypes.STRING(255),
      allowNull: true
    },
    name: {
      field: 'name',
      type: DataTypes.STRING(255),
      allowNull: true
    },
    type: {
      field: 'type',
      type: DataTypes.ENUM('0','1','2','3'),
      allowNull: true
    },
    status: {
      field: 'status',
      type: DataTypes.ENUM('0','1'),
      allowNull: true
    },
    createdBy: {
      field: 'created_by',
      type: DataTypes.STRING(36),
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    updatedBy: {
      field: 'updated_by',
      type: DataTypes.STRING(36),
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      }
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
    tableName: 'attachment',
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
  return attachment;
  }
}
