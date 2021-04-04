import { useEffect } from 'react'
import { IconPenEdit2 , IconCameraAdd } from "../../Icons/icon.screen";
import "./edit-avatar-button.scss";
import EditAvatarButtonAdapter from './edit-avatar-button.adapter'
import React from "react";
import ModalScreen from '../../../libraries/Features/modal/modal.screen';
import getApiUrl from '../../../libraries/Functions/get-api-url'
import CustomInputScreen from '../../../libraries/Features/custom-input/custom-input.screen';

function EditAvatarScreen(props: any) {
    const {
        isShowPopupEditAvatar, setIsShowPopupEditAvatar,
        ShowPopupEditAvatar,
        HidePopupEditAvatar,
        SelectFile,
        onImageChange,
        mouseOver,
        mouseOut,
        UpdateRoomChat,
        src, setSrc,
        avatar, setAvatar,
        groupName, setGroupName
    } = EditAvatarButtonAdapter()

    const styleCustomInput = {
        backgroundPosition: "14px 50%",
        borderRadius: "0.7rem",
        fontSize: "1rem",
        padding: "12px 20px 12px 10px",
    };

   // If pressed key is our target key then set to true
   const enterHandler=(key:any)=> {
     if(key.code==="Enter"){
        UpdateRoomChat()
     }
  }

  // Add event listeners
  useEffect(() => {
    return () => {
      window.removeEventListener('keydown', enterHandler);
    };
  }, []); // Empty array ensures that effect is only run on mount and unmount

    const eleContextPopupEditAvatar = (close: any) => {
        return (
            <form >
                <div className="edit-avatar-container">
                <div className="edit-avatar-top" onClick={SelectFile}>
                    <div id="div-icon-click" style={avatar ? { display: "none" } : { display: "block" }}>
                        <IconCameraAdd></IconCameraAdd>
                    </div>
                    <div id="div-img-hover" style={avatar ? { display: "block", height: "100%" } : { display: "none", height: "100%" }} onMouseOver={mouseOver} onMouseOut={mouseOut}>
                        <img id="show-img" src={avatar ? getApiUrl(avatar) : ""} style={avatar ? { display: "block", height: "100%", width: "100%" } : { display: "none", height: "100%", width: "100%" }}></img>
                        <div id="div-svg" style={{ display: "none", position: "relative", float: "right", top: "-100px" }} >
                            <IconCameraAdd></IconCameraAdd>
                        </div>
                    </div>
                    <input type="file" className="filetype" onChange={onImageChange} id="group_file" hidden />
                </div>
                <div className="div-subheading-semibold">
                    <span className="subheading-semibold">
                        <CustomInputScreen
                            style={styleCustomInput}
                            class=""
                            placeHolder="Nhập tên nhóm cần thay đổi"
                            isMultiline={false}
                            isTextArea={false}
                            value={groupName}
                            // onChange={ (e:any) =>{ setQuery(e.target.value)} }
                            onChange={(e: any) => (setGroupName(e.target.value))}
                            hasClearText={false}
                            onKeyDown={ (e:any) =>{ enterHandler(e)}}
                        ></CustomInputScreen>
                    </span>
                </div>
                <div className="videocall-bottom flex-center">
                    <button className="btn-outline" onClick={HidePopupEditAvatar}>Hủy</button>
                    <button type="button" onClick={UpdateRoomChat} style={{ marginLeft: "10px" }}>Lưu</button>
                </div>
            </div>
            </form>
        )
    }

    return (
        <div>
            <div className="edit-avatar-button-container cursor-pointer">
                <div onClick={ShowPopupEditAvatar}>
                    <IconPenEdit2></IconPenEdit2>
                </div>
            </div>

            <ModalScreen
                headerContent={"Chỉnh sửa thông tin nhóm"}
                hasPadding={false}
                contextHasClose={eleContextPopupEditAvatar}
                open={isShowPopupEditAvatar}
                funtionCloseNew={HidePopupEditAvatar} >
                <></>
            </ModalScreen>
        </div>


    )
}

export default EditAvatarScreen;