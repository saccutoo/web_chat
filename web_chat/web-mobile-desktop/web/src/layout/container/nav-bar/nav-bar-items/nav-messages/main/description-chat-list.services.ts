import { fetch } from "../../../../../../helpers/api/api-helper";
import { URL_PATHS } from "../../../../../../helpers/networking/url-paths";


const DescriptionChatListServices = (() => {

    let instance: any;

    function init() {
        return {
            getDescriptionChatList: async (page: number, pageSize: number, userId: string) => {
                // console.log('Token...');
                // const urlParams = new URLSearchParams(window.location.search);
                const token = localStorage.getItem('verify_token');
                // console.log(token);

                const params = {
                    page: page,
                    pageSize: pageSize,
                    userId: userId
                }

                return await fetch(
                    URL_PATHS.LIST_ROOM_CHAT,
                    params,
                    true
                )
            },
            searchListChatRoom: async (searchText: string, page?: number, pageSize?: number, userId?: string) => {
                const params = {
                    searchText: searchText,
                    page: page,
                    pageSize: pageSize,
                    userId: userId
                }
                return await fetch(
                    URL_PATHS.GET_SEARCH_CHAT_ROOM,
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

export default DescriptionChatListServices;