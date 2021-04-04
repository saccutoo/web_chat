import { ENUM_KIND_OF_ATTACHMENT } from '../../../../../../../libraries/Enum/attachment';
// import axios from "axios";
import { URL_PATHS } from "../../../../../../../helpers/networking/url-paths";
import { fetch, post } from '../../../../../../../helpers/api/api-helper';

const PersonalInforServices =(() => {
    let instance: any;
    function init() {
        return {
            getUserById: async (userId: any) => {
                const data = {
                    text: userId
                }
                return post(URL_PATHS.POST_GET_USER_BY_ID, data, true)
            },

            getGroupDetail: async (chatRoomId: string,userId: string) => {
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
                    URL_PATHS.GET_MEMBER_IN_CONVERSION,
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
                //         TypeAttachment: ENUM_KIND_OF_ATTACHMENT.IMAGE,
                //         page: 1,
                //         pageSize: 15
                //     },
                //     timeout: 30000
                // })
                //     .then((res) => res)
                //     .catch((err) => console.log(err))
            
                const params = {
                    ChatRoomId: chatRoomId,
                    TypeAttachment: ENUM_KIND_OF_ATTACHMENT.IMAGE,
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
                //         TypeAttachment: ENUM_KIND_OF_ATTACHMENT.OTHER,
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
            
            getUserOther: async (chatRoomId: string,userId: string) => {
                // return await axios({
                //     method: "GET",
                //     url: `${process.env.REACT_APP_IP_ADDRESS_URL}/${URL_PATHS.GET_USER_OTHER_IN_CHAT2}`,
                //     params: {
                //         ChatRoomId: chatRoomId,
                //         UserId: userId
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
                    URL_PATHS.GET_USER_OTHER_IN_CHAT2,
                    params,
                    true
                )
            }       
        }
    };

    return {
        getInstance: () => {
            if (!instance) instance = init();
            return instance;
        }
    }
})()

export default PersonalInforServices;