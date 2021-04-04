import { URL_PATHS } from "../../../../helpers/networking/url-paths";
import { fetch } from "../../../../helpers/api/api-helper"
const NavbarServices = {
    async counttNotifications(params: any) {
        return fetch(URL_PATHS.COUNT_NOTIFICATION,
            params,
            true
        );
    }
}

export default NavbarServices;