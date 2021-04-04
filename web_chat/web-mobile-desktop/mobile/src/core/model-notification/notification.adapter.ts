import { APP_CONFIGS } from 'core/common/app-config';
import { processRequestRespository } from 'core/common/networking/api-helper';
import { GetNotificationRes } from 'core/common/types/base-response';
import { LoginMobileResponse } from 'core/common/types/login';
import { useState } from 'react';
import { NotificationProps } from './notification.props';
import NotificationServices from './notification.services';

function NotificationAdapter(props: NotificationProps) {
  //   const { useInfo } = props;
  console.log('Notification Adapter :', props);
  const {userInfo} = props
  // Variables
  var page: number = APP_CONFIGS.DEFAULT_NUMBER_PAGE;
  const ITEM_PAGE = APP_CONFIGS.ITEM_PER_PAGE;

  // states

  const [dataListNotification, setDataListNotification] = useState<GetNotificationRes[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // logic

  const getListNotificationSuccess = (res: GetNotificationRes[]) => {
    console.log('Test_getListNotificationSuccess: ', res);
    setDataListNotification(res);
  };

  // get list notification

  const getListNotification = () => {
    setIsLoading(true);
    processRequestRespository(
      NotificationServices.getInstance().getListNotification({
        userId: userInfo?.user.id,
        pageParams: {
          page: page,
          pageSize: ITEM_PAGE,
        },
      }),
      getListNotificationSuccess
    );
  };

  return {
    dataListNotification,
    getListNotification,
  };
}

export default NotificationAdapter;
