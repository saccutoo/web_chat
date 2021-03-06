import React, { useEffect } from 'react';

import './group-detail.scss';
import AddMemberScreen from '../add-member/add-member.screen';
import { IBodyConversationDetail } from '../../conversation-detail/body/body-conversation-detail.props';
import { IHeaderConversationDetail } from '../../conversation-detail/header/header-conversation-detail.props';
import ConversationDetailScreen from '../../conversation-detail/main/conversation-detail.screen';
import FileContextChatScreen from '../../conversation/chat-list/context-chat/file-context-chat/file-context-chat.screen';

import GroupDetailAdapter from './group-detail.adapter';
import { ENUM_KIND_OF_STATUS } from '../../../../../../../libraries/Enum/status';
import CircleAvatarScreen from '../../../../../../../libraries/Features/circle-avtar/circle-avatar.screen';
import CustomBadgeScreen from '../../../../../../../libraries/Features/custom-badge/custom-badge.screen';
import MainPopupScreen from '../../../../../../../libraries/Features/popup/main-popup/main-popup.screen';
import DetailPopupScreen from '../../../../../../../libraries/Features/popup/detail-popup/detail-popup.screen';
import { ENUM_KIND_OF_CONVERSATIONDETAIL } from '../../../../../../../libraries/Enum/conversation-detail';
import ModalScreen from '../../../../../../../libraries/Features/modal/modal.screen';
import IconCirclePanel from '../../../../../../../libraries/Features/icon-circle-panel/icon-circle-panel.screen';
import getApiUrl from '../../../../../../../libraries/Functions/get-api-url';
import ImageOverlayScreen from '../../../../../../../libraries/Features/image-overlay-full-screen/image-overlay-full.screen';
import { IconBellNotificationOff, IconBellNotificationOn, IconChatMessage2Line, IconEyesShowVisible, IconMoreVertical, IconSignoutRight, IconTrashDeleteBin, IconUserLine, IconUserLineAdd } from '../../../../../../../libraries/Icons/icon.screen';
import { useHistory } from 'react-router-dom';
import { Subscription } from 'rxjs';
import EventBus, {
  EventBusName,
  EventBusType,
} from "../../../../../../../helpers/api/event-bus";

