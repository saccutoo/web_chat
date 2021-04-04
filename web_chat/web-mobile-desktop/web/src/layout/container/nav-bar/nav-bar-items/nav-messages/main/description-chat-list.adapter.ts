import { ENUM_KIND_OF_CHATROOM } from './../../../../../../libraries/Enum/chat-room';

import { useEffect, useRef, ChangeEvent, useState } from "react";
import { useHistory } from "react-router-dom";
import DescriptionChatListServices from "./description-chat-list.services";
import { ENUM_KIND_OF_STATUS_CODE } from "../../../../../../libraries/Enum/status-code";
import useEventListener from "../../../../../../libraries/Hooks/useEventListener";
import { IDescriptionChat, ISearchChatRoom } from "../description-chat/description-chat.props";
import EventBus, {
  EventBusName,
  EventBusType,
} from "../../../../../../helpers/api/event-bus";
import useEventBus from "../../../../../../libraries/Hooks/useEventBus";
import { GROUP_TYPE } from '../../../../../../libraries/Enum/group';
import { ENUM_KIND_OF_STATUS } from '../../../../../../libraries/Enum/status';
import useIdInPath from '../../../../../../libraries/Hooks/useIdInPath';
import { USER } from '../../../../../../libraries/Enum/user';
import uniqByKeepFirst from '../../../../../../libraries/Functions/abc';

