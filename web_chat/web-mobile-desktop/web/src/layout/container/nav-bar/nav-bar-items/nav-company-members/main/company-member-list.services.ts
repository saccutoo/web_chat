import { fetch, post } from "../../../../../../helpers/api/api-helper";
import { URL_PATHS } from "../../../../../../helpers/networking/url-paths";

const CompanyMemberListServices = (() => {
  let instance: any;

  function init() {
    return {
      
      //hungdm- check 2 người đã có room chat với nhau chưa ???
      getSingleRoom: async (userIdList: any) => {
        return post(URL_PATHS.GET_SINGLE_ROOM, userIdList, true)
      },

      getCompanyMemberList: async (page: string) => {
        const params = {
          page: page,
          pageSize: process.env.REACT_APP_NUM_ITEMS_PER_PAGE,
        };

        return await fetch(
          URL_PATHS.GET_COMPANYMEMBERLIST,
          params,
          true
        );
      },

      getCompanyMemberListByQuery: async (data: any) => {
        return await fetch(
          URL_PATHS.GET_COMPANYMEMBERLIST_BYQUERY,
          data,
          true
        );
      },

      createChatRoom: async (data: any) => {
        // return axios({
        //   method: "POST",
        //   url: `${process.env.REACT_APP_IP_ADDRESS_URL}/api/chat-rooms/`,
        //   headers: {
        //     "content-type": "application/json",
        //   },
        //   data: formData,
        //   timeout: 30000,
        // })
        //   .then((res) => res)
        //   .catch((err) => console.log(err));

        return await post(
          URL_PATHS.POST_CREATE_ROOM,
          data,
          true
        )
      }
    };
  }

  return {
    getInstance: () => {
      if (!instance) instance = init();
      return instance;
    }
  };
})()

export default CompanyMemberListServices;
