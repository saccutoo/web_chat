import db from "../common/connection-db";
import BaseSequelize from "../core/utils/base-sequelize/BaseSequelize";
import { Attachment } from "../models/attachment";

const model = db.initModels;

export class AttachmentDao extends BaseSequelize<Attachment> {
    constructor() {
        super();
        this.model = model.attachments;
    }
}