import { APP_CONFIGS } from 'core/common/app-config';
import { fetch} from 'core/common/networking/api-helper';
import { GetNotificationReq } from 'core/common/types/base-request';
import { URL_PATHS } from '../common/networking/url-paths';

export default class NotificationServices {
  private static instance: NotificationServices;

  static getInstance(): NotificationServices {
    if (!NotificationServices.instance) {
      NotificationServices.instance = new NotificationServices();
    }
    return NotificationServices.instance;
  }

  getListNotification = (params: GetNotificationReq) => {
    const tmpPage = params?.pageParams?.page || APP_CONFIGS.DEFAULT_NUMBER_PAGE;
    const tmpPageSize = params?.pageParams?.pageSize || APP_CONFIGS.CHAT_ITEM_PER_PAGE;
    return fetch(
      URL_PATHS.GET_NOTIFICATION,
      { userId: params.userId, pageSize: tmpPageSize, page: tmpPage },
      true
    );
  };
}
