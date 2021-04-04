import { fetch } from "../../../../../../../../helpers/api/api-helper";
import { URL_PATHS } from "../../../../../../../../helpers/networking/url-paths";

const SearchChatServices = (() => {
    let instance: any;

    const init = () => {
        return {
            getListSearchMessage: async (roomId: string, searchText: string , page: number , pageSize: string) => {
                const data =  {
                    roomId: roomId,
                    searchText: searchText,
                    page: page,
                    pageSize: pageSize,
                };

                return await fetch(
                    URL_PATHS.GET_SEARCH_MESSAGE_BY_TEXT,
                    data,
                    true
                )
            },

            getPageByMessage: async (roomId: string, messId: string , pageSize: string) => {
                const data =  {
                    roomId: roomId,
                    messId: messId,
                    pageSize: pageSize,
                };

                return await fetch(
                    URL_PATHS.GET_PAGE_BY_MESSAGE,
                    data,
                    true
                )

                // return axios({
                //     method: "GET",
                //     url: `${process.env.REACT_APP_IP_ADDRESS_URL}/${URL_PATHS.GET_PAGE_BY_MESSAGE}`,
                //     headers: {
                //         "content-type": 'application/json',
                //     },
                //     params: {
                //         roomId: roomId,
                //         messId: messId,
                //         pageSize: pageSize,
                //     },
                //     timeout: 30000
                // })
                //     .then((res) => res)
                //     .catch((err) => err)
            },
        }
    }

    return {
        getInstance: () => {
            if (!instance) instance = init();
            return instance;
        }
    }
})();

export default SearchChatServices;