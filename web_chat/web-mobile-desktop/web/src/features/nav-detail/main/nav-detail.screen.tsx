import React from 'react';
import './nav-detail.scss';
import { INavDetail } from './nav-detail.props';
import { ENUM_KIND_OF_ICONPANEL } from '../../../libraries/Enum/icon-panel';
import NotificationListScreen from '../../../layout/container/nav-bar/nav-bar-items/nav-notifies/main/notification-list.screen';
import CompanyMemberListScreen from '../../../layout/container/nav-bar/nav-bar-items/nav-company-members/main/company-member-list.screen';
import DescriptionChatListScreen from '../../../layout/container/nav-bar/nav-bar-items/nav-messages/main/description-chat-list.screen';

function NavDetailScreen(props: INavDetail) {

  const { activedIcon } = props;
  const eleInfor = () =>{
    switch (activedIcon) {
      case ENUM_KIND_OF_ICONPANEL.MESSAGES:
        return <DescriptionChatListScreen></DescriptionChatListScreen>
      case ENUM_KIND_OF_ICONPANEL.COMPANYMEMBER:
        return <CompanyMemberListScreen></CompanyMemberListScreen>
      case ENUM_KIND_OF_ICONPANEL.NOTI:
        return <NotificationListScreen></NotificationListScreen>
    }
  }
  return (
    <div className="body-right-information step3">
      {
        eleInfor()
      }
    </div>
  );

}

export default NavDetailScreen;