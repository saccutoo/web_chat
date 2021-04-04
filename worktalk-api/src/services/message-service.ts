// import db from '../common/connection-db';
// var $bean = require('../common/utils/hyd-bean-utils');
// const redisConfig = require('../common/redis.config');
// const redisApp = redisConfig.redisApp;
// const redisPushStream = redisConfig.redisPushStream;
// const redisService = require('./redis.service');

import { RedisService } from "./redis-service";
import { $bean } from "../core/utils/hyd/hyd-bean-utils";
import { genGuidId } from "../uuid";
// import $bean from '../core/utils/hyd/hyd-bean-utils.js'

// import { redisService } from './redis-service';
// var $bean = require('../core/utils/hyd/hyd-bean-utils');
// var $bean = require("../core/utils/hyd/hyd-bean-utils");
// const listModelType = require('../common/obj/modelType/listModelType');
// declare var $bean: any;
const TYPE_MESSENGER_GROUP_CHAT = 'TYPE_MESSENGER_GROUP_CHAT';
const TYPE_MESSENGER_USER_CHAT = 'TYPE_MESSENGER_USER_CHAT';
const TYPE_NEW_MESSENGER = 'NEW_MESSENGER';
const TYPE_UPDATED_MESSENGER = 'UPDATED_MESSENGER';
const TYPE_DELETED_MESSENGER = 'DELETED_MESSENGER';
const DEFAULT_PREVIOUS_MESSENGER = 10;
const DEFAULT_NEXT_MESSENGER = 10;
const ON_NOTIFICATION = 1;
const OFF_NOTIFICATION = 0;

// const model = db.initModels;

const redisService: RedisService = new RedisService();

export class MessageServie {

    insertMessage(groupChatId: any, messenger: any) {
        return this.doInsertMessenger(groupChatId, messenger);
    }

    async doInsertMessenger(groupChatId: any, message: any) {
        let result = {};
        console.log("doInsertMessenger_msg_1: ", message)
        // console.log("doInsertMessenger_user: ", userLogin)
        // let chat = await baseDao.findById(messenger['chatId'], listModelType.modelTypeChat);
        // if ($bean.isNotEmpty(chat)) {
            let objMessenger: any = {};
            // for (key in listModelType.modelTypeMessenger.mapObj) {
            //     objMessenger[listModelType.modelTypeMessenger.mapObj[key].title] = messenger[key];
            // }
            // if ($bean.isEmpty(objMessenger['id'])) {
            //     objMessenger['id'] = $bean.genRandomID(16);
            // }
            // if ($bean.isEmpty(objMessenger['userId'])) {
            //     objMessenger['userId'] = userLogin.id;
            // }
            // if ($bean.isEmpty(objMessenger['type'])) {
            //     // objMessenger['type'] = messengerStatic.TYPE_TEXT;
            //     objMessenger['type'] = messenger.type;
            // }
            // if ($bean.isEmpty(objMessenger['typeRole'])) {
            //     objMessenger['typeRole'] = messengerStatic.TYPE_ROLE_PRIMARY;
            // }
            // if ($bean.isEmpty(objMessenger['status'])) {
            //     objMessenger['status'] = messengerStatic.STATUS_ORIGINAL;
            // }
            // if ($bean.isEmpty(objMessenger['modifiedDate'])) {
            //     objMessenger['modifiedDate'] = new Date();
            // }
            // if ($bean.isNotEmpty(messenger.replyId)) {
            //     objMessenger['replyId'] = messenger.replyId
            // }
            // objMessenger['chatTitle'] = chat.title
            objMessenger['timeStart'] = $bean.getCurrentSqlTime()
            objMessenger['deleted'] = 0
            // // Gửi messenger realtime lên chat
            let realTimeMessenger = $bean.cloneJson(objMessenger);
            realTimeMessenger['user'] = message.userId;
            realTimeMessenger['chatId'] = groupChatId;
            console.log("RealTimeMessenger ");
            console.log(realTimeMessenger);
            // Realtime về người dùng
            // redisService.pubStreamObj({
            //     type: TYPE_NEW_MESSENGER,
            //     value: realTimeMessenger,
            //     chatId: realTimeMessenger['chatId']
            // });
            // console.log("doInsertMessenger_chat: ", chat, '__', realTimeMessenger)
            this.pubStream(realTimeMessenger['chatId'], TYPE_NEW_MESSENGER, realTimeMessenger);

            // Lưu messenger vào database
            message.id = genGuidId('chats');
            // message.createdAt = new Date();
            // message.updatedAt = message.createdAt;
            // result = await baseDao.insert(objMessenger, listModelType.modelTypeMessenger);
            // let updateChat = {
            //     id: objMessenger['chatId'],
            //     lastMessageDate: result.createdAt
            // }
            // chatDao.doUpdateChat(updateChat, userLogin);
        // }
        return result;
    }

    async pubStream(chatId: any, type: any, value: any) {
        console.log('++++++++')
        console.log(value)
        if ($bean.isNotEmpty(value.replyId)) {
            console.log('------+---')
            // let foundMessenger = await baseDao.findById(value.replyId, listModelType.modelTypeMessenger);
            // if ($bean.isNotEmpty(foundMessenger)) {
            //     // let foundUser = await baseDao.findById(foundMessenger.userId, listModelType.modelTypeUser);
            //     value.replyMess = { message: foundMessenger, user: { userName: foundUser.username, userId: foundUser.id, email: foundUser.email, avatar: foundUser.avatar_url } }
            //     console.log('----------')
            //     console.log(value)
            // }
        }

        // let userChatList = await userChatDao.findByChat(chatId);
        // for (let i = 0; i < userChatList.length; i++) {
            redisService.pubStreamObj({
                type: type,
                value: value,
                chatId: chatId
            });
        // }
    }

}