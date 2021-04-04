import { DataTypes, Model, Sequelize } from 'sequelize';

export class chat_room_member extends Model {
    
   static initModel(sequelize: Sequelize) {
        chat_room_member.init({
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
            chatRoomId: {
                field: 'chat_room_id',
                type: DataTypes.STRING(36),
                allowNull: false,
                references: {
                    model: 'chat_room',
                    key: 'id'
                }
            },
            isAdmin: {
                field: 'is_admin',
                type: DataTypes.TINYINT,
            },
            status: {
                field: 'status',
                type: DataTypes.ENUM('0','1'),
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
                get() {
                    return Date.parse(this.getDataValue("createdAt"));
                  },
            },
            updatedAt: {
                field: 'updated_at',
                type: DataTypes.DATE,
                get() {
                    return Date.parse(this.getDataValue("updatedAt"));
                  },
            }
        }, {
            sequelize,
            tableName: 'chat_room_member',
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
                    name: "ix_chat_room_member_status",
                    using: "BTREE",
                    fields: [
                        { name: "status" },
                    ]
                },
            ]
        });
        return chat_room_member;
    }
}
