import Sequelize, { DataTypes, Model, Optional } from 'sequelize';
import type { users, usersId } from './users';

export interface devicesAttributes {
  id: string;
  userId?: string;
  brand?: string;
  name?: string;
  version?: string;
  manufacturer?: string;
  model?: string;
  osName?: string;
  osVersion?: string;
  status?: '0' | '1';
  token?: string;
  fcmToken: string;
  sessionCode?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type devicesPk = "id";
export type devicesId = devices[devicesPk];
export type devicesCreationAttributes = Optional<devicesAttributes, devicesPk>;

export class devices extends Model<devicesAttributes, devicesCreationAttributes> implements devicesAttributes {
  id!: string;
  userId!: string;
  brand?: string;
  name?: string;
  version?: string;
  manufacturer?: string;
  model?: string;
  osName?: string;
  osVersion?: string;
  status?: '0' | '1';
  token?: string;
  fcmToken!: string;
  sessionCode?: string;
  createdAt?: Date;
  updatedAt?: Date;

  // devices belongsTo users via user_id
  user!: users;
  getUser!: Sequelize.BelongsToGetAssociationMixin<users>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<users, usersId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<users>;

  static initModel(sequelize: Sequelize.Sequelize): typeof devices {
    devices.init({
      id: {
        type: DataTypes.STRING(36),
        allowNull: false,
        primaryKey: true
      },
      userId: {
        field: 'user_id',
        type: DataTypes.STRING(36),
        allowNull: true,
        // references: {
        //   model: 'users',
        //   key: 'id'
        // }
      },
      brand: {
        type: DataTypes.STRING(50),
        allowNull: true
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: true
      },
      version: {
        type: DataTypes.STRING(50),
        allowNull: true
      },
      manufacturer: {
        type: DataTypes.STRING(50),
        allowNull: true
      },
      model: {
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
        type: "ENUM('0','1')",
        allowNull: true
      },
      token: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      fcmToken: {
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
        allowNull: true
      },
      updatedAt: {
        field: 'updated_at',
        type: DataTypes.DATE,
        allowNull: true
      }
    }, {
      sequelize,
      tableName: 'devices',
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
          name: "ix_device_status",
          using: "BTREE",
          fields: [
            { name: "status" },
          ]
        },
      ]
    });
    return devices;
  }
}
