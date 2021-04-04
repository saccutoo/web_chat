import React, { useMemo } from 'react';
import { ENUM_KIND_OF_ICONPANEL } from '../../../../libraries/Enum/icon-panel';
import { IconBellNotificationOnWhite, IconChatMessage2LineWhite, IconQuestionCircleWhite, IconUsersGroup1 } from '../../../../libraries/Icons/icon.screen';
import IconPanelScreen from './icon-panel/icon-panel.screen';
import NavbarAdapter from './navbar.adapter';
import './navbar.scss';

function NavbarScreen(props: any) {

  const { activedIcon, setActivedIcon } = props;
  // quyennq: thêm check có thoongbaos, tin nhắn
  const {
    hasNotification,
    setHasNotification,
    hasMessage,
    setHasMessage
  } = NavbarAdapter();
  // quyennq viết lại view menu
  const listMenu = useMemo(() => {
    return [
      {
        isActive: activedIcon === ENUM_KIND_OF_ICONPANEL.MESSAGES,
        eleIcon: <IconChatMessage2LineWhite></IconChatMessage2LineWhite>,
        contextToolTip: "Trò chuyện",
        onClick: () => {
          setActivedIcon(ENUM_KIND_OF_ICONPANEL.MESSAGES)
          setHasMessage(0)
        },
        hasNotification: hasMessage

      },
      {
        isActive: activedIcon === ENUM_KIND_OF_ICONPANEL.COMPANYMEMBER,
        eleIcon: <IconUsersGroup1></IconUsersGroup1>,
        contextToolTip: "Thành viên",
        onClick: () => { setActivedIcon(ENUM_KIND_OF_ICONPANEL.COMPANYMEMBER) },
        hasNotification: 0

      },
      {
        isActive: activedIcon === ENUM_KIND_OF_ICONPANEL.NOTI,
        eleIcon: <IconBellNotificationOnWhite></IconBellNotificationOnWhite>,
        contextToolTip: "Thông báo",
        onClick: () => {
          setActivedIcon(ENUM_KIND_OF_ICONPANEL.NOTI)
          setHasNotification(0)
        },
        hasNotification: hasNotification

      }

    ]
  }, [activedIcon, hasNotification, hasMessage])
  return (
    <div className="navbar-container step2">
      {listMenu.map(menu => {
        return (
          <IconPanelScreen
            isActive={menu.isActive}
            eleIcon={menu.eleIcon}
            contextToolTip={menu.contextToolTip}
            onClick={menu.onClick}
            hasNotification={menu.hasNotification}
          ></IconPanelScreen>
        )
      })}
      {/* <IconPanelScreen
        isActive={activedIcon === ENUM_KIND_OF_ICONPANEL.MESSAGES}
        eleIcon={<IconChatMessage2LineWhite></IconChatMessage2LineWhite>}
        contextToolTip={"Trò chuyện"}
        onClick={() => { setActivedIcon(ENUM_KIND_OF_ICONPANEL.MESSAGES) }}
        hasNotification={hasMessage}
      ></IconPanelScreen>
      <IconPanelScreen
        isActive={activedIcon === ENUM_KIND_OF_ICONPANEL.COMPANYMEMBER}
        eleIcon={<IconUsersGroup1></IconUsersGroup1>}
        contextToolTip={"Thành viên"}
        onClick={() => { setActivedIcon(ENUM_KIND_OF_ICONPANEL.COMPANYMEMBER) }}
        hasNotification={false}
      ></IconPanelScreen>
      <IconPanelScreen
        isActive={activedIcon === ENUM_KIND_OF_ICONPANEL.NOTI}
        eleIcon={<IconBellNotificationOnWhite></IconBellNotificationOnWhite>}
        contextToolTip={"Thông báo"}
        onClick={() => { setActivedIcon(ENUM_KIND_OF_ICONPANEL.NOTI) }}
        hasNotification={hasNotification}
      ></IconPanelScreen> */}
      {/* <div className="navbar-iconpanel-last">
        <IconPanelScreen
          isActive={activedIcon === ENUM_KIND_OF_ICONPANEL.QUESTIONS}
          eleIcon={<IconQuestionCircleWhite></IconQuestionCircleWhite>}
          contextToolTip={"Giải đáp"}
          onClick={() => { setActivedIcon(ENUM_KIND_OF_ICONPANEL.QUESTIONS) }}
          hasNotification={false}
        ></IconPanelScreen>
      </div> */}
    </div>
  );
}

export default NavbarScreen;
