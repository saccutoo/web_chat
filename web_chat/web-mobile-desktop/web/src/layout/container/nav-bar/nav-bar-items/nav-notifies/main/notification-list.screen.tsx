import React from 'react';
import { ENUM_KIND_OF_ICONPANEL } from '../../../../../../libraries/Enum/icon-panel';
import SkeletonNavbarDetailScreen from '../../../../../../libraries/Features/skeleton-navbar-detail/skeleton-navbar-detail.screen';


import HeaderNotificationListScreen from '../header/header-notification-list.screen';
import { INotification } from '../noti/notification.props';
import NotificationScreen from '../noti/notification.screen';
import './notification-list.scss';
import NotificationListAdapter from './notification-list.adapter';
import DataNotFoundScreen from '../../../../../../libraries/Features/data-not-found/data-not-found.screen';
import { ENUM_KIND_OF_NOTFOUNDICON } from '../../../../../../libraries/Enum/not-found-icon';

function NotificationListScreen(props: any) {

    const iconpanel = ENUM_KIND_OF_ICONPANEL.NOTI;

    const { page, setPage,
        totalPages,
        isUpdating,
        notificationList } = NotificationListAdapter();

    const showNotiList = () => {
        return notificationList.map(
            (noti: INotification, index: number) => (
                <NotificationScreen {...noti} key={index}></NotificationScreen>
            )
        );
    }

    return (
        <>
            <div className="descriptionchatlist-top headernoti-container">
                <HeaderNotificationListScreen></HeaderNotificationListScreen>
            </div>

            <div className="descriptionchatlist-bottom">
                {/* quyennq sửa loading khi đang lấy list */}
                {
                    isUpdating && (
                        <>
                            <SkeletonNavbarDetailScreen iconpanel={iconpanel}></SkeletonNavbarDetailScreen>
                            <SkeletonNavbarDetailScreen iconpanel={iconpanel}></SkeletonNavbarDetailScreen>                            <SkeletonNavbarDetailScreen iconpanel={iconpanel}></SkeletonNavbarDetailScreen>
                            <SkeletonNavbarDetailScreen iconpanel={iconpanel}></SkeletonNavbarDetailScreen>
                            <SkeletonNavbarDetailScreen iconpanel={iconpanel}></SkeletonNavbarDetailScreen>
                            <SkeletonNavbarDetailScreen iconpanel={iconpanel}></SkeletonNavbarDetailScreen>
                            <SkeletonNavbarDetailScreen iconpanel={iconpanel}></SkeletonNavbarDetailScreen>
                            <SkeletonNavbarDetailScreen iconpanel={iconpanel}></SkeletonNavbarDetailScreen>
                            <SkeletonNavbarDetailScreen iconpanel={iconpanel}></SkeletonNavbarDetailScreen>
                        </>
                    )
                }
                {
                    showNotiList()
                }
                {
                    //quyennq thêm not found notifi
                    (notificationList.length === 0) && (
                        <DataNotFoundScreen 
                            text={"Bạn chưa có thông báo"} 
                            icon={ ENUM_KIND_OF_NOTFOUNDICON.NOTI } 
                            isPosition={ false }
                            hasntCursor={ true }
                            hasTextCenter={ true }
                        ></DataNotFoundScreen>
                    )
                }
            </div>
        </>
    );
}

export default NotificationListScreen;
