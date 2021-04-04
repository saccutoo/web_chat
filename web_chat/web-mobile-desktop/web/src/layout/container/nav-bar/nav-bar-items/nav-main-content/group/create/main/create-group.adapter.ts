import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { ENUM_KIND_OF_STATUS_CODE } from "../../../../../../../../libraries/Enum/status-code";
import ToastifyAdapter from "../../../../../../../../libraries/Features/toastify/toastify.adapter";
import ChatInputServices from "../../../conversation/chat-input/main/chat-input.services";
import CreateGroupService from "./create-group.services";
import EventBus, {
  EventBusName,
} from "../../../../../../../../helpers/api/event-bus";
import FileServices from "../../../../../../../../helpers/services/file";
import { ENUM_KIND_OF_GROUPNOTICHAT } from "../../../../../../../../libraries/Enum/group-noti-chat";
import { ENUM_KIND_OF_MESSAGE } from "../../../../../../../../libraries/Enum/message";

function CreateGroupAdapter() {
  const history = useHistory();
  const { warning } = ToastifyAdapter();

  // State
  const [title, setTitle] = useState<string>("");
  const [slogan, setSlogan] = useState<string>("");
  const [avatarTemp, setAvatarTemp] = useState<string[]>([]);
  const [avatar, setAvatar] = useState<any>(null);
  const [createBy, setCreateBy] = useState<string>("");
  const [memberIdList, setMemberIdList] = useState<string[]>([]);
  const [textSearch, setTextSearch] = useState("");

  useEffect(() => {
    const userId = localStorage.getItem("userId") || "";
    setCreateBy(userId);
  }, [setCreateBy]);


  const createChatRoom = async () => {
    let avatarId = null;
    // if(!avatar){
    //     return warning("Bạn chưa tải ảnh lên")
    // }
    // if(!slogan){
    //     return warning("Bạn chưa nhập slogan của nhóm")
    // }
    if (!createBy) {
      return warning("Bạn chưa nhập userid");
    }
    if (!title) {
      return warning("Bạn chưa nhập tên nhóm");
    }
    if (!memberIdList) {
      return warning("Bạn chưa chọn thành viên");
    }

    if (avatar) {
      const formData = new FormData();
      formData.append("fileContent", avatar);
      const response = await FileServices.send(formData);

      if (response && response.status === ENUM_KIND_OF_STATUS_CODE.SUCCESS) {
        avatarId = response.data[0].guid;
      }
    }

    if (createBy && title && memberIdList) {
      const memberidList = [...memberIdList];
      const chatRoomMemberList = memberidList.map((memberid: string) => {
        const obj = {
          userId: memberid,
        };
        return obj;
      });

      const createrUserId: any = {
        userId: localStorage.getItem("userId"),
      };
      chatRoomMemberList.push(createrUserId);

      const formData = new FormData();
      if (avatarId) {
        formData.append("avatar", avatarId);
      }

      formData.append("createdBy", createBy);
      formData.append("title", title);
      formData.append(
        "chatRoomMemberList",
        JSON.stringify(chatRoomMemberList)
      );
      formData.append("slogan", slogan);
      formData.append("type", "1");

      const response = await CreateGroupService
        .getInstance()
        .createGroup(formData);
      if (response && response.status === ENUM_KIND_OF_STATUS_CODE.SUCCESS) {
        setTitle("");
        setMemberIdList([]);
        setAvatar(null);
        setAvatarTemp([]);
        const chatRoom = response.data;

        if (chatRoom) {
          const userId = localStorage.getItem("userId") || "";
          let messageSend: any = {
            message: "Hãy chào mọi người trong nhóm của bạn",
            messageType: ENUM_KIND_OF_MESSAGE.SYSTEM,
            messageStatus: ENUM_KIND_OF_GROUPNOTICHAT.CREATE_GROUP,
            userId: userId,
            isNewChatRoom: true,
            user: {
              id: userId,
            },
            chatRoomId: chatRoom.id,
            createdAt: new Date(),
            attachments: [],
          };
          const responseSendMessage = await ChatInputServices
            .getInstance()
            .sendMessage(messageSend);
          if (
            responseSendMessage &&
            responseSendMessage.status === ENUM_KIND_OF_STATUS_CODE.SUCCESS
          ) {
            history.push("/g/" + chatRoom.id);
          }
        }
      }
    }
  };

  const changeSearch = async (event: any) => {
    setTextSearch(event.target.value);
  };

  return {
    createChatRoom,
    title,
    setTitle,
    setAvatar,
    avatarTemp,
    setAvatarTemp,
    memberIdList,
    setMemberIdList,
    slogan,
    setSlogan,
    textSearch,
    setTextSearch,
    changeSearch,
  };
}

export default CreateGroupAdapter;
