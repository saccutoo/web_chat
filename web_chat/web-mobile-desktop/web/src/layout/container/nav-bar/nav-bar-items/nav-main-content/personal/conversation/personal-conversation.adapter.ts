import { useEffect, useState } from "react";
import PersonalConversationServices from "./personal-conversation.services";
import { ENUM_KIND_OF_STATUS_CODE } from '../../../../../../../libraries/Enum/status-code';
import useIdInPath from '../../../../../../../libraries/Hooks/useIdInPath';
import EventBus, {
  EventBusType,
} from "../../../../../../../helpers/api/event-bus";
import { EventBusName } from "../../../../../../../helpers/api/event-bus";
import { Subscription } from 'rxjs';
import ToastifyAdapter from "../../../../../../../libraries/Features/toastify/toastify.adapter";

function PersonalConversationAdapter() {
  // state
  const [isShowPopupConfirmRemoveChat, setIsShowPopupConfirmRemoveChat] = useState<boolean>(false);
  const [onNotification, setOnNotification] = useState("0");

  const subscriptions = new Subscription();
  const { error, success } = ToastifyAdapter();
  const roomId = useIdInPath(2);
  const userId = localStorage.getItem('userId')

  // TODO: thaolt
  //  useEffect(() => {
  //    (async () => {
  //       const data={
  //         chatRoomId:roomChatId,
  //         userId:localStorage.getItem("userId") || ""
  //     }
  //     const response= await PersonalConversationServices().getInstance().getChatRoomMemberByUserIdAndChatRoomId(data);
  //     if(response && response.data && response.data.message){
  //       setOnNotification(response.data.message.onNotification);
  //     }
  //     })();

  //     subscriptions.add(
  //       EventBus.getInstance().events.subscribe((res: EventBusType) => {
  //         const payload = res?.payload;
  //         if (payload) {
  //           switch (res?.type) {
  //             case EventBusName.PUSH_NOTIFICATION_ON_OFF:
  //               setOnNotification(payload);
  //               break;
  //           }
  //         }
  //       })
  //     );
  //   },[]);


  // useEffect(() => {
  //   return () => {
  //       subscriptions.unsubscribe();
  //   };
  // }, []);

  const deleteRoomChat = async () => {
    const response = await PersonalConversationServices().getInstance().deleteChatRoom(roomId, localStorage.getItem("userId") || "");
    if (response.status === ENUM_KIND_OF_STATUS_CODE.SUCCESS) {
      success("Bạn đã xóa thành công nhóm")
      setTimeout(function () {
        window.location.href = window.location.origin;
      }, 1500);
    }
    else {
      return error(response.message)
    }
  }

  // hungdm - sửa  response.data.status -> response.status - 15/03/2021
  const updateNotification = async (onNotification: string) => {
    const data = {
      onNotification: onNotification,
      chatRoomId: roomId,
      userId: userId
    }
    const response = await PersonalConversationServices().getInstance().updateNotification(data);
    // hungdm - respon.data.status -> response.status
    if (response.status === ENUM_KIND_OF_STATUS_CODE.SUCCESS) {
      if (onNotification === "0") {
        success("Tắt thông báo thành công")
      }
      if (onNotification === "1") {
        success("Bật thông báo thành công")
      }
      setOnNotification(onNotification);
    }
    else {
      error(response.message)
    }
  }


  const showPopUpRemoveRoomChat = () => {
    setIsShowPopupConfirmRemoveChat(true);
  }
  const closePopup = () => {
    setIsShowPopupConfirmRemoveChat(false);
  }

  return {
    deleteRoomChat,
    updateNotification,
    onNotification,
    showPopUpRemoveRoomChat,
    closePopup,
    isShowPopupConfirmRemoveChat
  }

}

export default PersonalConversationAdapter;
