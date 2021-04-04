import db from "../common/connection-db";
import BaseSequelize from "../core/utils/base-sequelize/BaseSequelize";
import { Attachment } from "../models/attachment";
import { User } from "../models/user";

const model = db.initModels;
export class UserDao extends BaseSequelize<User> {
    constructor() {
        super();
        this.model = model.users;
    }
}