function DescriptionChatListAdapter() {
  const roomId = useIdInPath();

  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [hasSearch, setHasSearch] = useState<boolean>(false);
  const [descriptionChatList, setDescriptionChatList] = useState<IDescriptionChat[]>([]);
  const [searchDescriptionChatList, setSearchDescriptionChatList] = useState<ISearchChatRoom[]>([]);
  const [activedDescriptionChat, setActivedDescriptionChat] = useState<string>("");
  const history = useHistory();
  const typingTimeoutRef = useRef<any>(null);

  //Callback

  const handleOnEventBus = (res: EventBusType) => {
    const payload = res?.payload;
    if (payload) {
      switch (res?.type) {
        case EventBusName.NEW_MESSENGER:
          handleNewMessageOnEventBus(payload);
          break;
        // case EventBusName.PUSH_GROUP_TO_TOP:
        //   handlePushToTopOnEventBus(payload);
        //   break;
        case EventBusName.PUSH_UPDATE_AVATAR:
          handleUpdateAvatarOnEventBus(payload);
          break;
        case EventBusName.UPDATE_ONLINE_OFFLINE:
          handleUpdateOnlineOnEventBus(payload);
          break;
        case EventBusName.CREATE_CHAT_ROOM:
          handleNewChatRoomOnEventBus(payload);
          break;
      }
    }
  }

  const handleUpdateAvatarOnEventBus = (payload: any) => {
    let updatedGroup = payload;

    setDescriptionChatList((prev) => {
      const hasItem = prev.some(item => item.id === updatedGroup.id);
      if (hasItem) {
        return prev.map((item) => {
          if (item.id === updatedGroup.id) {
            return {
              ...item,
              avatar: updatedGroup.avatar,
              title: updatedGroup.title
            }
          }
          return item
        })
      }

      return prev
    })
  }

  // const handlePushToTopOnEventBus = (payload: any) => {
  //   let newGroup = payload;

  //   setDescriptionChatList((prev) => {
  //     const hasItem = prev.some(item => item.id === newGroup.id);
  //     if (hasItem) {
  //       const oldGroup = prev.find(item => item.id === newGroup.id);
  //       const groupTemp = Object.assign(oldGroup, newGroup);
  //       const listTemp = prev.filter(item => item.id !== newGroup.id)

  //       return [{
  //         ...groupTemp,
  //         status: ENUM_KIND_OF_STATUS.IN_ACTIVE
  //       }, ...listTemp]
  //     }

  //     return [{
  //       ...newGroup,
  //       status: ENUM_KIND_OF_STATUS.IN_ACTIVE
  //     }, ...prev]
  //   });
  // }

  const handleNewMessageOnEventBus = (payload: any) => {
    let newMess = payload;

    setDescriptionChatList((prev: any) => {
      const roomid = window.location.href.split("/").pop();
      const hasItem = prev.some((item: any) => item.id === newMess.chatRoomId);
      if (hasItem) {
        const group = prev.find((item: any) => item.id === newMess.chatRoomId);
        if (group.chats) {
          const newGroup = {
            ...group,
            chats: [
              {
                ...group.chats[0],
                message: newMess.message,
                createdAt: newMess.createdAt
              }
            ],
            status: group.id === roomid ? ENUM_KIND_OF_STATUS.ACTIVE : ENUM_KIND_OF_STATUS.IN_ACTIVE
          }
          const listTemp = prev.filter((item: any) => item.id !== newGroup.id)
          return [newGroup , ...listTemp]
        }
      }

      if (newMess.chatRoom) {
        const newGroup = {
          ...newMess.chatRoom,
          status: newMess.chatRoomId === roomid ? ENUM_KIND_OF_STATUS.ACTIVE : ENUM_KIND_OF_STATUS.IN_ACTIVE
        };
        return [newGroup, ...prev]
      }

      return prev
    });
  }
  
  // created by tuda
  const handleUpdateOnlineOnEventBus = (payload: any) => {
    let updatedUser = payload;

    setDescriptionChatList((prev: any) => {
      return prev.map((item: any, index: number) => {
        if (item.chat_room_members) {
          for (let member of item.chat_room_members) {
            if (member.user) {
              if (member.user.id === updatedUser.userId) {
                member.user.isOnline = updatedUser.isOnline;
                if (item.id === roomId) {
                  checkRoomStatus(item);
                  EventBus.getInstance().post({
                    type: EventBusName.CHAT_DETAIL,
                    payload: item,
                  });
                }
                return item;
              }
            }
          }
        }
        return item;
      })
    });
  }

  const handleNewChatRoomOnEventBus = (payload: any) => {
    let newMess = payload;
    setDescriptionChatList((prev: any) => {      
      if (newMess.chatRoom) {
        const newGroup = {
          ...newMess.chatRoom,
          status: ENUM_KIND_OF_STATUS.IN_ACTIVE
        };
        return [newGroup, ...prev]
      }

      return prev
    });
  }

  useEventBus(handleOnEventBus)

  // added by tuda
  const checkRoomStatus = (descriptionChat: any) => {
    const lstMemberInRoom = descriptionChat.chat_room_members
    const userIdLogin: string = localStorage.getItem("userId") || "";
    if (descriptionChat.type == GROUP_TYPE.SINGLE) {
      for (let i = 0; i < lstMemberInRoom.length; i++) {
        if (lstMemberInRoom[i].userId !== userIdLogin) {
          descriptionChat.title = lstMemberInRoom[i].user.lastName + " " + lstMemberInRoom[i].user.firstName
          descriptionChat["isOnline"] = lstMemberInRoom[i].user.isOnline === USER.ONLINE ? true : false;
          break;
        }
      }
    } else if (descriptionChat.type == GROUP_TYPE.GROUP) {
      let flagStatusGroup = false;
      for (let i = 0; i < lstMemberInRoom.length; i++) {
        if (lstMemberInRoom[i].userId !== userIdLogin && lstMemberInRoom[i].isOnline) {
          flagStatusGroup = true;
          break;
        }
      }
      descriptionChat["isOnline"] = flagStatusGroup;
    }
  }

  //Logic
  // useEffect(() => {
  //   const getData = async () => {
  //     if (query) {
  //       const url =
  //         process.env.REACT_APP_IP_ADDRESS_URL +
  //         "/" +
  //         URL_PATHS.GET_COMPANYMEMBERLIST_BYQUERY;

  //       let formData = new FormData();
  //       formData.append("text", query);

  //       const response = await DescriptionChatListServices()
  //         .getInstance()
  //         .getDescriptionChatListByQuery(formData, url);
  //       if (response && response.status === ENUM_KIND_OF_STATUS_CODE.SUCCESS) {
  //         setSearchDescriptionChatList(response.data);
  //       }
  //     } else {
  //       setSearchDescriptionChatList([]);
  //     }
  //   };

  //   getData();
  // }, [query, setSearchDescriptionChatList]);

  const onClick = (event: any) => {
    if (hasSearch) {
      const id = event.target.id;
      if (
        id !== "descriptionchatlist-input-index" &&
        id !== "searchfield-container-index"
      ) {
        setHasSearch(false);
      }
    }
  };
  useEventListener("click", onClick);

  useEffect(() => {
    const getData = async () => {
      setIsUpdating(true);

      const userId = localStorage.getItem("userId");
      const pageSize = process.env.REACT_APP_NUM_CHAT_ITEMS_PER_PAGE;

      const response = await DescriptionChatListServices
        .getInstance()
        .getDescriptionChatList(
          page,
          pageSize,
          userId
        );
      if (response && response.status === ENUM_KIND_OF_STATUS_CODE.SUCCESS) {
        setTotalPages(response.totalPages);
        setDescriptionChatList((prev) => {
          const next = [...prev, ...response.data];
          const nextTemp = uniqByKeepFirst(next, (it: any) => it.id)

          return nextTemp;
        });
      }

      setIsUpdating(false);
    };

    getData();
  }, [page, setDescriptionChatList, setTotalPages, setIsUpdating]);

  useEffect(() => {
    const setDescriptionChatIsAcTiveByPath = () => {
      const currentPathName = history.location.pathname;
      const arrPath = currentPathName.split("/");
      if (arrPath) {
        let id = arrPath[2];
        if (arrPath.length === 4 && arrPath[2] === "detail") {
          id = arrPath[3];
        }
        setActivedDescriptionChat(id);
      }
    };

    setDescriptionChatIsAcTiveByPath();
  }, []);

  useEffect(() => {

    if (hasSearch) {
      (async () => {
        if (query) {
          console.log("🚀 ~ file: description-chat-list.adapter.ts ~ line 271 ~ query", query)
          const userId = localStorage.getItem("userId");
          const pageSize = process.env.REACT_APP_NUM_CHAT_ITEMS_PER_PAGE;
          const dataSearch = await DescriptionChatListServices.getInstance().searchListChatRoom(
            query,
            1,
            pageSize,
            userId
          );
          console.log("🚀 ~ file: description-chat-list.adapter.ts ~ line 270 ~ dataSearch", dataSearch.data)
          if (dataSearch.status === ENUM_KIND_OF_STATUS_CODE.SUCCESS) {
            setSearchDescriptionChatList(dataSearch.data)
          }
        }


      })()

    } else {
      setQuery("");
    }


  }, [hasSearch, query]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      setQuery(e.target.value);
    }, 1e3);
  };

  const redirectToChatDetail = (id: string, groupDetail: IDescriptionChat) => {
    // Check xem là chat riêng hay chat nhóm
    if (groupDetail.type === ENUM_KIND_OF_CHATROOM.PERSONAL) {
      let userId = localStorage.getItem("userId");

      if (groupDetail.chat_room_members) {
        groupDetail.chat_room_members.map((item: any, index: number) => {
          if (item.user) {
            if (item.user.id !== userId) {
              groupDetail.title = item.user.userName;
              groupDetail.avatar = item.user.avatar;
            }
          }
        })
      }
    }

    EventBus.getInstance().post({
      type: EventBusName.CHAT_DETAIL,
      payload: groupDetail,
    });

    setDescriptionChatList((prev: any) => prev.map((item: any) => item.id === id ? {
      ...item,
      status: ENUM_KIND_OF_STATUS.ACTIVE
    } : item
    ))

    const kind = "g";
    history.push(`/${kind}/${id}`);
    setActivedDescriptionChat(id);
  };

  return {
    onChange,
    activedDescriptionChat,
    descriptionChatList,
    totalPages,
    hasSearch,
    setHasSearch,
    query,
    setQuery,
    searchDescriptionChatList,
    page,
    setPage,
    isUpdating,
    redirectToChatDetail,
  };
}

export default DescriptionChatListAdapter;
