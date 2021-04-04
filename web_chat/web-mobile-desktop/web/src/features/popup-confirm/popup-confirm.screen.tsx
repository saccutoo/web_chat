import React, { useState } from 'react';
import CircleAvatarScreen from '../../libraries/Features/circle-avtar/circle-avatar.screen';
import ModalScreen from '../../libraries/Features/modal/modal.screen';
import {ENUM_KIND_OF_MESSAGE_TYPE} from '../../libraries/Enum/messageType'
import { IChat } from "../../layout/container/nav-bar/nav-bar-items/nav-main-content/conversation/main/conversation.props"
import { ENUM_KIND_OF_MESSAGE_VIDEO_CALL,ENUM_TYPE_STATUS_VIDEO_CALL } from '../../libraries/Enum/video-call';
import { ENUM_KIND_OF_MESSAGE } from '../../libraries/Enum/message';
import { ENUM_KIND_OF_STATUS } from '../../libraries/Enum/status';

const PopUpConfirmScreen = (props: any) => {
  return (
    <div className="videocall-container">
      <div className="videocall-top">
        Bạn chắc chắn chắn muốn xóa vịnh khỏi nhóm chát?.
      </div>
      <div className="videocall-bottom flex-center">
        <button className="btn-outline"  onClick={props.closeCallVideo}>Từ chối</button>

        <button onClick={props.start}>Đồng ý</button>
      </div>
    </div>
  )
}


function PopupConfirm(props: any) {
  // state
  const [popupConfirmIsDisplayed , setPopupConfirmIsDisplayed] = useState<boolean>(false);

  React.useEffect(() => {
    if(props && props.isShow && props.isShow === true){
      setPopupConfirmIsDisplayed(props.isShow);
    }
  })
  const eleContextSignout = (close: any) => {
    return (
      <PopUpConfirmScreen  userName={"vinh"} close={close}></PopUpConfirmScreen>
    )
  }

  return (

    <ModalScreen
      headerContent={"Thông báo"}
      hasPadding={true}
      contextHasClose={eleContextSignout}
      open={popupConfirmIsDisplayed}
    >
      <></>
    </ModalScreen>
  );
}

export default PopupConfirm;



