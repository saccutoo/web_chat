import { fetch } from "../../../../../../helpers/api/api-helper";
import { APP_CONFIGS } from "../../../../../../helpers/api/app-config";
import { URL_PATHS } from "../../../../../../helpers/networking/url-paths";

const NotificationListServices = {
    // quyennq service lấy list thông báo
    async getListNotifications(params: any) {
        return fetch(URL_PATHS.GET_NOTIFICATION,
            params,
            true
        );
    }
}

export default NotificationListServices;