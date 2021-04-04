import { post, deletes } from "../../../../../../../helpers/api/api-helper";
import { URL_PATHS } from "../../../../../../../helpers/networking/url-paths";
function PersonalConversationServices() {

    let instance: any;

    function init() {
        return {
            deleteChatRoom : async (chatRoomId: string,userId:string) => {
                const tmpUrl = `${URL_PATHS.DELETE_ROOM_CHAT}?id=${chatRoomId}&userId=${userId}`;
                const response= await deletes(tmpUrl, null, true);
                return response
            },
            updateNotification : async (data:any) => {
                // const response=await axios({
                //         method:"POST",
                //         url:`http://localhost:3001/api/chat-room-member/update-notification`,
                //         timeout:30000,
                //         data:data
                // })
                const response= await post(
                    URL_PATHS.POST_UPDATE_NOTIFICATION_CHAT_ROOM_MEMBER,
                    data,
                    true
                  );
                  return response
            },
            getChatRoomMemberByUserIdAndChatRoomId : async (data:any) => {
                // const response=await axios({
                //         method:"POST",
                //         url:`http://localhost:3001/api/chat-room-member/get-chat-room-member-by-userid-and-roomchatid`,
                //         timeout:30000,
                //         data:data
                // })
                const response= await post(
                    URL_PATHS.GET_CHAT_ROOM_MEMBER_BY_USERID_AND_ROOMCHATID,
                    data,
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

export default PersonalConversationServices;
