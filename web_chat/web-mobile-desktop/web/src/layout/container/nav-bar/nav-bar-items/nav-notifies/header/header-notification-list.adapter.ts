import { useEffect , useRef , ChangeEvent, useState } from 'react';
import { URL_PATHS } from '../../../../../../helpers/networking/url-paths';
import { ENUM_KIND_OF_STATUS_CODE } from '../../../../../../libraries/Enum/status-code';
import { INotification } from '../noti/notification.props';
import HeaderNotificationListServices from './header-notification-list.services';
function HeaderNotificationListAdapter(props:INotification){
    const { onClick } = props;
    //call update đọc tât cả
    useEffect(() => {
        const updateRead = async () => {
            const userId = localStorage.getItem("userId");

            const response = await HeaderNotificationListServices().getInstance().changeStatusAllNotification(URL_PATHS.CHANGE_STATUS_NOTIFICATION_BY_USER , userId,true );
            if (response && response.status === ENUM_KIND_OF_STATUS_CODE.SUCCESS) {
                
            }
        }
        updateRead();
    },[onClick]);
    return {
        onClick
    }
}

export default HeaderNotificationListAdapter;
