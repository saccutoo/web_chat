import { chats } from './../db-export-default/chats';
import { Attachment } from "../models/attachment";
import { HyperPaginated } from "../models/hyper-paginated";
import db from '../common/connection-db';
import Conditions from "../core/utils/sql/Conditions";
import BaseSequelize from "../core/utils/base-sequelize/BaseSequelize";
import { genGuidId } from "../uuid";
import { AttachmentDao } from "../dao/attachment-dao";
import IConfig from "../core/config-interface";
import { Chat } from '../models/chat';
import { User } from '../models/user';
import { QueryTypes } from 'sequelize';
const model = db.initModels;

const config: IConfig = require('../../appConfig.json');
export class AttachmentService {
    attachmentDao = new AttachmentDao();

    async save(attachments: any): Promise<Attachment> {
        attachments.id = genGuidId(Attachment.TABLE_NAME);
        // console.log("🚀 ~ file: attachment-service.ts ~ line 16 ~ AttachmentService ~ save ~ attachments", attachments)
        let attachmentRes: any = {}
        await this.attachmentDao.create(attachments)
            .then(result => {
                console.log("🚀 ~ file: attachment-service.ts ~ line 19 ~ AttachmentService ~ save ~ result", result)
                attachmentRes = result
            }).catch(error => {
                // console.log("🚀 ~ file: attachment-service.ts ~ line 21 ~ AttachmentService ~ save ~ error", error)
                attachmentRes = error
            });
        // console.log("🚀 ~ file: attachment-service.ts ~ line 18 ~ AttachmentService ~ save ~ attachmentRes", attachmentRes)
        return attachmentRes;
    }

    async getAll(hyperPaginated?: HyperPaginated): Promise<Attachment[]> {
        console.log("Get all tasks");
        // let page = hyperPaginated ? hyperPaginated.page : 0 ; // page number
        // let offset = hyperPaginated ? (hyperPaginated.pageSize * (page - 1)) : 0;
        let attachmentList: any = await this.attachmentDao.findAll({
            // limit: page,
            // offset: offset
        });
        return attachmentList;
    }

    async delete(attachments: Attachment) {
        let condition = new Conditions();

        condition.eq(Attachment.FIELD_id, attachments.id);

        let attachmentRes: any = await this.attachmentDao.update(
            {
                status: Attachment.STATUS_CANCEL
            },
            condition.buildCondition()
        );

        return attachmentRes;
    }
    //hungdm - Count Attackment In RoomChat
    async countAttachmentInRoom(RoomChatID: string, typeAttackment: string) {
        var condition = new Conditions();
        // Lọc Attackment theo type truyền vào
        // hungdm - nếu typeAttachment == 8 - Lấy các tệp tin khác ảnh
        if(typeAttackment === "8")
        {   
            condition.ne(Attachment.FIELD_type, 1);
        }
        else
        {
            condition.eq(Attachment.FIELD_type, typeAttackment);
        }

        var condition2 = new Conditions();
        // Lọc Attackment theo type truyền vào
        condition2.eq(Chat.FIELD_chatRoomId, RoomChatID);

        return await this.attachmentDao.count({
            include: [
                {
                    model: model.chats,
                    as: "chat",
                    required: true,
                    attributes: [Chat.FIELD_chatRoomId, Chat.FIELD_createdAt, Chat.FIELD_message],
                    where: condition2.condition
                }
            ],
            where: condition.condition

        })
    }
    //hungdm - Get Attackment In RoomChat
    async GetAttachmentInRoom(RoomChatID: string, typeAttackment: string, skip: number, take: number) {
        var condition = new Conditions();
        // Lọc Attackment theo type truyền vào
        // hungdm - nếu typeAttachment == 8 - Lấy các tệp tin khác ảnh
        if(typeAttackment === "8")
        {   
            condition.ne(Attachment.FIELD_type, 1);
        }
        else
        {
            condition.eq(Attachment.FIELD_type, typeAttackment);
        }

        var condition2 = new Conditions();
        // Lọc Attackment theo type truyền vào
        condition2.eq(Chat.FIELD_chatRoomId, RoomChatID);
        return await this.attachmentDao.findAll({
            include: [
                {
                    model: model.chats,
                    as: Chat.JOIN_TABLE_NAME,
                    required: true,
                    attributes: [Chat.FIELD_chatRoomId, Chat.FIELD_createdAt, Chat.FIELD_message],
                    include: [
                        {
                            model: model.users,
                            as: User.JOIN_CHAT_NAME,
                            required: true,
                            attributes: [User.FIELD_userName]
                        }
                    ],
                    where: condition2.condition

                }
            ],
            where: condition.condition,
            order:
                [
                    [Attachment.FIELD_createdAt, "DESC"]
                ],
            offset: skip,
            limit: take

        })
    }
    // Get select With Rownum
    async GetAttachmentInRoomWithRownum(RoomChatID: string, typeAttackment: string, guidId: string) {
        return await db.sequelize.query(`SELECT c.position
        FROM
          (SELECT a.id,a.chat_id,a.type,a.name,(@rownum := @rownum + 1) AS position
           FROM chat_ihcm.attachments AS a 
           INNER JOIN chat_ihcm.chats AS b ON a.chat_id = b.id
           ,(SELECT @rownum := 0) AS r
           where b.chat_room_id='${RoomChatID}' and a.type = '${typeAttackment}'
             ) AS c WHERE c.name='${guidId}'`, { type: QueryTypes.SELECT })
            .then(res => {
                return res;
            }).catch(err => {
                return err
            })
    }


}