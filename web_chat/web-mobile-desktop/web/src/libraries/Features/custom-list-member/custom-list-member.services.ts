
import { fetch } from "../../../helpers/api/api-helper";
import { URL_PATHS } from "../../../helpers/networking/url-paths";

function CustomListMemberServices() {

    let instance: any;
    function init() {
        return {
            // thêm params user id
            getListMemberInConversation : async (chatRoomId:string,userId:string) => {
                const params = {
                    chatRoomId: chatRoomId,
                    userId:userId,
                    page:1,
                    pageSize:25
                }
                const response= await fetch(
                    URL_PATHS.GET_MEMBER_IN_CONVERSION,
                    params,
                    true
                  );
                  return response
            },
            
        }
    };
    
    return {
        getInstance : () => {
            if (!instance) instance = init();
            return instance;
        }
    }

}

export default CustomListMemberServices;
