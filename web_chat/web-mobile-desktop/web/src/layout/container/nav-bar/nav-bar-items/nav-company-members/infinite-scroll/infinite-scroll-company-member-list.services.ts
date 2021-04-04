import { fetch } from "../../../../../../helpers/api/api-helper";
import { URL_PATHS } from "../../../../../../helpers/networking/url-paths";

const InfiniteScrollCompanyMemberListServices = () => {
  let instance: any;

  function init() {
    return {
      getCompanyMemberList: async (page: string) => {
        const params = {
          page: page,
          pageSize: process.env.REACT_APP_NUM_ITEMS_PER_PAGE,
        };
        
        return fetch(URL_PATHS.GET_COMPANYMEMBERLIST, params, true);
      },
    };
  }

  return {
    getInstance: () => {
      if (!instance) instance = init();
      return instance;
    },
  };
};                  

export default InfiniteScrollCompanyMemberListServices;
