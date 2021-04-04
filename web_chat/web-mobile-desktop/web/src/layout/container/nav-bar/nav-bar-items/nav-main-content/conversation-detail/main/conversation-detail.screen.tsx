import React from 'react';
import BodyConversationDetailScreen from '../body/body-conversation-detail.screen';
import HeaderConversationDetailScreen from '../header/header-conversation-detail.screen';
import { IConversationDetail } from './conversation-detail.props';
import './conversation-detail.scss';


function ConversationDetailScreen(props : IConversationDetail) {
  return (
    <div className="conversationdetail-container">
      <HeaderConversationDetailScreen { ...props.header } onChangeDisplay={ props.onChangeDisplay } ></HeaderConversationDetailScreen>
      <BodyConversationDetailScreen { ...props.body }></BodyConversationDetailScreen>
    </div>
  );
}

export default ConversationDetailScreen;
