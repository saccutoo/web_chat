import React from 'react';
import DetailPopupScreen from '../../../../../../libraries/Features/popup/detail-popup/detail-popup.screen';
import MainPopupScreen from '../../../../../../libraries/Features/popup/main-popup/main-popup.screen';
import TooltipScreen from '../../../../../../libraries/Features/tooltip/tooltip.screen';
import { IconPenEdit } from '../../../../../../libraries/Icons/icon.screen';
import HeaderDescriptionChatListAdapter from './header-description-chat-list.adapter';
import './header-description-chat-list.scss';


function HeaderDescriptionChatListScreen() {
  const { redirectToCreateGroup, 
    redirectToCreatePersonalChat
   } = HeaderDescriptionChatListAdapter();
 
  const listEles = [
    {
        onClick: redirectToCreatePersonalChat,
        icon: null,
        text: "Tạo mới chat",
        eleContext: null,
    },
    {
        onClick: redirectToCreateGroup,
        icon: null,
        text: "Tạo nhóm chat",
        eleContext: null,
    },
  ];

  const eleDetailPopup =(onClosePopup: any) =>(<DetailPopupScreen 
                                                  listEles={ listEles } 
                                                  onClosePopup={ onClosePopup }
                                              ></DetailPopupScreen>);

  return (
    <div className="descriptionchatlist-header-container">
      <p className="subheading-semibold">Trò chuyện</p>
      <MainPopupScreen context={ eleDetailPopup }>
        <div>
          <TooltipScreen context="Tạo tin nhắn">
              <IconPenEdit className="descriptionchatlist-icon-penedit cursor-pointer icon-svg--hover step4"></IconPenEdit>
          </TooltipScreen>
        </div>
      </MainPopupScreen>
    </div>
  );
}

export default HeaderDescriptionChatListScreen;
