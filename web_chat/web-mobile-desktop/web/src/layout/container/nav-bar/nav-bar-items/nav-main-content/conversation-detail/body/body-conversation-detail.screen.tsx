import React from 'react';
import { IBodyConversationDetail } from './body-conversation-detail.props';

import './body-conversation-detail.scss';
import './body-panel.scss';

function BodyConversationDetailScreen(props : IBodyConversationDetail) {

    return (
        <div className="bodypanel-container">
            <div className="bodypanel-detail-container">
                <div className="bodyconversationdetail-main">
                    <div className="bodyconversationdetail-main-header">
                        {
                            props.eleUl
                        }
                    </div>
                    <div className="bodyconversationdetail-main-body">
                        {
                            props.showMainBody()
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BodyConversationDetailScreen;
