import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { IChat, IEditedMess, IRespondedMess } from "./conversation.props";
import useIdInPath from "../../../../../../../libraries/Hooks/useIdInPath";
import ConversationServices from "./conversation.services";
import { IChatRoom } from "../../../../../../../type/chatrooms";
import EventBus, {
  EventBusName,
  EventBusType,
} from "../../../../../../../helpers/api/event-bus";
import useEventBus from "../../../../../../../libraries/Hooks/useEventBus";
import { ENUM_KIND_OF_CHATROOM } from '../../../../../../../libraries/Enum/chat-room';
import GroupDetailServices from "../../group/detail/group-detail.services";
import { ENUM_KIND_OF_STATUS_CODE } from "../../../../../../../libraries/Enum/status-code";
import { ENUM_KIND_OF_STATUS } from "../../../../../../../libraries/Enum/status";

function ConversationAdapter(props: any) {
  const history = useHistory();
  const { roomIdBoxChat } = props;
  const roomIdInPath = useIdInPath();
  const roomIdInPage = roomIdBoxChat ? roomIdBoxChat : roomIdInPath;

  // state
  const [page, setPage] = useState<number>(1);
  const [count, setCount] = useState<number>(0);
  const [indexRecord, setIndexRecord] = useState<number>(-1);
  const [query, setQuery] = useState<string>("");
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [hasUploadFiles, setHasUploadFiles] = useState<boolean>(false);
  const [hasSearch, setHasSearch] = useState<boolean>(false);
  const [detailIsDisplayed, setDetailIsDisplayed] = useState<boolean>(false);
  const [isFirstLoad, setIsFirstLoad] = useState<boolean>(false)
  const [isScrollBottom, setIsScrollBottom] = useState<boolean>(false);
  const [listMessage, setListMessage] = useState<IChat[]>([]);
  const [respondedMess, setRespondedMess] = useState<IRespondedMess>();
  const [editedMess, setEditedMess] = useState<IEditedMess>();
  const [roomId, setRoomId] = useState<string>("");
  const [memberInGroup, setMemberInGroup] = useState<any[]>([]);
  const [miniImageList, setMiniImageList] = useState<any[]>([]);
  const [groupHeader, setGroupHeader] = useState<IChatRoom>({
    id: "",
    avatar: "",
    title: "",
    status: ENUM_KIND_OF_STATUS.IN_ACTIVE,
    type: ENUM_KIND_OF_CHATROOM.PERSONAL
  });

  const userId: string = localStorage.getItem('userId') || "";

  const handleOnEventBus = (res: EventBusType) => {
    const payload = res?.payload;
    if (payload) {
      switch (res?.type) {
        case EventBusName.PUSH_UPDATE_AVATAR:
          let updatedGroup = payload;

          setGroupHeader((prev) => {
            return {
              ...prev,
              avatar: updatedGroup.avatar,
              title: updatedGroup.title,
            }
          });
          break;
        case EventBusName.CHAT_DETAIL:
          const data = payload;
          setGroupHeader({
            id: data.id,
            avatar: data.avatar,
            title: data.title,
            type: data.type,
            isOnline: data.isOnline
          })

          break;
      }
    }
  }

  useEventBus(handleOnEventBus);

  useEffect(() => {
    !hasSearch && setQuery("");
  }, [hasSearch, setQuery]);

  // Huy : xóa state
  useEffect(() => {
    if (roomId !== roomIdInPage) {
      setRoomId(roomIdInPage);
      setListMessage([]);
      setPage(1);
      setHasSearch(false);
      setQuery("");
      setIsFirstLoad(false);
      setIndexRecord(-1)
      if (detailIsDisplayed) {
        setDetailIsDisplayed(false);
      }
    }
  }, [roomIdInPage]);

  //TODO: thaolt
  // hungdm - tách Gọi list-menber để k bị gọi lại nhiều lần
  // useEffect(() => {
  //   const GetData = async () => {
  //     if (roomId !== "") {
  //       const response1 = await GroupDetailServices.getInstance().getGroupDetail(roomId);
  //       if (response1 && response1.status === ENUM_KIND_OF_STATUS_CODE.SUCCESS) {
  //         const result1 = response1.data;
  //         console.log("Vào đây 1");
  //         setMemberInGroup(result1);
  //       }
  //     }
  //   }
  //   GetData();
  // }, [roomId]);

  // hungdm - tách user Effect gọi list ảnh trong hội thoại
  // useEffect(() => {
  //   const GetData = async () => {
  //     if (roomId !== "") {
  //       const response2 = await GroupDetailServices.getInstance().getAttachmentImageGroupDetail(roomId);
  //       if (response2 && response2.status === ENUM_KIND_OF_STATUS_CODE.SUCCESS) {
  //         const result2 = response2.data;
  //         setMiniImageList(result2);
  //       }
  //     }
  //   }
  //   GetData();
  // }, [roomId]);

  useEffect(() => {
    const getData = async () => {
      setIsUpdating(true);
 
      if (roomId === roomIdInPage) {
        const response = await ConversationServices.getInstance().getConversationList(roomId, page);
        if (response && response.data && response.totalPages) {
          setListMessage((prev: any) => [...prev, ...response.data]);
          setCount(response.totalPages);
        } else {
          setListMessage([]);
          setCount(1);
        }
      }

      setIsUpdating(false);
    };

    // const response = await ConversationServices().getInstance().getConversationList(roomId , page);
    // if(response && response.status === ENUM_KIND_OF_STATUS_CODE.SUCCESS){
    //     let listMessage = response.data.data;
    //     for (let message of listMessage) {
    //         if (message["reaction"]) {
    //             message["reaction"] = JSON.parse(message["reaction"]);
    //             message["reaction"] = [...message["reaction"]]
    //         }
    //     }
    //     setListMessage(listMessage)
    //     setCount(response.data.totalPages)
    // }


    // hungdm - comment - Tách ra useEffect khác - Vì gọi ở đây bị chạy quá nhiều lần
    // const response1 = await GroupDetailServices.getInstance().getGroupDetail(roomId);
    // if (response1 && response1.status === ENUM_KIND_OF_STATUS_CODE.SUCCESS) {
    //   const result1 = response1.data;
    //   setMemberInGroup(result1);
    // }

    // const response2 = await GroupDetailServices.getInstance().getAttachmentImageGroupDetail(roomId);
    // if (response2 && response2.status === ENUM_KIND_OF_STATUS_CODE.SUCCESS) {
    //   const result2 = response2.data;
    //   setMiniImageList(result2);
    // }

    // const response3 = await GroupDetailServices().getInstance().getInforGroupDetail(roomId);
    // if (response3 && response3.status === ENUM_KIND_OF_STATUS_CODE.SUCCESS) {
    //     const result3 = response3.data.data;
    //     setGroupDetail(result3);
    // }

    getData();
  }, [
    roomId,
    page,
    setCount,
    setIsUpdating,
    setListMessage,
    setPage,
    setRoomId,
    roomIdInPage
  ]);

  //TODO: thaolt
  useEffect(() => {
    const getData = async () => {
      const USER_OBJ_ID = "00a";
      let subRoomId = roomIdInPage?.substring(18, 21);

      if (subRoomId === USER_OBJ_ID) {
        const response = await ConversationServices.getInstance().getUserById(roomIdInPage);
        if (response) {
          const result = response.data;
          let chatRoomDetail: IChatRoom = {
            id: result.id,
            avatar: result.avatar,
            title: result.userName,
            type: ENUM_KIND_OF_CHATROOM.PERSONAL,
            isOnline: result.isOnline
          };

          setGroupHeader(chatRoomDetail);
        }
        return;
      }

      // hungdm - comment - ở trên đã có setMemberInGroup rồi
      // hungdm - thêm params userId để lọc
      const responseMemberInGroup = await GroupDetailServices.getInstance().getGroupDetail(roomIdInPage,userId);
      if (responseMemberInGroup && responseMemberInGroup.status === ENUM_KIND_OF_STATUS_CODE.SUCCESS) {
        setMemberInGroup(responseMemberInGroup.data);
      }

      const responseGroupDetail = await GroupDetailServices.getInstance().getInforGroupDetail(roomIdInPage, userId);
      if (responseGroupDetail && responseGroupDetail.status === ENUM_KIND_OF_STATUS_CODE.SUCCESS) {
        const dataGroupDetail = responseGroupDetail.data;

        if (dataGroupDetail?.type === ENUM_KIND_OF_CHATROOM.GROUP) {
          setGroupHeader(dataGroupDetail);
          return;
        }

        const memberInGroupTemp = responseMemberInGroup.data
        const loginId = localStorage.getItem("userId");
        const member = memberInGroupTemp.find((member: any) => member.userId !== loginId)
        if (member) {
          const header: IChatRoom = {
            id: dataGroupDetail ? dataGroupDetail.id : member.userId,
            avatar: member.user.avatar,
            title: member.user.userName,
            status: member.user.status,
            type: ENUM_KIND_OF_CHATROOM.PERSONAL
          };
          setGroupHeader(header);
        }

      }
    };

    getData();
  }, [roomIdInPage]);

  /*
  * created by tuda
  * Lấy tên của người còn lại show lên header của conversation khi chat riêng
  */
  // useEffect(() => {
  //   if (groupDetail?.type === GROUP_TYPE.SINGLE) {
  //     const loginId = localStorage.getItem("userId");
  //     for (let member of memberInGroup) {
  //       if (member.userId !== loginId) {
  //         let chatRoomDetail: IChatRoom = {
  //           id: groupDetail ? groupDetail.id : member.userId,
  //           avatar: member.user.avatar,
  //           title: member.user.userName,
  //         };
  //         setGroupDetail(chatRoomDetail);
  //       }
  //     }
  //   }
  // }, [groupDetail]);

  const onSearch = () => {
    setHasSearch(prev => !prev)
    setQuery("")
  }

  const redirectToDetail = (id: string) => {
    history.push("/g/detail/" + id);
  };
  const onChangeDisplay = () => {
    setDetailIsDisplayed(prev => !prev);
  };

  return {
    query, setQuery,
    hasSearch,
    onSearch,
    count,
    page, setPage,
    isUpdating,
    listMessage, setListMessage,
    hasUploadFiles, setHasUploadFiles,
    redirectToDetail,
    respondedMess, setRespondedMess,
    roomId,
    editedMess, setEditedMess,
    detailIsDisplayed,
    onChangeDisplay,
    memberInGroup,
    groupHeader,
    miniImageList, setMiniImageList,
    indexRecord, setIndexRecord,
    isScrollBottom, setIsScrollBottom,
    isFirstLoad, setIsFirstLoad
  };
}

export default ConversationAdapter;