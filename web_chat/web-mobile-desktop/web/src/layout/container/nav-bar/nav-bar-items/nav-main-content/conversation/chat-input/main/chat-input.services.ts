import { URL_PATHS } from './../../../../../../../../helpers/networking/url-paths';
import { IChat } from "../../main/conversation.props";
import { post , put } from '../../../../../../../../helpers/api/api-helper';

const ChatInputServices = (() => {
    let instance: any;

    function init() {
        return {
            sendMessage: (message: any) => {
                return post(URL_PATHS.POST_MESSAGE, message, true)
            },

            editMessage: async (message: any) => {
                return put(URL_PATHS.PUT_UPDATE_MESSAGE, message, true)
            },
            // hungdm - bắn notification khi được tag tên
            pushNotificationTagName: async (item: any) => {
                return post(URL_PATHS.POST_NOTIFICATION_TAG_NAME, item, true)
            },
        }
    }

    return {
        getInstance: () => {
            if (!instance) instance = init();
            return instance;
        }
    }
})();


export default ChatInputServices;
