import React from 'react';
import { ENUM_KIND_OF_CHATROOM } from '../../../../../../../../libraries/Enum/chat-room';
import { ENUM_KIND_OF_STATUS } from '../../../../../../../../libraries/Enum/status';
import CircleAvatarScreen from '../../../../../../../../libraries/Features/circle-avtar/circle-avatar.screen';
import getApiUrl from '../../../../../../../../libraries/Functions/get-api-url';
import ChatListPopupAdapter from './chat-list-popup.adapter';
import './chat-list-popup.scss';


/**
 * hungdm - Màn hình popup hiển thị danh sách những nhóm chát có thể chia sẻ
 * @returns 
 */
function ChatListPopupScreen(props: any) {
    const {
        listChatInPopup,
        listUserOtherConversion,
        shareMessage
    } = ChatListPopupAdapter()
    const ClickShare = (roomId: string) => {
        shareMessage(props, roomId);
    }
    const ShowListContact = () => {
        if (listChatInPopup && listChatInPopup.length > 0) {
            return listChatInPopup.map((item: any, index: number) => {
                //Check xem là chát riêng hay chat nhóm
                if (item.type === ENUM_KIND_OF_CHATROOM.PERSONAL) {
                    // Chát riêng
                    if (listUserOtherConversion && listUserOtherConversion.length > 0) {
                        for (let i = 0; i < listUserOtherConversion.length; i++) {
                            if (listUserOtherConversion[i].chat_room_id === item.id) {
                                // Khi là riêng
                                return (<div className="bodycreategroup-main-body-selecteduserpanel">
                                    <CircleAvatarScreen
                                        src={listUserOtherConversion[i].avatar && getApiUrl(listUserOtherConversion[i].avatar)}
                                        isOnline={listUserOtherConversion[i].status === ENUM_KIND_OF_STATUS.ACTIVE}
                                        class="img-32"
                                        hasCursor={false}
                                    ></CircleAvatarScreen>
                                    <p className="txt-title">{listUserOtherConversion[i].user_name}</p>
                                    <button className="btn-send" onClick={() => { ClickShare(item.id) }}>Send</button>
                                </div>);
                            }
                        }
                    }
                }
                // Khi là nhóm
                return (<div className="bodycreategroup-main-body-selecteduserpanel">
                    <CircleAvatarScreen
                        src={getApiUrl(item.avatar)}
                        isOnline={item.status === ENUM_KIND_OF_STATUS.ACTIVE}
                        class="img-32"
                        hasCursor={false}
                    ></CircleAvatarScreen>
                    <p className="txt-title">{item.title}</p>
                    <button className="btn-send" onClick={() => { ClickShare(item.id) }}>Send</button>
                </div>);
            })
        }
        return <div></div>;
    }
    return (
        <div className={"addmember-container"}>
            <div className={"addmember-selectedmember"} >
                {/* <CustomInputScreen style={styleCustomInput} hasClearText={true} placeHolder="Nhập tên người cần tìm kiếm" class="" isMultiline={false} isTextArea={false}></CustomInputScreen> */}
                <div className="addmember-selectedmember-main">
                    {
                        ShowListContact()
                    }
                </div>
            </div>
        </div>
    );
}

export default ChatListPopupScreen;
