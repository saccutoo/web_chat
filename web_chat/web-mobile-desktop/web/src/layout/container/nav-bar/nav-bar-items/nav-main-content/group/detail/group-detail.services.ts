import { ENUM_KIND_OF_ATTACHMENT } from './../../../../../../../libraries/Enum/attachment';
// import axios from "axios";
import { URL_PATHS } from "../../../../../../../helpers/networking/url-paths";
import { IChat } from '../../conversation/main/conversation.props';
import { deletes, fetch, post } from '../../../../../../../helpers/api/api-helper';

const GroupDetailServices = (() => {
    let instance: any;

    function init() {
        return {
            getInforGroupDetail: async (chatRoomId: string,userId:string) => {
                // return await axios({
                //     method: "GET",
                //     url: `${process.env.REACT_APP_IP_ADDRESS_URL}/${URL_PATHS.GET_CHATROOM_DETAIL}`,
                //     params: {
                //         ChatRoomId: chatRoomId
                //     },
                //     timeout: 30000
                // })
                //     .then((res) => res)
                //     .catch((err) => console.log(err))

                const params = {
                    chatRoomId: chatRoomId,
                    userId: userId
                };

                return await fetch(
                    URL_PATHS.GET_CHATROOM_DETAIL,
                    params,
                    true
                )
            },
            
            getGroupDetail: async (chatRoomId: string,userId:string) => {
                // return await axios({
                //     method: "GET",
                //     url: `${process.env.REACT_APP_IP_ADDRESS_URL}/${URL_PATHS.GET_MEMBER_IN_CONVERSION}`,
                //     params: {
                //         ChatRoomId: chatRoomId,
                //         page: 1,
                //         pageSize: process.env.REACT_APP_NUM_ITEMS_PER_PAGE
                //     },
                //     timeout: 30000
                // })
                //     .then((res) => res)
                //     .catch((err) => console.log(err))
    
                const params = {
                    chatRoomId: chatRoomId,
                    userId:userId,
                    page: 1,
                    pageSize: process.env.REACT_APP_NUM_ITEMS_PER_PAGE                
                };

                return await fetch(
                    URL_PATHS.GET_MEMBER_WITH_USER_LOGIN_IN_CONVERSION,
                    params,
                    true
                )
            },

            getLinkGroupDetail: async (chatRoomId: string) => {
                // return await axios({
                //     method: "GET",
                //     url: `${process.env.REACT_APP_IP_ADDRESS_URL}/${URL_PATHS.GET_LIST_LINK_IN_ROOMCHAT}`,
                //     params: {
                //         ChatRoomId: chatRoomId,
                //         page: 1,
                //         pageSize: process.env.REACT_APP_NUM_ITEMS_PER_PAGE
                //     },
                //     timeout: 30000
                // })
                //     .then((res) => res)
                //     .catch((err) => console.log(err))

                const params = {
                    chatRoomId: chatRoomId,
                    page: 1,
                    pageSize: process.env.REACT_APP_NUM_ITEMS_PER_PAGE              
                };

                return await fetch(
                    URL_PATHS.GET_LIST_LINK_IN_ROOMCHAT,
                    params,
                    true
                )
            },

            getAttachmentImageGroupDetail: async (chatRoomId: string) => {
                // return await axios({
                //     method: "GET",
                //     url: `${process.env.REACT_APP_IP_ADDRESS_URL}/${URL_PATHS.GET_LIST_ATTACHMENT_IN_ROOMCHAT}`,
                //     params: {
                //         ChatRoomId: chatRoomId,
                //         typeAttachment: ENUM_KIND_OF_ATTACHMENT.IMAGE,
                //         page: 1,
                //         pageSize: 15
                //     },
                //     timeout: 30000
                // })
                //     .then((res) => res)
                //     .catch((err) => console.log(err))

                const params = {
                    chatRoomId: chatRoomId,
                    typeAttachment: ENUM_KIND_OF_ATTACHMENT.IMAGE,
                    page: 1,
                    pageSize: 15           
                };

                return await fetch(
                    URL_PATHS.GET_LIST_ATTACHMENT_IN_ROOMCHAT,
                    params,
                    true
                )
            },

            getAttachmentFileGroupDetail: async (chatRoomId: string) => {
                // return await axios({
                //     method: "GET",
                //     url: `${process.env.REACT_APP_IP_ADDRESS_URL}/${URL_PATHS.GET_LIST_ATTACHMENT_IN_ROOMCHAT}`,
                //     params: {
                //         ChatRoomId: chatRoomId,
                //         typeAttachment: ENUM_KIND_OF_ATTACHMENT.OTHER,
                //         page: 1,
                //         pageSize: process.env.REACT_APP_NUM_ITEMS_PER_PAGE
                //     },
                //     timeout: 30000
                // })
                //     .then((res) => res)
                //     .catch((err) => console.log(err))

                const params = {
                    chatRoomId: chatRoomId,
                    typeAttachment: ENUM_KIND_OF_ATTACHMENT.LIST_FILE_OTHER_IMAGE,
                    page: 1,
                    pageSize: process.env.REACT_APP_NUM_ITEMS_PER_PAGE       
                };

                return await fetch(
                    URL_PATHS.GET_LIST_ATTACHMENT_IN_ROOMCHAT,
                    params,
                    true
                )
            },

            deleteUserInChatRoomMember: async (data: any) => {
                // return await axios({
                //     method: "POST",
                //     url: `${process.env.REACT_APP_IP_ADDRESS_URL}/${URL_PATHS.POST_DELETE_USER_IN_CHAT_ROOM}`,
                //     //url:`http://localhost:3001/api/chat-room-member/delete-user-in-chat-room`,
                //     data: data,
                //     timeout: 30000
                // })
                //     .then((res) => res)
                //     .catch((err) => console.log(err))           
                    
                return await post(
                    URL_PATHS.POST_DELETE_USER_IN_CHAT_ROOM,
                    data,
                    true
                )
            },

            sendMessage: async (message: IChat) => {
                // return axios({
                //     method: "POST",
                //     url: `${process.env.REACT_APP_IP_ADDRESS_URL}/${URL_PATHS.POST_MESSAGE}`,
                //     headers: {
                //         "content-type": 'application/json',
                //     },
                //     data: message,
                //     timeout: 30000
                // })
                //     .then((res) => res)
                //     .catch((err) => console.log(err))

                return await post(
                    URL_PATHS.POST_MESSAGE,
                    message,
                    true
                )
            },

            getUserById: async (userId: any) => {
                // return axios({
                //     method: "POST",
                //     url: `${process.env.REACT_APP_IP_ADDRESS_URL}/${URL_PATHS.POST_GET_USER_BY_ID}`,
                //     headers: {
                //         "content-type": 'application/json',
                //     },
                //     data: {
                //         "text": userId
                //     },
                //     timeout: 30000
                // })
                //     .then((res) => res)
                //     .catch((err) => err)

                const data = {
                    text: userId
                }

                return await post(
                    URL_PATHS.POST_GET_USER_BY_ID,
                    data,
                    true
                )
            },

            updatePermissionRoomChat: async (data: any) => {
                // return await axios({
                //     method: "POST",
                //     url: `${process.env.REACT_APP_IP_ADDRESS_URL}/${URL_PATHS.POST_UPDATE_PERMISSION_CHAT_ROOM}`,
                //     data: data,
                //     timeout: 30000
                // })

                return await post(
                    URL_PATHS.POST_UPDATE_PERMISSION_CHAT_ROOM,
                    data,
                    true
                )
            },

            deleteChatRoom: async (chatRoomId: string, userId: string) => {
                const tmpUrl = `${URL_PATHS.DELETE_ROOM_CHAT}?id=${chatRoomId}&userId=${userId}`;
                //const tmpUrl=`http://localhost:3001/api/chat-rooms?id=${chatRoomId}&userId=${userId}`
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
            userOutChatRoom : async (data:any) => {
                // const response=await axios({
                //         method:"POST",
                //         url:`http://localhost:3001/api/chat-room-member/user-out-room-chat`,
                //         timeout:30000,
                //         data:data
                // })
                const response= await post(
                    URL_PATHS.POST_USER_OUT_ROOM_CHAT,
                    data,
                    true
                  );
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

export default GroupDetailServices;
