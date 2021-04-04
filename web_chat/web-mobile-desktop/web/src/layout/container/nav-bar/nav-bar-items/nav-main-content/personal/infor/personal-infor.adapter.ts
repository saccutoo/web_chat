import { ENUM_KIND_OF_CONVERSATIONDETAIL } from '../../../../../../../libraries/Enum/conversation-detail';
import { useEffect, useState } from "react";
import useIdInPath from "../../../../../../../libraries/Hooks/useIdInPath";
import PersonalInforServices from "./personal-infor.services";

import { IChatRoom } from '../../../../../../../type/chatrooms';
import { IUserDetail } from './personal-infor.props';

function PersonalDetailAdapter() {
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
    const [userIdMain, setUserIdMain] = useState<string>("")
    const [userDetail, setUserDetail] = useState<IUserDetail>()

    const userId = useIdInPath(2)
    useEffect(() => {
        const getData = async () => {
            const response = await PersonalInforServices.getInstance().getUserById(userId);
            if (response) {
                const result = response.data;
                setUserDetail(result)
            }
        }
        getData();
    }, [setUserDetail, userId])


    // useEffect(() =>{
    //     window.addEventListener('keydown', closeImageOverlayByEscKey );

    //     return() =>{
    //         window.removeEventListener('keydown', closeImageOverlayByEscKey );
    //     }
    // })

    const onChangeActiveLi = async (num: number) => {
        setActiveLi(num);
        switch (num) {
            case ENUM_KIND_OF_CONVERSATIONDETAIL.LINK:
                // const response2 = await PersonalInforServices.getInstance().getLinkGroupDetail(roomId);
                // if (response2) {
                //     const result2 = response2.data;
                //     setLinkInGroup(result2);
                // }
                break;
            case ENUM_KIND_OF_CONVERSATIONDETAIL.IMAGE:
                // const response3 = await PersonalInforServices.getInstance().getAttachmentImageGroupDetail(roomId);
                // if (response3) {
                //     const result3 = response3.data;
                //     setImageInGroup(result3);
                //     setMiniImageList(result3);
                // }
                break;
            case ENUM_KIND_OF_CONVERSATIONDETAIL.FILE:
                // const response4 = await PersonalInforServices().getInstance().getAttachmentFileGroupDetail(roomId);
                // if (response4) {
                //     const result4 = response4.data;
                //     setFileInGroup(result4);
                // }
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
        titleState, setTitleState,
        avatarGroupState, setAvatarGroupState,
        userDetail, setUserDetail
    }
}

export default PersonalDetailAdapter;