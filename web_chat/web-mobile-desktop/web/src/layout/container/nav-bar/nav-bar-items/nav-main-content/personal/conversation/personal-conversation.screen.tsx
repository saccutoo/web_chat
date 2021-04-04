// @ts-nocheck
import React from 'react';
import DetailPopupScreen from '../../../../../../../libraries/Features/popup/detail-popup/detail-popup.screen';
import MainPopupScreen from '../../../../../../../libraries/Features/popup/main-popup/main-popup.screen';
import TooltipScreen from '../../../../../../../libraries/Features/tooltip/tooltip.screen';
import useIdInPath from "../../../../../../../libraries/Hooks/useIdInPath"
import { IconSearchLoupe , IconVolumeOff , IconTrashDeleteBin , IconVideoCircleLine, IconMoreVertical,IconBellNotificationOn,IconInformationInforLine } from '../../../../../../../libraries/Icons/icon.screen';
import PersonalConversationAdapter from './personal-conversation.adapter'
import ModalScreen from '../../../../../../..../../../libraries/Features/modal/modal.screen';
 
function PersonalConversationScreen(props: any) {
    const roomId = useIdInPath(2);
    const { onSearch,onClickIntroduce } = props;

    const {
        deleteRoomChat,
        updateNotification,
        onNotification ,
        showPopUpRemoveRoomChat,
        closePopup,
        isShowPopupConfirmRemoveChat
      } = PersonalConversationAdapter();

    const clickCallVideo=()=>{              
         window.open(window.location.protocol+"/video-call?roomName="+roomId+"&userId="+localStorage.getItem('userId')+"&isCall=1","_blank","width=1000,height=1000"); 
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
            onClick: onNotification === "0" ? turnOnNotificationScreen : turnOffNotification,
            icon: onNotification === "0" ? <IconBellNotificationOn></IconBellNotificationOn> :<IconVolumeOff></IconVolumeOff>,
            text: onNotification === "0" ? "Tắt thông báo" : "Mở thông báo"
        },
        // {
        //     onClick: onClickIntroduce,
        //     icon: <IconInformationInforLine></IconInformationInforLine>,
        //     text: "Giới thiệu"
        // },
        {
            onClick: showPopUpRemoveRoomChat,
            icon: <IconTrashDeleteBin></IconTrashDeleteBin>,
            text:  "Xóa chat" 
        }
    ];

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

    
    const eleDetailPopup =(onClosePopup: any) =>(<DetailPopupScreen 
                                                    listEles={ listEles } 
                                                    onClosePopup={ onClosePopup }
                                                ></DetailPopupScreen>);

    return (
        <>
            <TooltipScreen position={ ['bottom center'] } context="Gọi video">
                <div onClick={()=>clickCallVideo()} className="cursor-pointer">
                    <IconVideoCircleLine className="icon-svg--hover"></IconVideoCircleLine>
                </div>
            </TooltipScreen>
            <TooltipScreen context="Tìm kiếm">
                <div className="cursor-pointer">
                    <IconSearchLoupe onClick={ onSearch } className="icon-svg--hover"></IconSearchLoupe>
                </div>
            </TooltipScreen>
            <MainPopupScreen context={ eleDetailPopup }>
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

export default PersonalConversationScreen;
