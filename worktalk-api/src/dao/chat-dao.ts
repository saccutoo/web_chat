import db from "../common/connection-db";
import BaseSequelize from "../core/utils/base-sequelize/BaseSequelize";
import { Chat } from "../models/chat";

const model = db.initModels;

export class ChatDao extends BaseSequelize<Chat> {
    constructor() {
        super();
        this.model = model.chats;
    }
}