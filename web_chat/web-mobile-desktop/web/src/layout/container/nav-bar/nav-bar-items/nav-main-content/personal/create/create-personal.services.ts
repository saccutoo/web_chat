import { post , fetch } from "../../../../../../../helpers/api/api-helper";
import { URL_PATHS } from "../../../../../../../helpers/networking/url-paths";


const CreatePersonalService = (() => {
    let instance: any;

    function init() {
        return {
            getCompanyMemberList: async (page: string) => {
                // const response =  await axios({
                //     method: "GET",
                //     url: `${process.env.REACT_APP_IP_ADDRESS_URL}/${URL_PATHS.GET_COMPANYMEMBERLIST}`,
                //     params: {
                //         page: page,
                //         pageSize: process.env.REACT_APP_NUM_ITEMS_PER_PAGE
                //     }
                // })
                // .then((res)=>  res)
                // .catch((err) => console.log(err))

                // return response;

                const data = {
                    page: page,
                    pageSize: process.env.REACT_APP_NUM_ITEMS_PER_PAGE
                };

                return await fetch(
                    URL_PATHS.GET_COMPANYMEMBERLIST,
                    data,
                    true
                )
            },

            getCompanyMemberListSearch: async (data: any) => {
                // const response =  await axios({
                //     method: "POST",
                //     url: `${process.env.REACT_APP_IP_ADDRESS_URL}/${URL_PATHS.GET_COMPANYMEMBERLIST_SEARCH}`,
                //     data: {
                //         text: text
                //     }
                // })
                // .then((res)=>  res)
                // .catch((err) => console.log(err))

                // return response;

                // const data = {
                //     text: text
                // }

                return await fetch(
                    URL_PATHS.GET_COMPANYMEMBERLIST_BYQUERY,
                    data,
                    true
                )
            },

            getSingleRoom: async (userIdList: any) => {
                return post(URL_PATHS.GET_SINGLE_ROOM, userIdList, true)
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

export default CreatePersonalService;
