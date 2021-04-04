import { URL_PATHS } from './../../../../../../../../helpers/networking/url-paths';
// import { ENUM_KIND_OF_ATTACHMENT } from "../../../../../../../../libraries/Enum/attachment";
import { IChat } from '../../main/conversation.props';
import { post } from '../../../../../../../../helpers/api/api-helper';

const ChatListServices = (function () {
    let instance: any;

    function init() {
        return {
            // getAttachmentImageGroupDetail: async (chatRoomId: string , page:number) => {
            //     return await axios({
            //         method: "GET",
            //         url: `${process.env.REACT_APP_IP_ADDRESS_URL}/${URL_PATHS.GET_LIST_ATTACHMENT_IN_ROOMCHAT}`,
            //         params: {
            //             ChatRoomId: chatRoomId,
            //             TypeAttachment: ENUM_KIND_OF_ATTACHMENT.IMAGE,
            //             page:page,
            //             pageSize: 20
            //         },
            //         timeout: 30000,
            //     })
            //         .then((res) => res)
            //         .catch((err) => console.log(err))
            // },

            sendFirstMessage: async (message: IChat) => {
                return await post(URL_PATHS.POST_FIRST_MESSAGE, message, true)
            },
        }
    };

    return {
        getInstance: () => {
            if (!instance) instance = init();
            return instance;
        }
    }
})();

export default ChatListServices;
