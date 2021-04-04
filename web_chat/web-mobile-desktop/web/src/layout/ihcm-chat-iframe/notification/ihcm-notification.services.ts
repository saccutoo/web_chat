import { URL_PATHS } from "../../../helpers/networking/url-paths";
import { deletes, post } from '../../../helpers/api/api-helper';

const ihcmNotificationServices = () => {
    let instance: any;

    function init() {
        return {
            sendNotification : async (data:any) => {
                const response= await post(
                    URL_PATHS.POST_IHCM_CHAT_SEND_NOTIFICATION,
                    data,
                    true
                  );
                  return response
            },
            getListChatRooms : async (userId:any) => {
                const tmpUrl = `${URL_PATHS.DELETE_ROOM_CHAT}?page=${1}&pageSize=${10}&userId=${userId}`;
                const response= await deletes(tmpUrl, null, true);
                return response
            },
        }
    };

    return {
        getInstance: () => {
            if (!instance) instance = init();
            return instance;
        }
    }
}

export default ihcmNotificationServices;
