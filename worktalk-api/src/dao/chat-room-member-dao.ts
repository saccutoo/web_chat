import db from "../common/connection-db";
import BaseSequelize from "../core/utils/base-sequelize/BaseSequelize";
import { ChatRoomMember } from "../models/chat-room-member";

const model = db.initModels;

export class ChatRoomMemberDao extends BaseSequelize<ChatRoomMember> {
    constructor() {
        super();
        this.model = model.chat_room_members;
    }
}