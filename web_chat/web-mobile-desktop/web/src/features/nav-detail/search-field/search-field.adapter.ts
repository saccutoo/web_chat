
import { useHistory } from "react-router-dom";
import EventBus, { EventBusName } from "../../../helpers/api/event-bus";
import ihcmListGroupServices from "../../../layout/ihcm-chat-iframe/list-group/ihcm-list-group.services";
import { ENUM_KIND_OF_CHATROOM } from "../../../libraries/Enum/chat-room";
import { IHCM_MESSAGE } from "../../../libraries/Enum/ihcm-message";
import { IChatRoom } from "../../../type/chatrooms";
import { SearchFieldServices } from "./search-field.services";

const SearchFieldAdapter = (props: any) => {

  const history = useHistory();

  const {isBoxChat} = props;

  /**
   * quyennq : hàm xử lý khi click vào room chat hoặc user tìm kiếm được
   * @param  {any} data
   */
  const createChatRoom = async (data: any) => {
    let headerDetail: IChatRoom = {
      id: data.id,
      avatar: data.avatar,
    }
    const loginId = localStorage.getItem("userId") || "";
    if (data.title) {
      const resRoom = await SearchFieldServices.getInforGroupDetail(data.id, loginId);
      if (resRoom) {
        headerDetail.title = data.title;
        headerDetail.type = ENUM_KIND_OF_CHATROOM.GROUP;
        headerDetail.isOnline = resRoom.data.isOnline;
      }

      // added by tuda using for box chat iframe
      if (isBoxChat) {
        openBoxChat(data.id);
      }

      history.push("/g/" + data.id);

    } else {

      const userIdList = {
        userIdList: [loginId, data.id]
      }
      const resUser = await SearchFieldServices.getUserById(data.id);
      if (resUser) {
        headerDetail.title = data.userName;
        headerDetail.type = ENUM_KIND_OF_CHATROOM.PERSONAL;
        headerDetail.isOnline = resUser.data.isOnline;
      }
      const response = await SearchFieldServices.getSingleRoom(userIdList);
      if (response && response.data !== null) {
        // added by tuda using for box chat iframe
        if (isBoxChat) {
          openBoxChat(response.data.id);
        }

        history.push("/g/" + response.data.id);
      } else {
        if (isBoxChat) {
          openBoxChat(data.id);
        }

        history.push("/g/" + data.id);
      }

    }
    EventBus.getInstance().post({
      type: EventBusName.CHAT_DETAIL,
      payload: headerDetail,
    });

  }

  // added by tuda
    // using for box chat in iframe ihcm
  const openBoxChat = async (roomId: string) => {
     window.parent.postMessage(IHCM_MESSAGE.OPEN_BOX_CHAT, "*");

     let messageSendRoomId = {
         roomId: roomId,
         userId: localStorage.getItem('userId')
     }
     await ihcmListGroupServices.getInstance().sendRoomIdToBoxChat(messageSendRoomId);
  }

  return {
    createChatRoom
  };
}

export default SearchFieldAdapter;



