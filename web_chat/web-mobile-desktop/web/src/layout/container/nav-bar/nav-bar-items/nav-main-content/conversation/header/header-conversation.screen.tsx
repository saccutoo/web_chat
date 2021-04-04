import React from 'react';
import CircleAvatarScreen from '../../../../../../../libraries/Features/circle-avtar/circle-avatar.screen';
import CustomInputScreen from '../../../../../../../libraries/Features/custom-input/custom-input.screen';
import getApiUrl from '../../../../../../../libraries/Functions/get-api-url';
import { SrcSearchLoupe } from '../../../../../../../libraries/Icons/icon-src';
import './header-conversation.scss';

const styleCustomInput = {
    backgroundImage: `url('${SrcSearchLoupe}')`,
    backgroundPosition: "14px 50%",
    padding: "12px 20px 12px 40px",
    borderRadius: "8px",
    fontSize: "1rem",
};

function HeaderConversationScreen(props: any) {
    const { hasSearch, avatar, isOnline, title, eleOptionHeader, onSearch, setQuery, onClickAvatar } = props;


    return (
        <div className={"headerconversation-container " + (hasSearch ? "headerconversation-container-hassearch" : "")}>
            <div className="headerconversation-main">
                <div className="headerconversation-left step2 flex-center">
                    <CircleAvatarScreen
                        hasCursor={true}
                        onClick={onClickAvatar}
                        isOnline={isOnline}
                        src={getApiUrl(avatar)}
                        width=""
                        height=""
                        class="img-40"
                        title={title}
                    ></CircleAvatarScreen>
                    <div className="headerconversation-context">
                        <p className="subheading-semibold">{title}</p>
                        <p className="subtitle-hint">{isOnline ? "Đang online" : "Đang offline"}</p>
                    </div>
                </div>
                <div className="headerconversation-right">
                    {
                        eleOptionHeader
                    }
                </div>
            </div>
            {
                hasSearch && (
                    <div className="headerconversation-search flex-center">
                        <CustomInputScreen
                            style={styleCustomInput}
                            class=""
                            placeHolder="Tìm kiếm cuộc trò chuyện"
                            isMultiline={false}
                            isTextArea={false}
                            onChange={(e: any) => { setQuery(e.target.value) }}
                            hasClearText={true}
                            isFocused={true}
                        ></CustomInputScreen>
                        <button
                            onClick={onSearch}
                            className="btn-outline margin-left-4"
                        >
                            Đóng
                        </button>
                    </div>
                )
            }
        </div>
    )
}

export default HeaderConversationScreen;
