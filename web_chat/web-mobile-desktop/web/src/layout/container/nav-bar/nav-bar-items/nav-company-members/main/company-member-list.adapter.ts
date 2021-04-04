import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { ENUM_KIND_OF_STATUS_CODE } from "../../../../../../libraries/Enum/status-code";
import useDebounce from "../../../../../../libraries/Hooks/useDebounce";
import useEventListener from "../../../../../../libraries/Hooks/useEventListener";

import CompanyMemberListServices from "./company-member-list.services";
import ReconnectingWebSocket from 'reconnecting-websocket';
import { ICompanyMember } from "../company-member/company-member.props";

var sockets: ReconnectingWebSocket[] = [];
var socket: ReconnectingWebSocket;

const options = {
  WebSocket: WebSocket, // custom WebSocket constructor
  connectionTimeout: 1000,
  maxRetries: 10,
};

function CompanyMemberListAdapter() {
  const history = useHistory();

  // state
  const [query, setQuery] = useState<string>("");
  const [searchCompanyMemberList, setSearchCompanyMemberList] = useState<ICompanyMember[]>([]);
  const [hasSearch, setHasSearch] = useState<boolean>(false);

  // const pushStreamService = {
  // subAllChats: (userChats: User[]) => {
  //   pushStreamService.closeAllSocket();
  //   for (let i = 0; i < userChats.length; i++) {
  //     pushStreamService.subChat(userChats[i].id);
  //   }
  // },

  // subChannelSystem: () => {
  //   pushStreamService.subChat('CHANNEL_ACTIVITIES');
  // },

  // messageReceived: (message: any) => {
  //   console.log("-----Message Received-----")
  //   console.log(message);
  // },

  // subChat: (userId: string) => {
  //   console.log("-----Sub chat-----")
  //   console.log(`ws://172.20.50.96:31000/ws?Channels=` + userId)
  //   socket = new ReconnectingWebSocket(
  //     `ws://172.20.50.96:31000/ws?Channels=` + userId,
  //     [],
  //     options
  //   );

  //   socket.onopen = () => {
  //     // connection opened
  //     console.log('test_Connected');
  //     console.log(`test_ws://172.20.50.96:31000/ws?Channels=` + userId);
  //   };

  //   socket.onmessage = (e) => {
  //     console.log("-----on message")
  //     pushStreamService.messageReceived(decodeURIComponent(JSON.parse(e.data).text));
  //   };

  // socket.onerror = (e: any) => {
  //   // an error occurred
  //   console.log('test_socket_err: ', e);
  //   socket.close();
  //   clearInterval();
  //   setTimeout(function () {
  //     pushStreamService.subChat(userId);
  //   }, 1000);
  // };

  //     socket.onclose = (e: any) => {
  //       console.log('test_Socket is closed. Reconnect will be attempted in 1 second.', e.reason);
  //     };
  //     // sockets.push(ws);
  //   },
  //   closeSocket: () => {
  //     console.log('test_closeSocket');
  //     socket.close();
  //   },
  //   closeAllSocket: () => {
  //     console.log('test_closeAllSocket');
  //     sockets.map((s) => s.close());
  //   },
  // };

  const createChatRoom = async (userId: any) => {
    // eslint-disable-next-line no-restricted-globals
    let pathList = location.pathname.split("/");
    const id = pathList[2];

    let chatRoomMemberList = [
      { userId: userId },
      { userId: id }
    ];

    let chatRoom = {
      avatar: "url",
      title: "Chat riêng",
      slogan: "Room này tạo ra để 2 người chat",
      type: 0,
      createdBy: userId,
      chatRoomMemberList: chatRoomMemberList
    }


    const response = await CompanyMemberListServices.getInstance().createChatRoom(chatRoom);
    if (response && response.status === ENUM_KIND_OF_STATUS_CODE.SUCCESS) {
      return
    }
  }

  const onChange = useDebounce(setQuery);

  const onClick = (event: any) => {
    if (hasSearch) {
      const id = event.target.id
      if (id !== "descriptionchatlist-input-index" && id !== "searchfield-container-index") {
        setHasSearch(false);
      }
    }
  }
  useEventListener('click', onClick);


  useEffect(() => {
    const getData = async () => {
      console.log("vc");
      console.log(query);
      const data = {
        "text": query,
        "page": 1,
        "pageSize": 100
      };
      const response = await CompanyMemberListServices.getInstance().getCompanyMemberListByQuery(data);
      if (response && response.status === ENUM_KIND_OF_STATUS_CODE.SUCCESS) {
        setSearchCompanyMemberList(response.data);
      }

    };
    getData();
  }, [query, setSearchCompanyMemberList]);

  useEffect(() => {
    if (!hasSearch) {
      setQuery("");
    }
  }, [hasSearch, setQuery])

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
  // const onChange = (e: ChangeEvent<HTMLInputElement>) =>{
  //     if(typingTimeoutRef.current){
  //         clearTimeout(typingTimeoutRef.current);
  //     }

  //     typingTimeoutRef.current = setTimeout(() =>{
  //         setQuery(e.target.value);
  //     },5e2);
  // }

  return {
    query, setQuery,
    searchCompanyMemberList,
    hasSearch, setHasSearch,
    onChange,
    redirectToChatDetail
  }
}

export default CompanyMemberListAdapter;