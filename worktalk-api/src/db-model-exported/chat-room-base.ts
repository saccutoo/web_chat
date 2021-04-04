import { DataTypes, Model, Sequelize } from 'sequelize';

export class chat_room extends Model {

    static initModel(sequelize: Sequelize) {
        chat_room.init({
            id: {
                field: 'id',
                type: DataTypes.STRING(36),
                allowNull: false,
                primaryKey: true
            },
            avatar: {
                field: 'avatar',
                type: DataTypes.STRING(255),
            },
            title: {
                field: 'title',
                type: DataTypes.STRING(255),
            },
            slogan: {
                field: 'slogan',
                type: DataTypes.STRING(255),
            },
            description: {
                field: 'description',
                type: DataTypes.TEXT,
            },
            status: {
                field: 'status',
                type: DataTypes.ENUM('0','1'),
            },
            type: {
                field: 'type',
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
                allowNull: true,
                get() {
                    return Date.parse(this.getDataValue("updatedAt"));
                  },
            }
        }, {
            sequelize,
            tableName: 'chat_room',
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
        return chat_room;
    }
}
