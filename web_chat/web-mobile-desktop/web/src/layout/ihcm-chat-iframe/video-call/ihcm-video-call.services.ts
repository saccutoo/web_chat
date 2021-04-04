import { URL_PATHS } from "../../../helpers/networking/url-paths";
import { deletes, post } from '../../../helpers/api/api-helper';

const ihcmVideoCallServices = () => {
    let instance: any;

    function init() {
        
    };

    return {
        getInstance: () => {
            if (!instance) instance = init();
            return instance;
        }
    }
}

export default ihcmVideoCallServices;
