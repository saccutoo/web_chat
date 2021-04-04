// @ts-nocheck
import React, { useState } from 'react'
import EditAvatarButtonServices from './edit-avatar-button.services'
import useIdInPath from "../../../libraries/Hooks/useIdInPath";
import {ENUM_KIND_OF_STATUS_CODE} from '../../Enum/status-code'
import EventBus, {
    EventBusName,
  } from "../../../helpers/api/event-bus";
import FileServices from '../../../helpers/services/file';
import { error } from 'console';
import ToastifyAdapter from "../../../libraries/Features/toastify/toastify.adapter";

function EditAvatarButtonAdapter() {
    const roomId = useIdInPath(2)
    const { warning,error,success } = ToastifyAdapter();
    
    // state
    const [isShowPopupEditAvatar , setIsShowPopupEditAvatar] = useState<boolean>(false);
    const [src , setSrc] = useState<any>();
    const [avatar , setAvatar] = useState<any>();
    const [groupName , setGroupName] = useState<any>();
    const [avatarNew , setAvatarNew] = useState<any>();
    const [groupNameOld , setGroupNameOld] = useState<any>();


    const ShowPopupEditAvatar = () => {
        setIsShowPopupEditAvatar(true);
        (async () => {
            const response = await EditAvatarButtonServices.getInstance().getRoomChatById(roomId);
            if(response){
                if(response.result[0].avatar !="undefined" && response.result[0].avatar !=undefined && response.result[0].avatar !=null){
                    setAvatar(response.result[0].avatar);
                }
                setGroupName(response.result[0].title);
            }
         })();  
    }

    const HidePopupEditAvatar = () => { 
        setIsShowPopupEditAvatar(prev => !prev);
    }

    const SelectFile = () => {
        document.getElementById('group_file')?.click();
    }

    const onImageChange = (event: any) => {
        event.preventDefault();
        if (event && event.target && event.target.files[0]) {
            if(event.target.files[0].name.indexOf('.png') >-1 || event.target.files[0].name.indexOf('.jpg') >-1 || event.target.files[0].name.indexOf('.jfif') >-1){
                const sizeInMB = (event.target.files[0].size / (1024*1024)).toFixed(2);
                if(parseFloat(sizeInMB)>4){
                    return error("File không được vượt quá 4 MB");
                }
                let file = event.target.files[0];
                let reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onloadend = () => {
                    setSrc(reader.result);
                    document.getElementById("show-img").src = reader.result;
                    document.getElementById("show-img").style.display = "block";
                    document.getElementById("div-img-hover").style.display = "block";
                    document.getElementById("div-icon-click").style.display = "none";
                };
            }
            else{
                return error("Đây không phải là file ảnh");
            }
           
        }
    }

    const UpdateRoomChat = async () => {
        var input = document.getElementById('group_file');
        if (!input || !input.files || !input.files[0] ) {
            if(avatar){
                const data={
                    id:roomId,
                    avatar:avatar,
                    userId:localStorage.getItem('userId'),
                    title:groupName
                }
                const responseUpdateAvatar = await EditAvatarButtonServices.getInstance().updateAvatar(data);
                if(responseUpdateAvatar && responseUpdateAvatar.status===ENUM_KIND_OF_STATUS_CODE.SUCCESS){
                    success("Cập nhật ảnh thành công.");
                    setIsShowPopupEditAvatar(false);

                    EventBus.getInstance().post({
                        type: EventBusName.PUSH_UPDATE_AVATAR,
                        payload: data,
                    });
                }
                else{
                    return error(responseUpdateAvatar.message);
                }
            }
            else{
                return error("Bạn chưa chọn ảnh.");
            }
        }
        else {
            const formData = new FormData();
            formData.append('fileContent', input.files[0]);

            const response = await FileServices.send(formData);

            if (response && response.status === ENUM_KIND_OF_STATUS_CODE.SUCCESS) {
                const avatarId = response.data[0].guid || "";   

                const data={
                    id:roomId,
                    avatar:avatarId,
                    userId:localStorage.getItem('userId'),
                    title:groupName
                }
                const responseUpdateAvatar = await EditAvatarButtonServices.getInstance().updateAvatar(data);

                if(responseUpdateAvatar && responseUpdateAvatar.status===ENUM_KIND_OF_STATUS_CODE.SUCCESS){
                    success("Cập nhật ảnh thành công.");
                    setIsShowPopupEditAvatar(false)
                    EventBus.getInstance().post({
                        type: EventBusName.PUSH_UPDATE_AVATAR,
                        payload: data,
                    });
                }
                else{
                    error(responseUpdateAvatar.message);
                    return
                }
            }
        }
    }

    const mouseOver = () => {
        document.getElementById("div-img-hover").style.opacity = "0.6";
        document.getElementById("div-svg").style.display = "block";
    }

    function mouseOut() {
        document.getElementById("div-img-hover").style.opacity = "1";
        document.getElementById("div-svg").style.display = "none";
    }

    return {
        isShowPopupEditAvatar, setIsShowPopupEditAvatar,
        ShowPopupEditAvatar,
        HidePopupEditAvatar,
        SelectFile,
        onImageChange,
        mouseOver,
        mouseOut,
        UpdateRoomChat,
        src, setSrc,
        avatar , setAvatar,
        groupName , setGroupName
    }
}

export default EditAvatarButtonAdapter;