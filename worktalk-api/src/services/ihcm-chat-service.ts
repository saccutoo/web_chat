import db from "../common/connection-db";
import { ENUM_CONSTANTS_PUSH_STREAM, ENUM_KIND_OF_MESSAGE_TYPE, ENUM_KIND_OF_TYPE_NOTIFICATION } from "../core/constants/enum-constants";
import { RESULT_CODE, RESULT_MESSAGE } from "../core/constants/result-constants";
import { IDataResult } from "../core/handles/data-result";
import Conditions from "../core/utils/sql/Conditions";
import { Chat } from "../models/chat";
import { ChatRoom } from "../models/chat-room";
import { User } from "../models/user";
import { RedisService } from "./redis-service";

const model = db.initModels;
const redisService: RedisService = new RedisService();

//vinhtq: 10/03/2021 : hàm gửi tin nhắn real time khi thao tác với các ifram
export class IhcmChatService {
    async SendMessage(message: any) {
        const result: IDataResult = {};
        try {       

            redisService.pubStreamObj({
                type: ENUM_CONSTANTS_PUSH_STREAM.IHCM_CLICK_NOTIFICAION,
                value: message,
                chatId:message.userId
            });

            result.status = RESULT_CODE.SUCCESS; //trạng thái thành công
            result.message = RESULT_MESSAGE.SUCCESS; //tin nhắn thành công trả về
            result.data=message
        }
        catch (error) {
            result.status = RESULT_CODE.ERROR; //trạng thái thất bại
            result.message = "err:" + error; //tin nhắn lỗi trả về
        }
        return result
    }

    /**
     * created by tuda - 11/03/2021
     * @param  {any} message chứa roomId
     * @returns error
     */
    async sendRoomIdToBoxChat(message: any) {
        const result: IDataResult = {};
        try {       

            redisService.pubStreamObj({
                type: ENUM_CONSTANTS_PUSH_STREAM.IHCM_PUSH_ROOM_ID_TO_BOX_CHAT,
                value: message,
                chatId: message.userId
            });

            result.status = RESULT_CODE.SUCCESS; //trạng thái thành công
            result.message = RESULT_MESSAGE.SUCCESS; //tin nhắn thành công trả về
            result.data=message
        }
        catch (error) {
            result.status = RESULT_CODE.ERROR; //trạng thái thất bại
            result.message = "err:" + error; //tin nhắn lỗi trả về
        }
        return result
    }
}


