import { fetch } from "../../../helpers/api/api-helper";
import { URL_PATHS } from "../../../helpers/networking/url-paths";
import { ENUM_KIND_OF_ATTACHMENT } from '../../Enum/attachment';

const ImageOverlayServices =(() => {
    let instance: any;

    function init() {
        return {
            getAttachmentImage: async (chatRoomId: string , page:number , pageSize:number) => {
                // return await axios({
                //     method: "GET",
                //     url: `${process.env.REACT_APP_IP_ADDRESS_URL}/${URL_PATHS.GET_LIST_ATTACHMENT_IN_ROOMCHAT}`,
                //     params: {
                //         chatRoomId: chatRoomId,
                //         typeAttachment: ENUM_KIND_OF_ATTACHMENT.IMAGE,
                //         page:page,
                //         pageSize:15
                //     },
                //     timeout: 30000,
                // })
                //     .then((res) => res)
                //     .catch((err) => console.log(err))

                const params = {
                    chatRoomId: chatRoomId,
                    typeAttachment: ENUM_KIND_OF_ATTACHMENT.IMAGE,
                    page:page,
                    pageSize:15
                };

                return await fetch(
                    URL_PATHS.GET_LIST_ATTACHMENT_IN_ROOMCHAT,
                    params,
                    true
                )
            },

            getCurrentPage: async (chatRoomId: string , guid:string , pageSize:number) => {
                // return await axios({
                //     method: "GET",
                //     url: `${process.env.REACT_APP_IP_ADDRESS_URL}/${URL_PATHS.GET_LIST_ATTACHMENT_IN_ROOMCHAT}`,
                //     params: {
                //         chatRoomId: chatRoomId,
                //         typeAttachment: ENUM_KIND_OF_ATTACHMENT.IMAGE,
                //         guid:guid,
                //         pageSize:pageSize
                //     },
                //     timeout: 30000,
                // })
                //     .then((res) => res)
                //     .catch((err) => console.log(err))

                const params = {
                    chatRoomId: chatRoomId,
                    typeAttachment: ENUM_KIND_OF_ATTACHMENT.IMAGE,
                    guid:guid,
                    pageSize:pageSize
                };

                return await fetch(
                    URL_PATHS.GET_LIST_ATTACHMENT_IN_ROOMCHAT,
                    params,
                    true
                )
            },
        }
    };

    return {
        getInstance : () => {
            if (!instance) instance = init();
            return instance;
        }
    }
})()

export default ImageOverlayServices;
