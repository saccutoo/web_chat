import React from 'react';
import ModalScreen from '../../../../../../../libraries/Features/modal/modal.screen';
import DetailPopupScreen from '../../../../../../../libraries/Features/popup/detail-popup/detail-popup.screen';
import MainPopupScreen from '../../../../../../../libraries/Features/popup/main-popup/main-popup.screen';
import TooltipScreen from '../../../../../../../libraries/Features/tooltip/tooltip.screen';
import useIdInPath from '../../../../../../../libraries/Hooks/useIdInPath';
import { IconBellNotificationOn, IconInformationInforLine, IconMoreVertical, IconSearchLoupe, IconSignoutRight, IconTrashDeleteBin, IconVolumeOff } from '../../../../../../../libraries/Icons/icon.screen';
import GroupConversationAdapter from './group-conversation.adapter';

function GroupConversationScreen(props: any) {
    var roomId=useIdInPath(2);
    const {
        isShowPopupConfirmRemoveChat,setIsShowPopupConfirmRemoveChat,
        roomChatId,setRoomChatId,
        deleteRoomChat,
        updateNotification,
        onNotification , setOnNotification
      } = GroupConversationAdapter();
      const{ onSearch,onClickIntroduce } = props;

    const showPopUpRemoveRoomChat=()=>{
        setIsShowPopupConfirmRemoveChat(true);
    }
    const closePopup=()=>{
        setIsShowPopupConfirmRemoveChat(false);
    }
    const eleContextRemoveChatRoom = (props: any) => {
        return (
          <div className="popupsignoutgroup-container">
            <div className="popupsignoutgroup-text">
              <p>Bạn chắc chắn thực hiện hành động này ?</p>
    
            </div>
            <div className="popupsignoutgroup-button">
              <button onClick={closePopup} className="btn-outline" >Hủy</button>
              <button onClick={deleteRoomChat}>Xác nhận</button>
            </div>
          </div>
        )
    }
    const turnOffNotification=()=>{return updateNotification("0")}
    const turnOnNotificationScreen=()=>{return updateNotification("1")}
    const listEles = [
        {
            onClick: onSearch,
            icon: <IconSearchLoupe></IconSearchLoupe>,
            text: "Tìm kiếm"
        },
        {
            onClick: onNotification=="0" ? turnOnNotificationScreen : turnOffNotification,
            icon: onNotification=="0" ? <IconBellNotificationOn></IconBellNotificationOn> :<IconVolumeOff></IconVolumeOff>,
            text: onNotification=="0" ? "Tắt thông báo" : "Mở thông báo"
        },
        // {
        //     onClick: onClickIntroduce,
        //     icon: <IconInformationInforLine></IconInformationInforLine>,
        //     text: "Giới thiệu"
        // },
        {
            onClick: null,
            icon: <IconSignoutRight></IconSignoutRight>,
            text: "Thoát khỏi nhóm"
        },
        {
            onClick: showPopUpRemoveRoomChat,
            icon: <IconTrashDeleteBin></IconTrashDeleteBin>,
            text: "Xóa nhóm"
        }
    ];
    const eleDetailPopup = (onClosePopup: any) => (<DetailPopupScreen
        listEles={listEles}
        onClosePopup={onClosePopup}
    ></DetailPopupScreen>);

    return (
        <>
            <TooltipScreen context="Tìm kiếm">
                <div>
                    <IconSearchLoupe onClick={onSearch} className="cursor-pointer"></IconSearchLoupe>
                </div>
            </TooltipScreen>
            <MainPopupScreen context={eleDetailPopup}>
                <div>
                    <TooltipScreen position={ ['bottom center'] } context="Chức năng khác">
                        <div className="cursor-pointer icon-svg--hover">
                            <IconMoreVertical></IconMoreVertical>
                        </div>
                    </TooltipScreen>
                </div>
            </MainPopupScreen>
            <ModalScreen headerContent={"Xóa cuộc trò chuyện"} hasPadding={true} contextHasClose={eleContextRemoveChatRoom} open={isShowPopupConfirmRemoveChat} funtionCloseNew={closePopup}>
                <></>
            </ModalScreen>
        </>
    )
}

export default GroupConversationScreen;






