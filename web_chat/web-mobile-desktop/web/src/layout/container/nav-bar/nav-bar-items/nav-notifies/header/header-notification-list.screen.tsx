import React from 'react';
import DetailPopupScreen from '../../../../../../libraries/Features/popup/detail-popup/detail-popup.screen';
import MainPopupScreen from '../../../../../../libraries/Features/popup/main-popup/main-popup.screen';
import ToggleSwitchScreen from '../../../../../../libraries/Features/toggle-switch/toggle-switch.screen';
import TooltipScreen from '../../../../../../libraries/Features/tooltip/tooltip.screen';
import { IconBellNotificationOn, IconCheck, IconMoreVertical, IconSettings, IconTrashDeleteBin } from '../../../../../../libraries/Icons/icon.screen';
import HeaderNotificationListAdapter from './header-notification-list.adapter';
import './header-notification-list.scss';

function HeaderNotificationListScreen(props: any) {
    const {
        onClick
      } = HeaderNotificationListAdapter(props);
    const eleContext = (
        <div className="descriptionchatlist-header-container">
            <div className="brownnoti-container">
                <IconBellNotificationOn></IconBellNotificationOn>
            </div>  
            <div>
                <h4>Thông báo</h4>
                <span>Tất cả các thông báo</span>
            </div>
            <ToggleSwitchScreen></ToggleSwitchScreen>
        </div>
    );

    const listEles = [
        {
            onClick: onClick,
            icon: <IconCheck></IconCheck>,
            text: "Đã đọc tất cả",
            eleContext: onClick,
        },
        {
            onClick: null,
            icon: <IconSettings></IconSettings>,
            text: "Cài đặt",
            eleContext: eleContext,
        },
        {
            onClick: null,
            icon: <IconTrashDeleteBin></IconTrashDeleteBin>,
            text: "Xóa tất cả",
            eleContext: eleContext,
        },
    ];

    const eleDetailPopup =(onClosePopup: any) =>(<DetailPopupScreen 
                                                    listEles={ listEles } 
                                                    onClosePopup={ onClosePopup }
                                                ></DetailPopupScreen>);

    return (
        <>
            <div className="notification-top">
                <div className="descriptionchatlist-header-container">
                    <p className="subheading-semibold">Thông báo</p>
                    
                    <MainPopupScreen context={ eleDetailPopup }>
                        <div>
                            <TooltipScreen context="Tạo tin nhắn">
                                <div className="img-24 flex-center cursor-pointer icon-svg--hover">
                                    {/* <div className="vertical3dots"></div> */}
                                    <IconMoreVertical></IconMoreVertical>
                                </div>
                            </TooltipScreen>
                        </div>
                    </MainPopupScreen>
                </div>
            </div>
        </>
    );

}

export default HeaderNotificationListScreen;


