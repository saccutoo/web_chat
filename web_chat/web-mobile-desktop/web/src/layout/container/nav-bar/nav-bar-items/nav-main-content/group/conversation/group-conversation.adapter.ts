import { useEffect, useState } from "react";
import { ENUM_KIND_OF_STATUS_CODE } from '../../../../../../../libraries/Enum/status-code';
import useIdInPath from '../../../../../../../libraries/Hooks/useIdInPath';
import EventBus, {
    EventBusType,
} from "../../../../../../../helpers/api/event-bus";
import { EventBusName } from "../../../../../../../helpers/api/event-bus";
import { Subscription } from 'rxjs';
import ToastifyAdapter from "../../../../../../../libraries/Features/toastify/toastify.adapter";
import GroupConversationServices from "./group-conversation.services";


function GroupConversationAdapter() {

    const subscriptions = new Subscription();
    const { warning, error, success } = ToastifyAdapter();

    var roomId = useIdInPath(2);
    const [isShowPopupConfirmRemoveChat, setIsShowPopupConfirmRemoveChat] = useState<boolean>(false);
    const [roomChatId, setRoomChatId] = useState(roomId);
    const [userId, setUserId] = useState(localStorage.getItem('userId'));
    const [onNotification, setOnNotification] = useState("0");

    useEffect(() => {
        return () => {
            subscriptions.unsubscribe();
        };
    }, []);
    // hungdm - lấy trạng thái thông báo user trong nhóm 
    useEffect(() => {
        const getData = async () => {
            const params = {
                chatRoomId: roomId,
                userId: localStorage.getItem("userId") || ""
            }
            const response = await GroupConversationServices().getInstance().getChatRoomMemberByUserIdAndChatRoomId(params);
            if (response) {
                if (response.data) {
                    console.log(response.data);
                    setOnNotification(response.data.onNotification);
                }
            }
        }
        getData();
    }, [roomId]);

    const deleteRoomChat = async () => {
        const response = await GroupConversationServices().getInstance().deleteChatRoom(roomChatId, localStorage.getItem("userId") || "");
        if (response.status == ENUM_KIND_OF_STATUS_CODE.SUCCESS) {
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
            chatRoomId: roomChatId,
            userId: userId
        }
        const response = await GroupConversationServices().getInstance().updateNotification(data);
        if (response.status == ENUM_KIND_OF_STATUS_CODE.SUCCESS) {
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

    return {
        isShowPopupConfirmRemoveChat, setIsShowPopupConfirmRemoveChat,
        roomChatId, setRoomChatId,
        deleteRoomChat,
        updateNotification,
        onNotification, setOnNotification
    }

}

export default GroupConversationAdapter;
