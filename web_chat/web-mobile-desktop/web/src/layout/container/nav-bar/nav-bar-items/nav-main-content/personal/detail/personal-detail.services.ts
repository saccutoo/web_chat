import { ENUM_KIND_OF_ATTACHMENT } from './../../../../../../../libraries/Enum/attachment';
// import axios from "axios";
import { URL_PATHS } from "../../../../../../../helpers/networking/url-paths";
import { fetch } from '../../../../../../../helpers/api/api-helper';

const PersonalDetailServices = (() => {
    let instance: any;
    function init() {
        return {
            getInforGroupDetail: async (chatRoomId: string,userId:string) => {
                // return await axios({
                //     method: "GET",
                //     url: `${process.env.REACT_APP_IP_ADDRESS_URL}/${URL_PATHS.GET_CHATROOM_DETAIL}`,
                //     params: {
                //         chatRoomId: chatRoomId
                //     },
                //     timeout: 30000
                // })
                //     .then((res) => res)
                //     .catch((err) => console.log(err))

                const params = {
                    chatRoomId: chatRoomId,
                    userId: userId
                }

                return await fetch(
                    URL_PATHS.GET_CHATROOM_DETAIL,
                    params,
                    true
                )
            },

            getGroupDetail: async (chatRoomId: string,userId: string) => {
                // return await axios({
                //     method: "GET",
                //     url: `${process.env.REACT_APP_IP_ADDRESS_URL}/${URL_PATHS.GET_MEMBER_IN_CONVERSION}`,
                //     params: {
                //         chatRoomId: chatRoomId,
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
                }

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
                //         chatRoomId: chatRoomId,
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
                }

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
                //         chatRoomId: chatRoomId,
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
                }

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
                //         chatRoomId: chatRoomId,
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
                }

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
                //         chatRoomId: chatRoomId,
                //         UserId: userId
                //     },
                //     timeout: 30000
                // })
                //     .then((res) => res)
                //     .catch((err) => console.log(err))

                const params = {
                    chatRoomId: chatRoomId,
                    userId: userId
                }

                return await fetch(
                    URL_PATHS.GET_USER_OTHER_IN_CHAT2,
                    params,
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

                const params = {
                    text: userId
                }

                return await fetch(
                    URL_PATHS.POST_GET_USER_BY_ID,
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

export default PersonalDetailServices;