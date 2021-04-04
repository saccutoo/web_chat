import db from "../common/connection-db";
import BaseSequelize from "../core/utils/base-sequelize/BaseSequelize";
import { Chat } from "../models/chat";
import { $bean } from "../core/utils/hyd/hyd-bean-utils";
import { genGuidId } from "../uuid";
import { RedisService } from "./redis-service";
import Conditions from "../core/utils/sql/Conditions";
import { ChatRoomMember } from "../models/chat-room-member";
import { AttachmentService } from "./attachment-service";
import { Attachment } from "../models/attachment";
import {
    ENUM_CONSTANTS,
    ENUM_CONSTANTS_PUSH_STREAM,
    ENUM_TYPE_STATUS_VIDEO_CALL,
    ENUM_KIND_OF_TYPE_VIDEO_CALL,
    ENUM_KIND_OF_FIELD_NAME
} from "../core/constants/enum-constants";
import { User } from "../models/user";
import { IDataResult } from "../core/handles/data-result";
import { RESULT_CODE, RESULT_MESSAGE } from "../core/constants/result-constants";
const model = db.initModels;
var Sequelize = require("sequelize");
var Op = Sequelize.Op;
const redisService: RedisService = new RedisService();
export class VideoCallService extends BaseSequelize<Chat> {
    constructor() {
        super();
        this.model = model.chats;
    }

    async pubStreamVideoCall(message: any) {
        const result: IDataResult = {};
        try {
            const tmpCreatedAt = new Date();
            // Lưu messenger vào database
            // message.id = genGuidId(Chat.TABLE_NAME);
            // message.status = Chat.STATUS_ACTIVE;
            // message.updatedAt = tmpCreatedAt;
            // message.createdAt = tmpCreatedAt;
            // message.statusVideoCall = ENUM_TYPE_STATUS_VIDEO_CALL.CALL_AWAY_CALL_VIDEO;
            // message.timeVideoCall = tmpCreatedAt;

            //Tìm kiếm người dùng theo ID
            var condition = new Conditions();
            condition.eq(User.FIELD_id, message.userId);

            var user: any = await model.users.findOne({
                where: condition.condition
            });

            //insert tin nhắn tạo cuộc gọi từ ai
            // await this.create(message)
            //     .then((result) => {
            //         // Gửi messenger realtime lên chat
            //         let realTimeMess: any = {};
            //         realTimeMess[Chat.FIELD_userId] = message.userId;
            //         realTimeMess[Chat.FIELD_chatRoomId] = message.chatRoomId; 
            //         realTimeMess[Chat.FIELD_message] = message?.message || "";
            //         realTimeMess[Chat.FIELD_messageType] = message?.messageType || "";

            //         realTimeMess[User.FIELD_userName] = user?.userName || "";
            //         realTimeMess[User.FIELD_avatar] = user?.avatar || "";
            //         realTimeMess[User.FIELD_lastName] = user?.lastName || "";
            //         realTimeMess[User.FIELD_firstName] = user?.firstName || "";

            //         this.pubStream(
            //             realTimeMess[Chat.FIELD_chatRoomId],
            //             ENUM_CONSTANTS_PUSH_STREAM.VIDEO_CALL,
            //             realTimeMess
            //         );
            //         result.status = RESULT_CODE.SUCCESS; //trạng thái thành công
            //         result.message = RESULT_MESSAGE.SUCCESS; //tin nhắn thành công trả về

            //     })
            //     .catch((error) => {
            //         result.status = RESULT_CODE.ERROR; //trạng thái thất bại
            //         result.message = "err:" + error; //tin nhắn lỗi trả về
            //         return result;
            //     });

            let realTimeMess: any = {};
            realTimeMess[Chat.FIELD_userId] = message.userId;
            realTimeMess[Chat.FIELD_chatRoomId] = message.chatRoomId;
            realTimeMess[Chat.FIELD_message] = message?.message || "";
            realTimeMess[Chat.FIELD_messageType] = message?.messageType || "";
            realTimeMess[Chat.FIELD_statusVideoCall] = message?.statusVideoCall || "";

            realTimeMess[User.FIELD_userName] = user?.userName || "";
            realTimeMess[User.FIELD_avatar] = user?.avatar || "";
            realTimeMess[User.FIELD_lastName] = user?.lastName || "";
            realTimeMess[User.FIELD_firstName] = user?.firstName || "";
            realTimeMess[ENUM_KIND_OF_TYPE_VIDEO_CALL.TYPE_VIDEO_CALL] = message?.typeVideoCall || "";
            realTimeMess[ENUM_KIND_OF_FIELD_NAME.USER_ID_CALL] = message.userId;
            
            this.pubStream(
                realTimeMess[Chat.FIELD_chatRoomId],
                ENUM_CONSTANTS_PUSH_STREAM.VIDEO_CALL,
                realTimeMess
            );
            
            result.status = RESULT_CODE.SUCCESS; //trạng thái thành công
            result.message = RESULT_MESSAGE.SUCCESS; //tin nhắn thành công trả về

        }
        catch (error) {
            result.status = RESULT_CODE.ERROR; //trạng thái thất bại
            result.message = "err:" + error; //tin nhắn lỗi trả về
        }
        return result
    }

    async pubStream(chatId: string, type: any, value: any) {
        //TODO: Condition
        var condition = new Conditions();
        condition.eq(ChatRoomMember.FIELD_chatRoomId, chatId);
        condition.eq(ChatRoomMember.FIELD_status, ChatRoomMember.STATUS_ACTIVE);

        console.log("test_pubsteam_condition: ", condition);
        let roomMemberList: ChatRoomMember[] = await model.chat_room_members.findAll(
            {
                attributes: [ChatRoomMember.FIELD_userId],
                where: condition.condition,
            }
        );

        for (const member of roomMemberList) {
            redisService.pubStreamObj({
                type: type,
                value: value,
                chatId: member.userId
            });
        }
    }


    async insertMessage(message: any) {
        const tmpCreatedAt = new Date();
        // Lưu messenger vào database
        message.id = genGuidId(Chat.TABLE_NAME);
        message.status = Chat.STATUS_ACTIVE;
        message.updatedAt = tmpCreatedAt;
        message.createdAt = tmpCreatedAt;
        let tmpMessageType = ENUM_CONSTANTS_PUSH_STREAM.NEW_MESSENGER;
        await this.create(message)
          .then((result) => {            
            // Gửi messenger realtime lên chat
            let realTimeMess: any = {};
            realTimeMess[Chat.FIELD_id] = message.id;
            realTimeMess[Chat.FIELD_userId] = message.userId;
            realTimeMess[Chat.FIELD_chatRoomId] = message.chatRoomId;
            realTimeMess[Chat.FIELD_message] = message?.message || "";
            realTimeMess[Chat.FIELD_createdAt] = tmpCreatedAt;
            realTimeMess[Chat.FIELD_statusVideoCall] = message?.statusVideoCall || "";
            realTimeMess[Chat.FIELD_timeVideoCall] = message?.timeVideoCall || tmpCreatedAt;
            
            this.pubStream(
              realTimeMess[Chat.FIELD_chatRoomId],
              tmpMessageType,
              realTimeMess
            );
            return result;
          })
          .catch((error) => {
            console.log("error--------------------------", error);
            return error;
          });
      }
}
