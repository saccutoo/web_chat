import type { Sequelize, Model } from "sequelize";
import { attachments } from "./attachments";
import type { attachmentsAttributes, attachmentsCreationAttributes } from "./attachments";
import { chat_room_members } from "./chat_room_members";
import type { chat_room_membersAttributes, chat_room_membersCreationAttributes } from "./chat_room_members";
import { chat_rooms } from "./chat_rooms";
import type { chat_roomsAttributes, chat_roomsCreationAttributes } from "./chat_rooms";
import { chats } from "./chats";
import type { chatsAttributes, chatsCreationAttributes } from "./chats";
import { devices } from "./devices";
import type { devicesAttributes, devicesCreationAttributes } from "./devices";
import { notifications } from "./notifications";
import type { notificationsAttributes, notificationsCreationAttributes } from "./notifications";
import { users } from "./users";
import type { usersAttributes, usersCreationAttributes } from "./users";

export {
  attachments,
  chat_room_members,
  chat_rooms,
  chats,
  devices,
  notifications,
  users,
};

export type {
  attachmentsAttributes,
  attachmentsCreationAttributes,
  chat_room_membersAttributes,
  chat_room_membersCreationAttributes,
  chat_roomsAttributes,
  chat_roomsCreationAttributes,
  chatsAttributes,
  chatsCreationAttributes,
  devicesAttributes,
  devicesCreationAttributes,
  notificationsAttributes,
  notificationsCreationAttributes,
  usersAttributes,
  usersCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  attachments.initModel(sequelize);
  chat_room_members.initModel(sequelize);
  chat_rooms.initModel(sequelize);
  chats.initModel(sequelize);
  devices.initModel(sequelize);
  notifications.initModel(sequelize);
  users.initModel(sequelize);

  attachments.belongsTo(chats, { as: "chat", foreignKey: "chat_id"});
  chats.hasMany(attachments, { as: "attachments", foreignKey: "chat_id"});
  attachments.belongsTo(users, { as: "updated_by_user", foreignKey: "updated_by"});
  users.hasMany(attachments, { as: "attachments", foreignKey: "updated_by"});
  chat_room_members.belongsTo(chat_rooms, { as: "chat_room", foreignKey: "chat_room_id"});
  chat_rooms.hasMany(chat_room_members, { as: "chat_room_members", foreignKey: "chat_room_id"});
  chat_room_members.belongsTo(users, { as: "created_by_user", foreignKey: "created_by"});
  users.hasMany(chat_room_members, { as: "chat_room_members", foreignKey: "created_by"});
  chat_room_members.belongsTo(users, { as: "updated_by_user", foreignKey: "updated_by"});
  users.hasMany(chat_room_members, { as: "updated_by_chat_room_members", foreignKey: "updated_by"});
  chat_room_members.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(chat_room_members, { as: "user_chat_room_members", foreignKey: "user_id"});
  chat_rooms.belongsTo(users, { as: "created_by_user", foreignKey: "created_by"});
  users.hasMany(chat_rooms, { as: "chat_rooms", foreignKey: "created_by"});
  chats.belongsTo(chat_rooms, { as: "chat_room", foreignKey: "chat_room_id"});
  chat_rooms.hasMany(chats, { as: "chats", foreignKey: "chat_room_id"});
  chats.belongsTo(chats, { as: "parent", foreignKey: "parent_id"});
  chats.hasMany(chats, { as: "chats", foreignKey: "parent_id"});
  chats.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(chats, { as: "chats", foreignKey: "user_id"});
  devices.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(devices, { as: "devices", foreignKey: "user_id"});
  notifications.belongsTo(chats, { as: "chat", foreignKey: "chat_id"});
  chats.hasMany(notifications, { as: "notifications", foreignKey: "chat_id"});
  notifications.belongsTo(chat_rooms, { as: "chat_room", foreignKey: "chat_room_id"});
  chat_rooms.hasMany(notifications, { as: "notifications", foreignKey: "chat_room_id"});
  notifications.belongsTo(users, { as: "receiver", foreignKey: "receiver_id"});
  users.hasMany(notifications, { as: "notifications", foreignKey: "receiver_id"});
  notifications.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(notifications, { as: "user_notifications", foreignKey: "user_id"});

  return {
    attachments: attachments,
    chat_room_members: chat_room_members,
    chat_rooms: chat_rooms,
    chats: chats,
    devices: devices,
    notifications: notifications,
    users: users,
  };
}
