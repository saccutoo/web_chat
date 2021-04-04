import { useEffect, useState } from "react";
import { Subscription } from "rxjs";
import { APP_CONFIGS } from "../../../../../../helpers/api/app-config";
import EventBus, { EventBusName, EventBusType } from "../../../../../../helpers/api/event-bus";
import { URL_PATHS } from "../../../../../../helpers/networking/url-paths";
import { ENUM_KIND_OF_ICONPANEL } from "../../../../../../libraries/Enum/icon-panel";
import { ENUM_KIND_OF_STATUS_CODE } from "../../../../../../libraries/Enum/status-code";
import { INotification } from "../noti/notification.props";
import NotificationListServices from "./notification-list.services";

const NotificationListAdapter = () => {
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [isUpdating, setIsUpdating] = useState<boolean>(false);
    const [notificationList, setNotificationList] = useState<INotification[]>([]);
    const subscriptions = new Subscription();
    var didFocus: any = null;

    //quyennq : lấy list thông báo để hiển thị lên view
    const getData = async () => {
        setIsUpdating(true);

        const userId = localStorage.getItem("userId");
        const params = {
            page: page,
            pageSize: APP_CONFIGS.ITEM_PER_PAGE,
            userId: userId
        }
        const response = await NotificationListServices.getListNotifications(params);
        if (response && response.status === ENUM_KIND_OF_STATUS_CODE.SUCCESS) {
            setTotalPages(response.totalPages)
            setNotificationList((prev) => [...prev, ...response.data]);
        }
        setIsUpdating(false)
    }

    useEffect(() => {

        // quyennq: gọi hàm get data, nhận thông báo từ puststream
        // (async () => {
        //     await getData();
        // })()

        subscriptions.add(
            EventBus.getInstance().events.subscribe((res: EventBusType) => {
                const payload = res?.payload;
                if (payload) {
                    switch (res?.type) {
                        case EventBusName.PUSH_NOTIFICATION:
                            //check theo type notification de update giao dien
                            setNotificationList((prev) => [...prev, ...payload]);
                            break;
                    }
                }
            })
        );
    }, []);

    //callBack
    //vinhtq: unsubscribe
    useEffect(() => {
        return () => {
            subscriptions.unsubscribe();
            if (didFocus) didFocus.remove();
        };
    }, []);

    return {
        page, setPage,
        totalPages,
        isUpdating,
        notificationList
    }

}

export default NotificationListAdapter;