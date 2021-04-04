import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { ENUM_KIND_OF_CONVERSATIONDETAIL } from '../../../../../../../libraries/Enum/conversation-detail';
import IconCirclePanel from '../../../../../../../libraries/Features/icon-circle-panel/icon-circle-panel.screen';
import ImageOverlayScreen from '../../../../../../../libraries/Features/image-overlay-full-screen/image-overlay-full.screen';
import getApiUrl from '../../../../../../../libraries/Functions/get-api-url';
import useIdInPath from '../../../../../../../libraries/Hooks/useIdInPath';
import { IconBellNotificationOff, IconBellNotificationOn, IconChatMessage2Line, IconVideoCircleLine } from '../../../../../../../libraries/Icons/icon.screen';

import { IBodyConversationDetail } from '../../conversation-detail/body/body-conversation-detail.props';
import { IHeaderConversationDetail } from '../../conversation-detail/header/header-conversation-detail.props';
import ConversationDetailScreen from '../../conversation-detail/main/conversation-detail.screen';
import FileContextChatScreen from '../../conversation/chat-list/context-chat/file-context-chat/file-context-chat.screen';
import PersonalDetailAdapter from './personal-infor.adapter';
import './personal-infor.scss';


function PersonalInforScreen(props: any) {
  const roomId = useIdInPath(3)
  const {
    activeLi,
    toggleOverlay,
    isOpenOverlay,
    mainSrcImage,
    onChangeActiveLi,
    linkInGroup,
    imageInGroup,
    fileInGroup,
    miniImageList,
    userDetail
  } = PersonalDetailAdapter();


  const [hasNoti, setHasNoti] = useState<boolean>(false);

  const toggleNoti = () => {
    setHasNoti(prev => !prev)
  }
  
  const history = useHistory();
  const redirectChatDetail = (user_id: string) => {
    return history.push(`/g/${user_id}`);
  }
  const redirectCall = (chatRoomId:string, user_id: string)=>{
    return window.open(window.location.protocol + "/video-call?roomName=" + chatRoomId + "&userId=" + user_id + "&isCall=0", "_blank", "width=1000,height=1000");
  }
  const showListImageInGroup = () => {
    if (imageInGroup.length > 0) {
      return imageInGroup.map((image: any, index: number) => {
        image.index = index;
        return <img alt="" onClick={() => { toggleOverlay(image.name) }} src={getApiUrl(image.name)} key={index}></img>;
      }
      )
    }
    return <div></div>
  }
  const showLinkInGroup = () => {
    if (linkInGroup.length > 0) {
      return linkInGroup.map((link: any, index: number) => {
        return <FileContextChatScreen fileSize="" guiId={link.message} isFile={false} isCurrent={true} context={link.message} datetime=""></FileContextChatScreen>
      })
    }
    return <div></div>
  }

  const showFileInGroup = () => {
    if (fileInGroup.length > 0) {
      return fileInGroup.map((item: any, index: number) => {
        return <FileContextChatScreen guiId={getApiUrl(item.guiId)} fileSize={item.fileSize} isFile={true} isCurrent={true} context={item.name} datetime=""></FileContextChatScreen>
      })
    }
    return <div></div>
  }
  const showMainBody = () => {
    switch (activeLi) {
      case ENUM_KIND_OF_CONVERSATIONDETAIL.IMAGE:
        return (
          <div className="bodyconversationdetail-main-body-tab bodyconversationdetail-main-body-image">
            {
              showListImageInGroup()
            }
          </div>
        )
      case ENUM_KIND_OF_CONVERSATIONDETAIL.FILE:
        return (
          <div className="bodyconversationdetail-main-body-tab bodyconversationdetail-main-body-fileandlink">
            {
              showFileInGroup()
            }
          </div>
        )
      case ENUM_KIND_OF_CONVERSATIONDETAIL.LINK:
        return (
          <div className="bodyconversationdetail-main-body-tab bodyconversationdetail-main-body-fileandlink">
            {
              showLinkInGroup()
            }
          </div>
        )

      default:
        break;
    }
  }

  const eleUl = (
    <ul className="bodyconversationdetail-main-header-li--small">
      <li
        className={activeLi === ENUM_KIND_OF_CONVERSATIONDETAIL.IMAGE ? "bodyconversationdetail-main-header-li--active" : ""}
        onClick={() => { onChangeActiveLi(ENUM_KIND_OF_CONVERSATIONDETAIL.IMAGE) }}
      >
        Hình ảnh
          </li>

      <li
        className={activeLi === ENUM_KIND_OF_CONVERSATIONDETAIL.FILE ? "bodyconversationdetail-main-header-li--active" : ""}
        onClick={() => { onChangeActiveLi(ENUM_KIND_OF_CONVERSATIONDETAIL.FILE) }}
      >
        Tài liệu
          </li>
      <li
        className={activeLi === ENUM_KIND_OF_CONVERSATIONDETAIL.LINK ? "bodyconversationdetail-main-header-li--active" : ""}
        onClick={() => { onChangeActiveLi(ENUM_KIND_OF_CONVERSATIONDETAIL.LINK) }}
      >
        Link
          </li>
    </ul>
  )

  const body: IBodyConversationDetail = {
    showMainBody: showMainBody,
    eleUl: eleUl
  }

  const eleOption: React.ReactElement = (
    <>
      <div>
        <IconCirclePanel 
          icon={ <IconChatMessage2Line></IconChatMessage2Line>} 
          class="" 
          padding="0.8rem" 
          onClick={ () =>{ redirectChatDetail(userDetail?.id ? userDetail?.id : "") } }
        ></IconCirclePanel>
        <p>Tin nhắn</p>
      </div>
      <div>
        <IconCirclePanel 
          icon={ <IconVideoCircleLine></IconVideoCircleLine> } 
          class="" 
          padding="0.8rem" 
          onClick = { () => { redirectCall(userDetail?.id ? userDetail?.id : "", roomId) }}
        ></IconCirclePanel>
        <p>Gọi video</p>
      </div>
      <div>
        <IconCirclePanel 
          icon={ hasNoti ? <IconBellNotificationOn></IconBellNotificationOn> : <IconBellNotificationOff></IconBellNotificationOff> } 
          class="" 
          padding="0.8rem" 
          onClick={toggleNoti}
        ></IconCirclePanel>
        <p>
          { hasNoti ? "Tắt thông báo" : "Mở thông báo" }
        </p>
      </div>
    </>
  );


  const header: IHeaderConversationDetail = {
    name: userDetail?.userName ? userDetail?.userName : "",
    title: "iSoft",
    srcImage: userDetail?.avatar ? userDetail?.avatar : "",
    eleOption: eleOption
  }

  return (
    <>
      <ConversationDetailScreen header={header} body={body} onChangeDisplay={props.onChangeDisplay}></ConversationDetailScreen>
      {
        isOpenOverlay && (<ImageOverlayScreen close={toggleOverlay} miniImageList={miniImageList} mainSrcImage={mainSrcImage}></ImageOverlayScreen>)
      }
    </>
  );
}

export default PersonalInforScreen;
