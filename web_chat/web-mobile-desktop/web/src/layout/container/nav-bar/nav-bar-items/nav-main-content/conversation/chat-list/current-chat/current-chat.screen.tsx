import React from 'react';
import { ENUM_KIND_OF_MESSAGE } from '../../../../../../../../libraries/Enum/message';
import ModalScreen from '../../../../../../../../libraries/Features/modal/modal.screen';
import DetailPopupScreen from '../../../../../../../../libraries/Features/popup/detail-popup/detail-popup.screen';
import MainPopupScreen from '../../../../../../../../libraries/Features/popup/main-popup/main-popup.screen';
import { IconMoreVertical, IconPenEdit2, IconShareArrowLeftLine, IconSlidesSquare, IconTrashDeleteBin } from '../../../../../../../../libraries/Icons/icon.screen';
import ChatListPopupScreen from '../chat-list-popup/chat-list-popup.screen';
import CurrentChatAdapter from './current-chat.adapter';
import { ICurrentChat } from './current-chat.props';
import './current-chat.scss';

function CurrentChatScreen(props: ICurrentChat) {
    
    const {
        setResponMess,
        copyText,
        removeMessage,
        editMessage,
        type,
        popupRemoveIsDisplayed, setPopupRemoveIsDisplayed,
        popupShareIsDisplayed , setPopupShareIsDisplayed
    } = CurrentChatAdapter(props);
    
    
    /**
     * Huy : hiện popup
    */
    const togglePopupRemove = () => { setPopupRemoveIsDisplayed(prev => !prev) };
    // hungdm - hiển thị popup chia sẻ
    const togglePopupShare = () => {
        setPopupShareIsDisplayed(prev => !prev) 
    };

    const removeMess = () => {
        removeMessage()
        togglePopupRemove()
    }

    const eleContext = (
        <div className="margin-8">
            <button onClick={togglePopupRemove} className="btn-outline margin-right-16">Hủy</button>
            <button onClick={removeMess}>Xác nhận</button>
        </div>
    );
    const listEles = (type === ENUM_KIND_OF_MESSAGE.TEXT || type === ENUM_KIND_OF_MESSAGE.LINK) ? (
        [
            {
                onClick: setResponMess,
                icon: <IconShareArrowLeftLine></IconShareArrowLeftLine>,
                text: "Trả lời"
            },
            {
                onClick: copyText,
                icon: <IconSlidesSquare></IconSlidesSquare>,
                text: "Sao chép"
            },
            {
                onClick: editMessage,
                icon: <IconPenEdit2></IconPenEdit2>,
                text: "Chỉnh sửa"
            },
            {
                onClick: togglePopupShare,
                icon: <IconPenEdit2></IconPenEdit2>,
                text: "Chuyển tiếp"
            },
            {
                onClick: togglePopupRemove,
                icon: <IconTrashDeleteBin></IconTrashDeleteBin>,
                text: "Xóa",
            },
        ]
    ) : (
        [
            {
                onClick: togglePopupShare,
                icon: <IconPenEdit2></IconPenEdit2>,
                text: "Chuyển tiếp"
            },
            {
                onClick: togglePopupRemove,
                icon: <IconTrashDeleteBin></IconTrashDeleteBin>,
                text: "Xóa",
            },
        ]
    )

    const eleDetailPopup = (onClosePopup: any) => (<DetailPopupScreen
        listEles={listEles}
        onClosePopup={onClosePopup}
    ></DetailPopupScreen>);

    const eleContent: React.ReactElement = (
        <ChatListPopupScreen
            itemMessge = { props}
        ></ChatListPopupScreen>
    );

    return (
        <div className={"currentchat-container"}>
            
            <ModalScreen open={popupShareIsDisplayed} headerContent={"Chuyển tiếp"} context={eleContent} hasPadding={false}>
                <div>
                </div>
            </ModalScreen>

            <ModalScreen open={popupRemoveIsDisplayed} context={eleContext} hasPadding={true} headerContent={"Xác nhận xóa tin nhắn"}>
                <></>
            </ModalScreen>

            <MainPopupScreen context={eleDetailPopup}>
                <div className="currentchat-icon cursor-pointer img-24 flex-center margin-right-8">
                    <IconMoreVertical></IconMoreVertical>
                </div>
            </MainPopupScreen>

            { props.children}
        </div>
    )
}

export default CurrentChatScreen;