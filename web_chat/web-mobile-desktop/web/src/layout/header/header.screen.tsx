import React, { useContext } from 'react';
import CircleAvatarScreen from '../../libraries/Features/circle-avtar/circle-avatar.screen';
import DetailPopupScreen from '../../libraries/Features/popup/detail-popup/detail-popup.screen';
import MainPopupScreen from '../../libraries/Features/popup/main-popup/main-popup.screen';
import './header.scss';
import { IconBellNotificationOn, IconGridLayout, IconLogoColorFull, IconQuestionCircle, IconSignoutRight, IconUserProfileSquare } from '../../libraries/Icons/icon.screen';
import HeaderAdapter from './header.adapter';
import { APP_CONFIGS } from '../../helpers/api/app-config';
import getApiUrl from '../../libraries/Functions/get-api-url';

function HeaderScreen() {

  const {
    userInfo,
    openIhcmProfile, user
  } = HeaderAdapter();

  const listEles = [
    {
        onClick: null,
        icon: <IconBellNotificationOn></IconBellNotificationOn>,
        text: "Cài đặt thông báo"
    },
    {
        onClick: openIhcmProfile,
        icon: <IconUserProfileSquare></IconUserProfileSquare>,
        text: "Hồ sơ của tôi"
    },
    {
        onClick: null,
        icon: <IconQuestionCircle></IconQuestionCircle>,
        text: "Trợ giúp"
    },
    {
        onClick: null,
        icon: <IconSignoutRight></IconSignoutRight>,
        text: "Đăng xuất"
    },
  ];

  const eleHeader = (
    <div className="detailpopup-header">
      <CircleAvatarScreen 
        isOnline={false}
        src={ userInfo ? getApiUrl(userInfo.avatar) : '' }
        width={''}
        height={''}
        class={"img-48"}
      ></CircleAvatarScreen>
      <div className="detailpopup-header-right">
        <p>
          {(userInfo ? userInfo.userName : '')}
        </p>
        <span>
          iSoft
        </span>
      </div>
    </div>
  )

  const eleDetailPopup =(onClosePopup: any) =>(<DetailPopupScreen 
                                                listEles={ listEles } 
                                                eleHeader={ eleHeader }
                                                onClosePopup={ onClosePopup }
                                              ></DetailPopupScreen>);

  return (
    <div className="header-container">
      <IconGridLayout className="header-icon-9dots step1 cursor-pointer"></IconGridLayout>
      <IconLogoColorFull className="header-icon-main cursor-pointer"></IconLogoColorFull>

      <div className="header-icon-avatar">
        <MainPopupScreen context={ eleDetailPopup }>
          <div>
            <CircleAvatarScreen 
              isOnline={false}
              src={userInfo ? getApiUrl(userInfo.avatar) : ''}
              width={''}
              height={''}
              class={"img-40"}
              hasCursor={ true }
            ></CircleAvatarScreen>
          </div>
        </MainPopupScreen>
      </div>

  </div>

  );
}

export default HeaderScreen;

