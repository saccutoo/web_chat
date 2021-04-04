import { ENUM_KIND_OF_CONVERSATIONDETAIL } from './../../../../../../../libraries/Enum/conversation-detail';
import { useEffect, useState } from "react";
import { ENUM_KIND_OF_STATUS_CODE } from "../../../../../../../libraries/Enum/status-code";
import useIdInPath from "../../../../../../../libraries/Hooks/useIdInPath";
import GroupDetailServices from "./group-detail.services";
import { ENUM_KIND_OF_STATUS } from '../../../../../../../libraries/Enum/status';
import { ENUM_KIND_OF_MESSAGE } from '../../../../../../../libraries/Enum/message';
import EventBus, {
    EventBusName,
    EventBusType,
} from "../../../../../../../helpers/api/event-bus";
import { IChatRoom } from '../../../../../../../type/chatrooms';
import ToastifyAdapter from "../../../../../../../libraries/Features/toastify/toastify.adapter";
import CompanyMemberListServices from '../../../nav-company-members/main/company-member-list.services';
import { useHistory } from 'react-router';
import { ENUM_KIND_OF_GROUPNOTICHAT } from '../../../../../../../libraries/Enum/group-noti-chat';

function GroupDetailAdapter() {
    const history = useHistory();
    const { warning, error, success } = ToastifyAdapter();

    const [groupDetail, setGroupDetail] = useState<IChatRoom>({
        id: "",
        avatar: "",
        title: "",
    });
    const [fileInGroup, setFileInGroup] = useState<any[]>([]);
    const [linkInGroup, setLinkInGroup] = useState<any[]>([]);
    const [imageInGroup, setImageInGroup] = useState<any[]>([]);
    const [memberInGroup, setMemberInGroup] = useState<any[]>([]);
    const [activeLi, setActiveLi] = useState<number>(ENUM_KIND_OF_CONVERSATIONDETAIL.MEMBER);
    const [isOpenOverlay, setIsOpenOverlay] = useState<boolean>(false);
    const [hasNoti, setHasNoti] = useState<boolean>(true);
    const [miniImageList, setMiniImageList] = useState<any[]>([]);
    const [isShowPopupConfirm, setIsShowPopupConfirm] = useState<boolean>(false);
    const [isShowPopupConfirmRemoveRoomChat, setIsShowPopupConfirmRemoveRoomChat] = useState<boolean>(false);
    const [memberCurrent, setMemberCurrent] = useState({ userId: "", isAdmin: "0", id: "" });
    const [mainSrcImage, setMainSrcImage] = useState<string>("")
    const [titleState, setTitleState] = useState<string>("")
    const [avatarGroupState, setAvatarGroupState] = useState<string>("")
    const [isAdminCurrent, setIsAdmin] = useState<string>("")
    const roomId = useIdInPath()
    const userId: string = localStorage.getItem('userId') || "";
    useEffect(() => {
        const getData = async () => {
            // hungdm - thêm params user_id
            const response = await GroupDetailServices.getInstance().getGroupDetail(roomId,userId);
            if (response) {
                setMemberInGroup(response.data);
                setActiveLi(ENUM_KIND_OF_CONVERSATIONDETAIL.MEMBER)
            }
        }
        getData();

    }, [roomId])

    // useEffect(() => {
    //     const getData = async () => {
    //         setActiveLi(ENUM_KIND_OF_CONVERSATIONDETAIL.MEMBER);
    //         const response1 = await GroupDetailServices.getInstance().getInforGroupDetail(roomId);
    //         if (response1) {
    //             const result1 = response1.data;
    //             setGroupDetail(result1[0]);
    //         }
    //     }
    //     getData();

    // }, [roomId])

    //vinhtq:09/03/2021 : chạy hàm lấy thông tin room chat member
    useEffect(() => {
        (async () => {
            const data = {
                chatRoomId: roomId,
                userId: localStorage.getItem("userId") || ""
            }
            const response = await GroupDetailServices.getInstance().getChatRoomMemberByUserIdAndChatRoomId(data);
            if (response && response.data) {
                setIsAdmin(response.data.isAdmin);
                if (response.data.onNotification === "1") setHasNoti(true);
                else setHasNoti(false)
            }
        })();
    }, [])
    //end chạy hàm lấy thông tin room chat member

    const onChangeActiveLi = async (num: number) => {
        setActiveLi(num);
        switch (num) {
            case ENUM_KIND_OF_CONVERSATIONDETAIL.MEMBER:
                // hungdm - thêm params userId
                const response = await GroupDetailServices.getInstance().getGroupDetail(roomId,userId);
                if (response) {
                    const result = response.data;
                    setMemberInGroup(result);
                }
                break;
            case ENUM_KIND_OF_CONVERSATIONDETAIL.LINK:
                const response2 = await GroupDetailServices.getInstance().getLinkGroupDetail(roomId);
                if (response2) {
                    const result2 = response2.data;
                    setLinkInGroup(result2);
                }
                break;
            case ENUM_KIND_OF_CONVERSATIONDETAIL.IMAGE:
                const response3 = await GroupDetailServices.getInstance().getAttachmentImageGroupDetail(roomId);
                if (response3) {
                    const result3 = response3.data;
                    setImageInGroup(result3);
                    setMiniImageList(result3);
                }
                break;
            case ENUM_KIND_OF_CONVERSATIONDETAIL.FILE:
                const response4 = await GroupDetailServices.getInstance().getAttachmentFileGroupDetail(roomId);
                if (response4) {
                    const result4 = response4.data;
                    // console.log("result4");
                    // console.log(result4);
                    setFileInGroup(result4);
                }
                break;
        }
    }

    const toggleOverlay = (srcImage: string) => {
        if (isOpenOverlay) {
            setMainSrcImage("");
        } else {
            setMainSrcImage(srcImage);
        }

        setIsOpenOverlay(prev => !prev);
    }


    const deleteUserInChatRoomMemberAdapter = async (userId: any) => {
        const data = {
            userId: userId,
            chatRoomId: roomId,
            userIdSend: localStorage.getItem('userId')
        }
        const response = await GroupDetailServices.getInstance().deleteUserInChatRoomMember(data);
        if (response) {
            setIsShowPopupConfirm(false)
            const response = await GroupDetailServices.getInstance().getUserById(userId);
            setMemberInGroup(prev => prev.filter(member => member.user_id !== userId))
            let messageSend: any = {
                message: response.data.lastName + " " + response.data.firstName + " đã bị xóa khỏi nhóm",
                messageType: ENUM_KIND_OF_MESSAGE.SYSTEM,
                messageStatus: ENUM_KIND_OF_GROUPNOTICHAT.KICK_MEMBER,
                userId: userId,
                user: {
                    userName: "",
                    status: ENUM_KIND_OF_STATUS.ACTIVE,
                    id: userId
                },
                chatRoomId: roomId,
                createdAt: new Date(),
                attachments: []
            }
            await GroupDetailServices.getInstance().sendMessage(messageSend);
            EventBus.getInstance().post({
                type: EventBusName.PUSH_UPDATE_AVATAR,
                payload: data,
            });
        }
    }


    const updatePermissionAdminRoomAdapter = async (id: any, userId: any, isAdmin: any) => {
        const data = {
            userId: userId,
            chatRoomId: roomId,
            isAdmin: isAdmin,
            userIdSend: localStorage.getItem('userId')
        }

        const response = await GroupDetailServices.getInstance().updatePermissionRoomChat(data);
        if (response && response.status === ENUM_KIND_OF_STATUS_CODE.SUCCESS) {
            const response = await GroupDetailServices.getInstance().getUserById(userId);
            const item = memberInGroup.filter(s => s.id === id)[0];
            item.isAdmin = parseInt(isAdmin);
            setMemberInGroup(prev => prev.filter(member => (member.id === id ? item : member)))

            var message = "";
            if (isAdmin === "1") {
                message = response.data.lastName + " " + response.data.firstName + " được chỉ định làm admin";
            }
            else {
                message = response.data.lastName + " " + response.data.firstName + " bị hủy bỏ vai trò admin";
            }

            let messageSend: any = {
                message: message,
                messageType: ENUM_KIND_OF_MESSAGE.SYSTEM,
                messageStatus: ENUM_KIND_OF_GROUPNOTICHAT.MAKE_ADMIN,
                userId: userId,
                user: {
                    userName: "",
                    status: ENUM_KIND_OF_STATUS.ACTIVE,
                    id: userId
                },
                chatRoomId: roomId,
                createdAt: new Date(),
                attachments: []
            }
            await GroupDetailServices.getInstance().sendMessage(messageSend);

            EventBus.getInstance().post({
                type: EventBusName.PUSH_UPDATE_AVATAR,
                payload: data,
            });
        }
        else {
            error(response.message)
        }
    }
    

    const deleteRoomChatAdapter = async () => {
        const response = await GroupDetailServices.getInstance().deleteChatRoom(roomId, localStorage.getItem("userId") || "");
        if (response && response.status === ENUM_KIND_OF_STATUS_CODE.SUCCESS) {
            success("Bạn đã xóa thành công nhóm")
            setIsShowPopupConfirmRemoveRoomChat(true);
            // EventBus.getInstance().post({
            //     type: EventBusName.PUSH_UPDATE_AVATAR,
            //     payload: data,
            // });
            setTimeout(function(){
                window.location.href=window.location.origin;
              }, 1500);
        }
        else {
            return error(response.message)
        }
    }

    //vinhtq : 09/03/2021:thêm hàm cập nhật thông báo
    const updateNotification = async (onNotification: string) => {
        const data = {
            onNotification: onNotification,
            chatRoomId: roomId,
            userId: localStorage.getItem("userId") || ""
        }
        const response = await GroupDetailServices.getInstance().updateNotification(data);
        if (response && response.status === ENUM_KIND_OF_STATUS_CODE.SUCCESS) {
            if (onNotification === "0") {
                success("Tắt thông báo thành công")
                setHasNoti(false)
            }
            if (onNotification === "1") {
                success("Bật thông báo thành công")
                setHasNoti(true)
            }
            EventBus.getInstance().post({
                type: EventBusName.PUSH_NOTIFICATION_ON_OFF,
                payload: onNotification,
            });
        }
        else {
            return error(response.message)
        }
    }

    const UserOutRoomChat= async ()=>{
        const data = {
            userId: localStorage.getItem('userId'),
            chatRoomId: roomId
        }
        const response = await GroupDetailServices.getInstance().userOutChatRoom(data);
        if(response && response.status === ENUM_KIND_OF_STATUS_CODE.SUCCESS){

            let messageSend: any = {
                message: response.data.user.lastName + " " + response.data.user.firstName + " đã rời khỏi nhóm " + response.data.chatRoom.title,
                messageType: ENUM_KIND_OF_MESSAGE.TEXT,
                messageStatus: ENUM_KIND_OF_STATUS.ACTIVE,
                userId: data.userId,
                user: {
                    userName: "",
                    status: ENUM_KIND_OF_STATUS.ACTIVE,
                    id: data.userId
                },
                chatRoomId: roomId,
                createdAt: new Date(),
                attachments: []
            }
            const responseSendMessage = await GroupDetailServices.getInstance().sendMessage(messageSend);
            if(responseSendMessage && responseSendMessage.status === ENUM_KIND_OF_STATUS_CODE.SUCCESS){
                setTimeout(function(){
                    window.location.href=window.location.origin;
                  }, 1500);
            }
        }
        else{
            if(response){
                return error(response.message)
            }
        }
    }
    // hungdm - sửa thành rederect về chat - Check xem 2 user này đã từng nói chuyện với nhau chưa - đã có nhóm chat riêng chưa ?
  // Nếu chưa có thì tạo 1 room mới
  // Nếu có rồi redirect về trang chat riêng
  const redirectToChatDetail = async (id: string) => {
    let kind = "g";
    const userId: string = localStorage.getItem('userId') || "";
    const arrUserId = [id, userId];
    const params = { userIdList: arrUserId }
    const response = await CompanyMemberListServices.getInstance().getSingleRoom(params);
    if (response && response.status === ENUM_KIND_OF_STATUS_CODE.SUCCESS && response.data && response.data.id) {
      // Đã tồn tại room giữa 2 người
      history.push(`/${kind}/${response.data.id}`);
    }
    else {
      history.push(`/${kind}/${id}`);
    }
  };
    return {
        activeLi,
        toggleOverlay,
        hasNoti, setHasNoti,
        isOpenOverlay,
        mainSrcImage,
        onChangeActiveLi,
        memberInGroup,
        imageInGroup,
        linkInGroup,
        groupDetail,
        fileInGroup,
        isShowPopupConfirm, setIsShowPopupConfirm,
        memberCurrent, setMemberCurrent,
        miniImageList,
        deleteUserInChatRoomMemberAdapter,
        updatePermissionAdminRoomAdapter,
        deleteRoomChatAdapter,
        isShowPopupConfirmRemoveRoomChat, setIsShowPopupConfirmRemoveRoomChat,
        titleState, setTitleState,
        avatarGroupState, setAvatarGroupState,
        updateNotification,
        isAdminCurrent, setIsAdmin,
        UserOutRoomChat,
        redirectToChatDetail
    }
}

export default GroupDetailAdapter;


