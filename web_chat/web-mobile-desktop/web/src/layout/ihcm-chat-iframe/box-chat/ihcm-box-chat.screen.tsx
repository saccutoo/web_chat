import React from 'react';
import { IconChatMessage2Line } from '../../../libraries/Icons/icon.screen';
import ConversationScreen from '../../container/nav-bar/nav-bar-items/nav-main-content/conversation/main/conversation.screen';
import IhcmBoxChatAdapater from './ihcm-box-chat.adapter';
import "./ihcm-box-chat.scss";

function IhcmBoxChatIframe(props: any) {

  const {
    roomId,
    onClickToFullScreen,
    onClickToClose
  } = IhcmBoxChatAdapater();

  return (
    <div className="box-chat-container">
      <ConversationScreen 
        isBoxChat={ true }
        onClickToClose={ onClickToClose }
        onClickToFullScreen={ onClickToFullScreen}
        roomIdBoxChat={roomId}
      ></ConversationScreen>
    </div>
    );
}

export default IhcmBoxChatIframe;
