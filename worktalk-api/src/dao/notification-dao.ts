import db from "../common/connection-db";
import BaseSequelize from "../core/utils/base-sequelize/BaseSequelize";
import { devices } from "../db-export-default/devices";
import { notifications } from "../db-export-default/init-models";

const model = db.initModels;

export class NotificationDao extends BaseSequelize<notifications> {
    constructor() {
        super();
        this.model = model.notifications;
    }
}