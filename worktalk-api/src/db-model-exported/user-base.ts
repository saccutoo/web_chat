import { DataTypes, Model, Sequelize } from "sequelize";

export class user extends Model {
  static initModel(sequelize: Sequelize) {
    user.init(
      {
        id: {
          field: "id",
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
          field: "email",
          type: DataTypes.STRING(255),
          allowNull: false,
          unique: "email",
        },
        password: {
          field: "password",
          type: DataTypes.STRING(50),
        },
        firstName: {
          field: "first_name",
          type: DataTypes.STRING(255),
        },
        lastName: {
          field: "last_name",
          type: DataTypes.STRING(255),
        },
        avatar: {
          field: "avatar",
          type: DataTypes.STRING(255),
        },
        salt: {
          field: "salt",
          type: DataTypes.STRING(50),
        },
        gender: {
          field: "gender",
          type: DataTypes.ENUM("0", "1"),
        },
        isAdmin: {
          field: "is_admin",
          type: DataTypes.TINYINT,
        },
        lastLogin: {
          field: "last_login",
          type: DataTypes.DATE,
        },
        orgId: {
          field: "orgId",
          type: DataTypes.STRING(36),
          allowNull: true,
        },
        createdAt: {
          field: "created_at",
          type: DataTypes.DATE,
          get() {
            return Date.parse(this.getDataValue("createdAt"));
          },
        },
        updatedAt: {
          field: "updated_at",
          type: DataTypes.DATE,
          get() {
            return Date.parse(this.getDataValue("updatedAt"));
          },
        },
      },
      {
        sequelize,
        tableName: "user",
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
        ],
      }
    );
    return user;
  }
}
