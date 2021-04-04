import { DataTypes, Model, Sequelize } from 'sequelize';

export class chat extends Model {

    static initModel(sequelize: Sequelize) {
        chat.init({
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
            parentId: {
                field: 'parent_id',
                type: DataTypes.STRING(36),
                references: {
                    model: 'chat',
                    key: 'id'
                }
            },
            message: {
                field: 'message',
                type: DataTypes.TEXT,
            },
            messageType: {
                field: 'message_type',
                type: DataTypes.ENUM('0', '1', '2', '3', '4', '5', '6'),
            },
            messageStatus: {
                field: 'message_status',
                type: DataTypes.ENUM('0', '1', '2'),
            },
            status: {
                field: 'status',
                type: DataTypes.ENUM('0', '1'),
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
            tableName: 'chat',
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
                    name: "ix_chat_status",
                    using: "BTREE",
                    fields: [
                        { name: "status" },
                    ]
                },
                {
                    name: "chat_ibfk_3_idx",
                    using: "BTREE",
                    fields: [
                        { name: "parent_id" },
                    ]
                },
            ]
        });
        return chat;
    }
}
