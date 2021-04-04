import { URL_PATHS } from "../../../helpers/networking/url-paths";
import { fetch, post } from '../../../helpers/api/api-helper';

const ihcmListGroupServices = (() => {
    let instance: any;

    function init() {
        return {
            sendRoomIdToBoxChat : async (data:any) => {
                const response= await post(
                    URL_PATHS.POST_IHCM_SEND_ROOMID_TO_BOX_CHAT,
                    data,
                    true
                  );
                  return response
            },

            getListChatRooms : async (page: number , pageSize:number , userId:string) => {
                const tmpUrl = `${URL_PATHS.LIST_ROOM_CHAT}?page=${page}&pageSize=${pageSize}&userId=${userId}`;
                const response = await fetch(tmpUrl, null, true);
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
})()

export default ihcmListGroupServices;
