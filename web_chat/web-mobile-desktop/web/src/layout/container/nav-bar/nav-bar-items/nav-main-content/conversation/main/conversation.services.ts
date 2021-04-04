// import axios from 'axios';
import { post , fetch } from '../../../../../../../helpers/api/api-helper';
import { URL_PATHS } from '../../../../../../../helpers/networking/url-paths';

const ConversationServices = (() => {

    let instance: any;

    function init() {
        return {
            getConversationList: async (roomid: string, page: number) => {
                // return await axios({
                //     method: "GET",
                //     url: `${process.env.REACT_APP_IP_ADDRESS_URL}/${URL_PATHS.GET_CHATLIST}`,
                //     params: {
                //         roomId: roomid,
                //         page: page,
                //         pageSize: process.env.REACT_APP_NUM_ITEMS_PER_PAGE
                //     },
                //     timeout: 30000
                // })
                //     .then((res) => res)
                //     .catch((err) => console.log(err))

                const params = {
                    roomId: roomid,
                    page: page,
                    pageSize: process.env.REACT_APP_NUM_ITEMS_PER_PAGE
                };

                return await fetch(
                    URL_PATHS.GET_CHATLIST,
                    params,
                    true
                )
            },
            
            getUserById: async (userId: any) => {
                const data = {
                    text: userId
                }
                return post(URL_PATHS.POST_GET_USER_BY_ID, data, true)
            }
        }
    };
    return {
        getInstance: () => {
            if (!instance) instance = init();
            return instance;
        }
    }
})();

export default ConversationServices;