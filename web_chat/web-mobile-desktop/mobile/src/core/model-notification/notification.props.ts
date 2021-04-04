import { GetNotificationRes } from 'core/common/types/base-response';
import { LoginMobileResponse } from 'core/common/types/login';

export interface NotificationProps {
  userInfo: LoginMobileResponse;
  getListNotification: () => void;
  dataListNotification: GetNotificationRes[];
}

// export interface NotificationModel {}
