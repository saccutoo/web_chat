import { useEffect, useRef, ChangeEvent, useState } from 'react';
import { URL_PATHS } from '../../../../../../helpers/networking/url-paths';
import { ENUM_KIND_OF_STATUS_CODE } from '../../../../../../libraries/Enum/status-code';
import { INotification } from './notification.props';
import NotificationServices from './notification.services';
function NotificationAdapter() {
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [isUpdating, setIsUpdating] = useState<boolean>(false);
    const [notificationList, setNotificationList] = useState<INotification[]>([]);
    useEffect(() => {
        const getData = async () => {
            setIsUpdating(true);

            const userId = localStorage.getItem("userId");
            const pageSize = process.env.REACT_APP_NUM_CHAT_ITEMS_PER_PAGE;

            const response = await NotificationServices().getInstance().getNotificationList(URL_PATHS.GET_NOTIFICATION, page, pageSize, userId);
            if (response && response.status === ENUM_KIND_OF_STATUS_CODE.SUCCESS) {
                setTotalPages(response.totalPages)
                setNotificationList((prev) => [...prev, ...response.data]);
            }
            setIsUpdating(false)
        }

        getData();
    }, [page, setNotificationList, setTotalPages, setIsUpdating]);

    return {
        notificationList, setNotificationList,
        totalPages,
        page, setPage,
        isUpdating
    }
}

export default NotificationAdapter;
