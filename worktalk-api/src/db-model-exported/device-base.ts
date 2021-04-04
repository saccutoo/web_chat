import { DataTypes, Model, Sequelize } from 'sequelize';

// export interface deviceAttributes {
//   id?: string;
//   user_id?: string;
//   brand?: string;
//   name?: string;
//   version?: string;
//   manufacturer?: string;
//   model?: string;
//   os_name?: string;
//   os_version?: string;
//   status?: any;
//   token?: string;
//   fcm_token?: string;
//   session_code?: string;
//   created_at?: Date;
//   updated_at?: Date;
// }

// export class device extends Model<deviceAttributes, deviceAttributes> implements deviceAttributes {
//   id?: string;
//   user_id?: string;
//   brand?: string;
//   name?: string;
//   version?: string;
//   manufacturer?: string;
//   model?: string;
//   os_name?: string;
//   os_version?: string;
//   status?: any;
//   token?: string;
//   fcm_token?: string;
//   session_code?: string;
//   created_at?: Date;
//   updated_at?: Date;

  export class device extends Model {

  static initModel(sequelize: Sequelize) {
    device.init({
    id: {
      field: 'id',
      type: DataTypes.STRING(36),
      allowNull: false,
      primaryKey: true
    },
    userId: {
      field : 'user_id',
      type: DataTypes.STRING(36),
      allowNull: true,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    brand: {
      field: 'brand',
      type: DataTypes.STRING(50),
      allowNull: true
    },
    name: {
      field: 'field',
      type: DataTypes.STRING(50),
      allowNull: true
    },
    version: {
      field: 'version',
      type: DataTypes.STRING(50),
      allowNull: true
    },
    manufacturer: {
      field: 'manufacturer',
      type: DataTypes.STRING(50),
      allowNull: true
    },
    model: {
      field: 'model',
      type: DataTypes.STRING(50),
      allowNull: true
    },
    osName: {
      field: 'os_name',
      type: DataTypes.STRING(50),
      allowNull: true
    },
    osVersion: {
      field: 'os_version',
      type: DataTypes.STRING(20),
      allowNull: true
    },
    status: {
      field: 'status',
      type: DataTypes.ENUM('0','1'),
      allowNull: true
    },
    token: {
      field: 'token',
      type: DataTypes.TEXT,
      allowNull: true
    },
    tokenFcm: {
      field: 'fcm_token',
      type: DataTypes.TEXT,
      allowNull: false
    },
    sessionCode: {
      field: 'session_code',
      type: DataTypes.STRING(255),
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
      field: 'update_at',
      type: DataTypes.DATE,
      allowNull: true,
      get() {
        return Date.parse(this.getDataValue("updatedAt"));
      },
    }
  }, {
    sequelize,
    tableName: 'device',
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
        name: "user_id",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
      {
        name: "ix_device_status",
        using: "BTREE",
        fields: [
          { name: "status" },
        ]
      },
    ]
  });
  return device;
  }
}
