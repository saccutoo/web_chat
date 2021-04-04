import { URL_PATHS } from "../../helpers/networking/url-paths";
import { deletes, fetch, post } from '../../helpers/api/api-helper';

function HeaderServices(){
    let instance: any;

    function init() {
        return {
            getDetail: async (data: any) => {
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
}

export default HeaderServices;