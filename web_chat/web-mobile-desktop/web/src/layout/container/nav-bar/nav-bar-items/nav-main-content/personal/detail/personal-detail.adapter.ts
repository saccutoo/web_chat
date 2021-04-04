import { ENUM_KIND_OF_CONVERSATIONDETAIL } from './../../../../../../../libraries/Enum/conversation-detail';
import { useEffect, useState } from "react";
import useIdInPath from "../../../../../../../libraries/Hooks/useIdInPath";
import PersonalDetailServices from "./personal-detail.services";
import { ENUM_KIND_OF_STATUS } from '../../../../../../../libraries/Enum/status';
import { ENUM_KIND_OF_MESSAGE } from '../../../../../../../libraries/Enum/message';
import EventBus, { EventBusName } from '../../../../../../../helpers/api/event-bus';
import { IChatRoom } from '../../../../../../../type/chatrooms';
import { IUserDetail } from './personal-detail.props';
import ToastifyAdapter from "../../../../../../../libraries/Features/toastify/toastify.adapter";
import { ENUM_KIND_OF_STATUS_CODE } from '../../../../../../../libraries/Enum/status-code';
import { ENUM_KIND_OF_GROUPNOTICHAT } from '../../../../../../../libraries/Enum/group-noti-chat';

function PersonalDetailAdapter() {
    const { error , success } = ToastifyAdapter();

    // state
    const [groupDetail, setGroupDetail] = useState<IChatRoom>({
        id: "",
        avatar: "",
        title: "",
    });
    const [fileInGroup, setFileInGroup] = useState<any[]>([]);
    const [linkInGroup, setLinkInGroup] = useState<any[]>([]);
    const [imageInGroup, setImageInGroup] = useState<any[]>([]);
    const [memberInGroup, setMemberInGroup] = useState<any[]>([]);
    const [activeLi, setActiveLi] = useState<number>(ENUM_KIND_OF_CONVERSATIONDETAIL.IMAGE);
    const [isOpenOverlay, setIsOpenOverlay] = useState<boolean>(false);
    const [hasNoti, setHasNoti] = useState<boolean>(true);
    const [miniImageList, setMiniImageList] = useState<any[]>([]);
    const [isShowPopupConfirm, setIsShowPopupConfirm] = useState<boolean>(false);
    const [isShowPopupConfirmRemoveRoomChat, setIsShowPopupConfirmRemoveRoomChat] = useState<boolean>(false);
    const [memberCurrent, setMemberCurrent] = useState({ userId: "", isAdmin: "0", id: "" });
    const [mainSrcImage, setMainSrcImage] = useState<string>("")
    const [titleState, setTitleState] = useState<string>("")
    const [avatarGroupState, setAvatarGroupState] = useState<string>("")
    const [userDetail, setUserDetail] = useState<IUserDetail>()

    const roomId = useIdInPath(2)
    const userId: string = localStorage.getItem('userId') || "";
    useEffect(() => {
        const getData = async () => {
            const response = await PersonalDetailServices.getInstance().getUserOther(roomId, userId);
            if (response) {
                const result = response.data;
                if (result.length > 0) {
                    setUserDetail(result[0].user);
                }
            }

            const response3 = await PersonalDetailServices.getInstance().getAttachmentImageGroupDetail(roomId);
            if (response3 ) {
                const result3 = response3.data;
                setImageInGroup(result3);
                setMiniImageList(result3);
            }
            const response1 = await PersonalDetailServices.getInstance().getInforGroupDetail(roomId,userId);
            if (response1 ) {
                const result1 = response1.data;
                setGroupDetail(result1);
            }


        }
        getData();
    }, [setGroupDetail, roomId])

    const toggleNoti = () =>{
        setHasNoti(prev => !prev)
    }

    const onChangeActiveLi = async (num: number) => {
        setActiveLi(num);
        switch (num) {
            case ENUM_KIND_OF_CONVERSATIONDETAIL.LINK:
                const response2 = await PersonalDetailServices.getInstance().getLinkGroupDetail(roomId);
                if (response2) {
                    const result2 = response2.data;
                    setLinkInGroup(result2);
                }
                break;
            case ENUM_KIND_OF_CONVERSATIONDETAIL.IMAGE:
                const response3 = await PersonalDetailServices.getInstance().getAttachmentImageGroupDetail(roomId);
                if (response3) {
                    const result3 = response3.data;
                    setImageInGroup(result3);
                    setMiniImageList(result3);
                }
                break;
            case ENUM_KIND_OF_CONVERSATIONDETAIL.FILE:
                const response4 = await PersonalDetailServices.getInstance().getAttachmentFileGroupDetail(roomId);
                if (response4) {
                    const result4 = response4.data;
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
        const response = await PersonalDetailServices.getInstance().deleteUserInChatRoomMember(data);
        if (response) {
            setIsShowPopupConfirm(false)
            const response = await PersonalDetailServices.getInstance().getUserById(userId);
            setMemberInGroup(prev => prev.filter(member => member.user_id !== userId))

            let messageSend: any = {
                message: response.data.lastName + " " + response.data.firstName + " đã bị xóa khỏi nhóm",
                messageType: ENUM_KIND_OF_MESSAGE.TEXT,
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
            await PersonalDetailServices.getInstance().sendMessage(messageSend);
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

        const response = await PersonalDetailServices.getInstance().updatePermissionRoomChat(data);
        if (response) {
            const response = await PersonalDetailServices.getInstance().getUserById(userId);
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
            await PersonalDetailServices.getInstance().sendMessage(messageSend);
            EventBus.getInstance().post({
                type: EventBusName.PUSH_UPDATE_AVATAR,
                payload: data,
            });
        }
        else {
            error(response.data.message)
        }
    }

    const deleteRoomChatAdapter = async () => {
        const response = await PersonalDetailServices.getInstance().deleteChatRoom(roomId, localStorage.getItem("userId") || "");
        if (response && response.status==ENUM_KIND_OF_STATUS_CODE.SUCCESS) {
            success("Bạn đã xóa thành công nhóm")
            setIsShowPopupConfirmRemoveRoomChat(true);
            setTimeout(function(){
                window.location.href=window.location.origin;
              }, 1500);
        }
        else {
            error(response.message)
        }
    }


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
        userDetail, setUserDetail,
        toggleNoti
    }
}

export default PersonalDetailAdapter;