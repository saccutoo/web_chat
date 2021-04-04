import axios from "axios";
import { fetch, post } from "../../../../../../../../helpers/api/api-helper";
import { URL_PATHS } from "../../../../../../../../helpers/networking/url-paths";

const ChatListPopupServices = () => {
    let instance: any;

    function init() {
        return {
            // Lấy danh sách chat trong phần popup chia sẻ
            getListChatInPopup: async (data: any) => {
                const response = await fetch(
                    URL_PATHS.POST_GET_LIST_CHATROOM_BY_USER,
                    data,
                    true
                );
                return response
            },
            // Lấy danh sách user trong chat riêng
            getListUserOther: async (data: any) => {
                const response = await fetch(
                    URL_PATHS.GET_USER_OTHER_IN_LIST_CONVERSATION_POPUP,
                    data,
                    true
                );
                return response
            }
        }
    }

    return {
        getInstance: () => {
            if (!instance) instance = init();
            return instance;
        }
    }
}

export default ChatListPopupServices;
