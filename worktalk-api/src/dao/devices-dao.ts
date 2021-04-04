import db from "../common/connection-db";
import BaseSequelize from "../core/utils/base-sequelize/BaseSequelize";
import { devices } from "../db-export-default/devices";

const model = db.initModels;

export class DeviceDao extends BaseSequelize<devices> {
    constructor() {
        super();
        this.model = model.devices;
    }
}