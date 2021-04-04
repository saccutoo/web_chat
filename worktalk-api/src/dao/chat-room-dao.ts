import db from "../common/connection-db";
import BaseSequelize from "../core/utils/base-sequelize/BaseSequelize";
import { ChatRoom } from "../models/chat-room";

const model = db.initModels;

export class ChatRoomDao extends BaseSequelize<ChatRoom> {
    constructor() {
        super();
        this.model = model.chat_rooms;
    }
}