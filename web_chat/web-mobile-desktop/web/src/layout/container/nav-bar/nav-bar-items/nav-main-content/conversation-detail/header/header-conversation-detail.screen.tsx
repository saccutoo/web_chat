import React from 'react';
import CircleAvatarScreen from '../../../../../../../libraries/Features/circle-avtar/circle-avatar.screen';
import GoBackButtonScreen from '../../../../../../../libraries/Features/goback-button/goback-button.screen';
import EditAvatarScreen from '../../../../../../../libraries/Features/edit-avatar-button/edit-avatar-button.screen';
import { IHeaderConversationDetail } from './header-conversation-detail.props';
import './header-conversation-detail.scss';
import HeaderConversationDetailAdapter from './header-conversation-detail.adapter'
import getApiUrl from '../../../../../../../libraries/Functions/get-api-url';

function HeaderConversationDetailScreen(props : IHeaderConversationDetail) {
    const {
        chatRoom, setChatRoom
    } = HeaderConversationDetailAdapter() 
    return (
        <div className="headerconversationdetail-container padding-16">
            <div className="headerconversationdetail-top">
                <GoBackButtonScreen onClick={ props.onChangeDisplay }></GoBackButtonScreen>
                <div className="detail-title">
                    <h4>
                        {
                            props.name 
                        }
                    </h4>
                    <span>
                        {
                            props.title 
                        }
                    </span>
                </div>
                {
                    chatRoom && chatRoom[0] && chatRoom[0].type === "1" && props.isAdmin == "1"  ? <EditAvatarScreen></EditAvatarScreen> : ""
                }
            </div>
            <div className="headerconversationdetail-main container">
                <div className="headerconversationdetail-avatar flex-center">
                    <CircleAvatarScreen
                        src={ getApiUrl(props.srcImage) }
                        isOnline={false}
                        class={"headerconversationdetail-avatar-image"}
                        height="100px"
                        width="100px"
                        title={ props.name }
                    ></CircleAvatarScreen>
                </div>
                <div className="headerconversationdetail-option">
                    {
                        props.eleOption
                    }
                </div>
            </div>
        </div>
    );
}

export default HeaderConversationDetailScreen;
