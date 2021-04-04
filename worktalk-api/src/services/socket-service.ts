
import axios from 'axios';
// const urlPushStream = `https://pushtest.hyperlogy.com`;
const urlPushStream = `${process.env.PUSH_STREAM_HOST}`;
// const urlPushStream = `https://push.hyperlogy.com`;
import { $bean } from "../core/utils/hyd/hyd-bean-utils";
export class SocketService {
    // subChat(userId, chatId) {
    //     return userChatDao.findUserChat(userId, chatId);
    // },

    async pubToChat(object: any) {
        console.log('----------Pub to Chat----------');
        var url = urlPushStream + '/pub?id=' + object['chatId'];
        // var url = hostPushStream + '/pub?id=' + "hyper";
        console.log('Pub url ' + url);
        return await axios.post(url, $bean.encodeObject(object));
    }
}