function GroupDetailScreen(props: any) {

  const subscriptions = new Subscription();
  var didFocus: any = null;
  const {
    activeLi,
    toggleOverlay,
    hasNoti, setHasNoti,
    isOpenOverlay,
    mainSrcImage,
    onChangeActiveLi,
    memberInGroup,
    linkInGroup,
    imageInGroup,
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
  } = GroupDetailAdapter();

  //callBack
  //V???nh vi???t th??m call back
  useEffect(() => {
    if (props && props.ConversationDetail && props.ConversationDetail.title) {
      setTitleState(props.ConversationDetail.title)
    }

    if (props && props.ConversationDetail && props.ConversationDetail.avatar) {
      setAvatarGroupState(props.ConversationDetail.avatar)
    }
    subscriptions.add(
      EventBus.getInstance().events.subscribe((res: EventBusType) => {
        const payload = res?.payload;
        if (payload) {
          switch (res?.type) {
            case EventBusName.PUSH_UPDATE_AVATAR:
              setTitleState(payload.title)
              setAvatarGroupState(payload.avatar)

              break;
          }
        }
      })
    );
  }, []);

  useEffect(() => {
    return () => {
      subscriptions.unsubscribe();
      if (didFocus) didFocus.remove();
    };
  }, []);

  const deleteUserInChatRoomMemberFuntion = () => {
    deleteUserInChatRoomMemberAdapter(memberCurrent.userId)
  }

  //vinhtq 09/03/2021:them h??m c???p nh???p th??ng b??o
  const onNotification = () => { return updateNotification("1") }
  const offNotification = () => { return updateNotification("0") }
  //end vinhtq 09/03/2021

  const history = useHistory();
  const redirectChatDetail = (user_id: string) => {
    return history.push(`/g/${user_id}`);
  }
  const redirectPersonalDetail = (user_id: string) => {
    return history.push(`/p/${user_id}`);
  }
  const showMemberInGroup = () => {
    if (memberInGroup.length > 0) {
      memberInGroup.sort(function (prev, next) { return prev.is_admin + "" === ENUM_KIND_OF_STATUS.ACTIVE ? -1 : next.is_admin + "" === ENUM_KIND_OF_STATUS.ACTIVE ? 1 : 0; });

      //vinhtq 12/03/2021:Ki???m tra xem danh s??ch c?? m???y ng?????i l?? admin
      const countIsAdmin = memberInGroup.filter(s => s.isAdmin === 1).length
      //end vinhtq 12/03/2021:Ki???m tra xem danh s??ch c?? m???y ng?????i l?? admin
      return memberInGroup.map((member: any, index: number) => {

        const deleteUserInChatRoomMember = () => {

          setIsShowPopupConfirm(true)
          const data = {
            userId: member.user_id,
            id: member.id,
            isAdmin: ""
          }
          setMemberCurrent(data)
        }

        const addPermissionAdmin = () => { return updatePermissionAdminRoomAdapter(member.id, member.user_id, "1") }
        const removePermissionAdmin = () => { return updatePermissionAdminRoomAdapter(member.id, member.user_id, "0") }
        const redirectDetail = () => { return redirectToChatDetail(member.user_id) }
        const redirectPersonDetail = () => { return redirectPersonalDetail(member.user_id) }
        let listEles: any = [];
        let userId = localStorage.getItem('userId');

        //N???u ng?????i ??ang ????ng nh???p l?? admin
        if (isAdminCurrent == "1") {
          //N???u ng?????i ??ang ????ng nh???p kh??c v???i ng?????i trong v??ng for
          if (userId !== member.user_id) {
            listEles.push(
              {
                onClick: redirectDetail,
                icon: <IconChatMessage2Line></IconChatMessage2Line>,
                text: "Nh???n tin",
                eleContext: null,
              },
              {
                onClick: redirectPersonDetail,
                icon: <IconEyesShowVisible></IconEyesShowVisible>,
                text: "Xem th??ng tin c?? nh??n",
                eleContext: null,
              },
              {
                onClick: deleteUserInChatRoomMember,
                icon: <IconTrashDeleteBin></IconTrashDeleteBin>,
                text: "X??a kh???i nh??m",
                eleContext: null,
              },
            )
          }

          //N???u ng?????i trong v??ng for kh??ng ph???i admin
          if (member.isAdmin === 0 || member.isAdmin == null || member.isAdmin === undefined || member.isAdmin === '') {
            listEles.push(
              {
                onClick: addPermissionAdmin,
                icon: <IconUserLine></IconUserLine>,
                text: "Ch??? ?????nh l?? admin",
                eleContext: null,
              },
            )
          }

          //N???u ng?????i trong v??ng for l?? admin v?? s??? ng?????i l?? admin > 1
          if (member.isAdmin === 1 && countIsAdmin > 1) {
            listEles.push(
              {
                onClick: removePermissionAdmin,
                icon: <IconUserLine></IconUserLine>,
                text: "H???y vai tr?? admin",
                eleContext: null,
              },
            )
          }
        }

        //N???u ng?????i ??ang nh???p kh??ng ph???i admin v?? kh??c v???i ng?????i trong v??ng for
        else if (isAdminCurrent == "0" && userId !== member.user_id) {
          listEles = [
            {
              onClick: redirectDetail,
              icon: <IconChatMessage2Line></IconChatMessage2Line>,
              text: "Nh???n tin",
              eleContext: null,
            },
            {
              onClick: redirectPersonDetail,
              icon: <IconEyesShowVisible></IconEyesShowVisible>,
              text: "Xem th??ng tin c?? nh??n",
              eleContext: null,
            },
          ]
        }

        const eleDetailPopup = (onClosePopup: any) => (<DetailPopupScreen
          listEles={listEles}
          onClosePopup={onClosePopup}
        ></DetailPopupScreen>);

        console.log(listEles)

        const isAdmin = member.isAdmin + "" === ENUM_KIND_OF_STATUS.ACTIVE;

        return (
          <>
            <div className="bodycreategroup-main-body-selecteduserpanel" >
              <CircleAvatarScreen
                src={getApiUrl(member.user.avatar)}
                isOnline={member.user.status === ENUM_KIND_OF_STATUS.ACTIVE}
                class=""
                width="44px"
                height="44px"
              ></CircleAvatarScreen>
              <div className="body-main-detail-group-member-username">
                <span>
                  {member.user.userName}
                </span>
                {
                  isAdmin && (
                    <CustomBadgeScreen text="admin" class="margin-left-8"></CustomBadgeScreen>
                  )
                }
              </div>
              {
                (listEles.length > 0) && (
                  <div className="bodycreategroup-main-body-option cursor-pointer">
                    <MainPopupScreen context={eleDetailPopup}>
                      <div className=" flex-center img-24">
                        <IconMoreVertical className="icon-svg--hover"></IconMoreVertical>
                      </div>
                    </MainPopupScreen>
                  </div>
                )
              }
            </div>
          </>
        )
      })
    }
    return <div></div>
  }
  const showListImageInGroup = () => {
    if (imageInGroup.length > 0) {
      return imageInGroup.map((image: any, index: number) => {
        image.index = index;
        return <img alt="" onClick={() => { toggleOverlay(image.guiId) }} src={getApiUrl(image.guiId)} key={index}></img>;
      }
      )
    }
    return <div></div>
  }
  const showLinkInGroup = () => {
    if (linkInGroup.length > 0) {
      return linkInGroup.map((link: any, index: number) => {
        return <FileContextChatScreen guiId={link.message} isFile={false} isCurrent={true} context={link.message} datetime="" fileSize=""></FileContextChatScreen>
      })
    }
    return <div></div>
  }

  const showFileInGroup = () => {
    if (fileInGroup.length > 0) {
      return fileInGroup.map((item: any, index: number) => {
        return <FileContextChatScreen guiId={item.guiId} fileSize={item.fileSize} isFile={true} isCurrent={true} context={item.name} datetime=""></FileContextChatScreen>
      })
    }
    return <div></div>
  }

  const showMainBody = () => {
    switch (activeLi) {
      case ENUM_KIND_OF_CONVERSATIONDETAIL.MEMBER:
        return (
          <div className="bodyconversationdetail-main-body-tab bodyconversationdetail-main-body-fileandlink">
            {
              showMemberInGroup()
            }
          </div>
        )
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
        className={"icon-svg--hover " + (activeLi === ENUM_KIND_OF_CONVERSATIONDETAIL.MEMBER ? "bodyconversationdetail-main-header-li--active" : "")}
        onClick={() => { onChangeActiveLi(ENUM_KIND_OF_CONVERSATIONDETAIL.MEMBER) }}
      >
        Th??nh vi??n
        </li>

      <li
        className={"icon-svg--hover " + (activeLi === ENUM_KIND_OF_CONVERSATIONDETAIL.IMAGE ? "bodyconversationdetail-main-header-li--active" : "")}
        onClick={() => { onChangeActiveLi(ENUM_KIND_OF_CONVERSATIONDETAIL.IMAGE) }}
      >
        H??nh ???nh
        </li>

      <li
        className={"icon-svg--hover " + (activeLi === ENUM_KIND_OF_CONVERSATIONDETAIL.FILE ? "bodyconversationdetail-main-header-li--active" : "")}
        onClick={() => { onChangeActiveLi(ENUM_KIND_OF_CONVERSATIONDETAIL.FILE) }}
      >
        T??i li???u
        </li>
      <li
        className={"icon-svg--hover " + (activeLi === ENUM_KIND_OF_CONVERSATIONDETAIL.LINK ? "bodyconversationdetail-main-header-li--active" : "")}
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

  const eleContextSignout = (close: any) => {
    return (
      <div className="popupsignoutgroup-container" >
        <div className="popupsignoutgroup-text">
          <p>B???n ch???c ch???n th???c hi???n h??nh ?????ng n??y ?</p>

        </div>
        <div className="popupsignoutgroup-button">
          <button onClick={close} className="btn-outline" >H???y</button>
          <button onClick={UserOutRoomChat}>X??c nh???n</button>
        </div>
      </div>
    )
  }

  const closePopup = () => {
    setIsShowPopupConfirm(false);
  }

  const eleContextSignoutRemoveUser = (props: any) => {
    return (
      <div className="popupsignoutgroup-container">
        <div className="popupsignoutgroup-text">
          <p>B???n ch???c ch???n th???c hi???n h??nh ?????ng n??y ?</p>

        </div>
        <div className="popupsignoutgroup-button">
          <button onClick={closePopup} className="btn-outline" >H???y</button>
          <button onClick={deleteUserInChatRoomMemberFuntion}>X??c nh???n</button>
        </div>
      </div>
    )
  }


  const eleRemoveRoomChat = (close: any) => {
    return (
      <div className="popupsignoutgroup-container">
        <div className="popupsignoutgroup-text">
          <p>B???n ch???c ch???n th???c hi???n h??nh ?????ng n??y ?</p>

        </div>
        <div className="popupsignoutgroup-button">
          <button onClick={close} className="btn-outline" >H???y</button>
          <button onClick={deleteRoomChatAdapter}>X??c nh???n</button>
        </div>
      </div>
    )
  }


  const eleContent: React.ReactElement = (
    <AddMemberScreen memberInGroup={memberInGroup}></AddMemberScreen>
  );

  const eleOption: React.ReactElement = (
    <>
      <ModalScreen open={false} headerContent={"Th??m th??nh vi??n"} context={eleContent} hasPadding={false}>
        <div>
          <IconCirclePanel icon={<IconUserLineAdd></IconUserLineAdd>} class="" padding="0.8rem"></IconCirclePanel>
          <p>Th??m th??nh vi??n</p>
        </div>
      </ModalScreen>
      <ModalScreen open={isShowPopupConfirm} headerContent={"X??c nh???n x??a ng?????i n??y n??y kh???i nh??m?"} contextHasClose={eleContextSignoutRemoveUser} hasPadding={false} funtionCloseNew={closePopup}>
        <></>
      </ModalScreen>

      <div>
        <IconCirclePanel
          icon={hasNoti ? <IconBellNotificationOn></IconBellNotificationOn> : <IconBellNotificationOff></IconBellNotificationOff>}
          class=""
          padding="0.8rem"
          onClick={hasNoti ? offNotification : onNotification}
        ></IconCirclePanel>
        <p>
          {hasNoti ? "T???t th??ng b??o" : "M??? th??ng b??o"}
        </p>
      </div>
      <ModalScreen open={false} headerContent={"X??c nh???n r???i kh???i nh??m"} contextHasClose={eleContextSignout} hasPadding={false}>
        <div>
          <IconCirclePanel icon={<IconSignoutRight></IconSignoutRight>} class="" padding="0.8rem"></IconCirclePanel>
          <p>Tho??t nh??m</p>
        </div>
      </ModalScreen>
      {
        isAdminCurrent == "1" ?
          <ModalScreen open={false} headerContent={"X??c nh???n x??a nh??m"} contextHasClose={eleRemoveRoomChat} hasPadding={false}>
            <div>
              <IconCirclePanel icon={<IconTrashDeleteBin></IconTrashDeleteBin>} class="" padding="0.8rem"></IconCirclePanel>
              <p>X??a nh??m</p>
            </div>
          </ModalScreen>
          : ""
      }

    </>
  );


  // const eleSearch: React.ReactElement = (
  //     <>
  //         <img src={ iconSearchLoupe } alt=""/>
  //         <img src={ iconMoreVertical } alt=""/>
  //     </>
  // );
  const name = titleState;
  const avatarGroup = props.ConversationDetail && avatarGroupState;
  const header: IHeaderConversationDetail = {
    name: name,
    title: memberInGroup.length + " th??nh vi??n",
    srcImage: avatarGroup,
    eleOption: eleOption,
    isAdmin: isAdminCurrent
  }

  return (
    <>
      <ConversationDetailScreen header={header} body={body} onChangeDisplay={props.onChangeDisplay}></ConversationDetailScreen>
      {
        isOpenOverlay && (<ImageOverlayScreen close={toggleOverlay} miniImageList={imageInGroup} mainSrcImage={mainSrcImage}></ImageOverlayScreen>)
      }
      {/* {
        isShowPopupConfirm ? <PopupConfirm isShow={isShowPopupConfirm}></PopupConfirm> :""
      } */}
    </>
  );
}

export default GroupDetailScreen;
