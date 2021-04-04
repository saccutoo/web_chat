import { ENUM_KIND_OF_STATUS_CODE } from "../../../../../../../../libraries/Enum/status-code";
import { useCallback, useEffect, useRef, useState } from "react";
import { ENUM_KIND_OF_MESSAGE } from "../../../../../../../../libraries/Enum/message";
import buildFileSelector from "../../../../../../../../libraries/Functions/build-file-selector";
import { IAttachment } from "../../main/conversation.props";
import ChatInputServices from "./chat-input.services";
import useKeyDown from "../../../../../../../../libraries/Hooks/useKeyDown";
import { useHistory } from "react-router-dom";
import ChatListServices from "../../chat-list/main/chat-list.services";
import trimChar from "../../../../../../../../libraries/Functions/trim-char";
import EventBus, {
  EventBusType,
} from "../../../../../../../../helpers/api/event-bus";
import { EventBusName } from "../../../../../../../../helpers/api/event-bus";
import checkAttachment, { returnAttachment } from "../../../../../../../../libraries/Functions/check-attachment";
import checkValidURL from "../../../../../../../../libraries/Functions/check-valid-URL";
import { USER_OBJ_ID } from "../../../../../../../../libraries/Enum/user";
import FileServices from "../../../../../../../../helpers/services/file";
import useEventBus from "../../../../../../../../libraries/Hooks/useEventBus";
import useIdInPath from "../../../../../../../../libraries/Hooks/useIdInPath";
import isFileImage from "../../../../../../../../libraries/Functions/is-file-image";

function ChatInputAdapter(props: any) {
  const {
    respondedMess,
    setListMessage,
    hasUploadFiles,
    setHasUploadFiles,
    roomId,
    setRespondedMess,
    editedMess,
    setEditedMess,
    isScrollBottom,
    setIsScrollBottom
  } = props;

  const lastestRoomId = useRef();
  // const roomIdInPath = useIdInPath();
  const history = useHistory();

  // state
  const [files, setFiles] = useState<any>([]);
  const [isMultilineText, setIsMultilineText] = useState<Boolean>(false);
  const [isFocused, setIsFocused] = useState<Boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [isVisibleEmojiPicker, setVisibleEmojiPicker] = useState<Boolean>(false);
  const [isSendChat, setIsSendChat] = useState<boolean>(false);
  const [listMemberTag, setListMemberTag] = useState<any>([]);

  const pressEnterToSendChat = async (e: KeyboardEvent) => {
    if (e.keyCode === 13 && !e.shiftKey && isFocused) {
      sendChat();
    }
  };

  useKeyDown(pressEnterToSendChat);

  useEffect(() => {
    setHasUploadFiles(false);
    setFiles(null);
    setMessage("");

    // added by tuda: set roomId to useRef to use in Event Bus because state cannot using in Event Bus
    lastestRoomId.current = roomId;
  }, [roomId]);

  useEffect(() => {
    if (editedMess) {
      setMessage(editedMess.context);
      setVisibleEmojiPicker(false);
      setFiles(null);
      setRespondedMess();
      setIsFocused(true)
    }
  }, [
    editedMess,
    setMessage,
    setVisibleEmojiPicker,
    setFiles,
    setRespondedMess,
  ]);

  useEffect(() => {
    if (respondedMess) {
      setIsFocused(true)
    }
  }, [respondedMess]);

  useEffect(() => {
    if (editedMess) {
      setEditedMess((prev: any) => ({ ...prev, context: message }));
    } else {
      setEditedMess();
    }
  }, [message, setEditedMess]);

  const handleOnEventBus = useCallback((res: EventBusType) => {
    const payload = res?.payload;
    let newMessage: any = null;

    if (payload) {
      switch (res?.type) {
        case EventBusName.NEW_MESSENGER:
          // console.log("test_INCOMING_MESSAGE: ", payload);
          newMessage = payload;
          // newMessage["user"] = {
          //   id: newMessage.userId,
          // };

          if (newMessage.chatRoomId === lastestRoomId.current) {
            // Huy: Reply, File, Editz
            setListMessage((prev: any) => [newMessage, ...prev]);
          }
          const group = newMessage.chatRoom ? newMessage.chatRoom : {};
          group.lastMessage = newMessage.message;
          group.createdAt = new Date();
          break;
        case EventBusName.UPDATE_MESSENGER:
          newMessage = payload;

          setListMessage((prev: any) =>
            prev.map((message: any) => {
              if (message.id === newMessage.id) {
                return { ...message, message: newMessage.message, reaction: newMessage.reaction };
              }
              return message;
            })
          );

          break;
      }
    }
  }, [roomId])

  useEventBus(handleOnEventBus)

  /**
   * Gửi tin nhắn luồng chính
   */
  const sendChat = async () => {

    //Tạo tin nhắn mẫu
    const userId = localStorage.getItem("userId") || "";
    let messageSend: any = {
      chatRoomId: roomId,
      message: "Xin chào",
      messageStatus: "1",
      messageType: ENUM_KIND_OF_MESSAGE.TEXT,
      user: { userName: "System", status: "1", id: userId },
      userId: userId,
      createdAt: new Date(),
      attachments: [],
    };

    // Gửi tin nhắn dạng text
    await sendMessageText(messageSend)

    // Gửi tin nhắn dạng file
    await sendMessageFile(messageSend)

    // hungdm - set khi gửi tin nhắn xong
    setIsSendChat(true);

    // bắn notification
    pushNotificationTagName(listMemberTag);

    console.log(messageSend)

  };

  const sendMessageText = async (messSend: any) => {
    if (message) {
      //Xoá hai đầu xuống dòng khi dùng shift + enter
      const mess = trimChar(message, "\n");

      if (mess === "") {
        return
      }
      let messageSend = JSON.parse(JSON.stringify(messSend))

      messageSend.message = mess;

      //Kiểm tra có phải link hay không?
      if (checkValidURL(mess)) {
        messageSend.messageType = ENUM_KIND_OF_MESSAGE.LINK;
      }

      // Kiểm tra url có phải là object user hay không, nếu là user thì dùng api gửi message lần đầu
      if (await checkObjectUser(messageSend)) {
        return;
      }

      // Kiểm tra xem có phải đang trạng thái sửa tin nhắn hay không ? Nếu đúng thì xử lí và return luôn
      if (editedMess) {
        messageSend = {
          ...messageSend,
          id: editedMess.messageId,
          createdAt: editedMess.createdAt,
        };

        const response = await ChatInputServices
          .getInstance()
          .editMessage(messageSend);
        if (response && response.status === ENUM_KIND_OF_STATUS_CODE.SUCCESS) {

          setEditedMess();
          setMessage("");

          return;
        }
      }

      // Kiểm tra xem có phải đang trạng thái phản hồi tin nhắn hay không ? Nếu đúng thì thêm parent để sử dụng API
      // send bthuong
      if (respondedMess) {
        const attachments =
          respondedMess.type === ENUM_KIND_OF_MESSAGE.ATTACHMENT
            ? [{
              name: respondedMess.context,
            },]
            : [];

        messageSend = {
          ...messageSend,
          parentId: respondedMess.messageId,
          parent: {
            createdAt: new Date(),
            id: respondedMess.messageId,
            message: respondedMess.context,
            messageStatus: "1",
            messageType: respondedMess.type,
            parentId: "",
            status: "0",
            user: { userName: respondedMess.userName },
            attachments: attachments,
          },
        };
      }

      const response = await ChatInputServices.getInstance().sendMessage(messageSend);
      if (response) {
        // const data = response.data;
        // messageSend = { ...messageSend, id: data.id };

        setMessage("");
        respondedMess && setRespondedMess();
        !isScrollBottom && setIsScrollBottom(true)
      }
    }
  };

  const sendMessageFile = async (messSend: any) => {
    if (files?.length > 0) { 
      const imageFiles = files.filter((file:File) => isFileImage(file));

      if(imageFiles.length > 0) {
        let attachments: IAttachment[] = [];
        let formData = new FormData();
        const messageSend = JSON.parse(JSON.stringify(messSend))

        for (let index = 0; index < imageFiles.length; index++) {
          formData.append("fileContent", imageFiles[index]);
        }
  
        let response = await FileServices.send(formData);
  
        if (response && response.status === ENUM_KIND_OF_STATUS_CODE.SUCCESS) {
          const pathFileList = response.data;
  
          // quyennq : sửa gửi file :
          // Thêm type, name, size vào attachment
          for (let index = 0; index < pathFileList.length; index++) {
            await attachments.push({
              contentType: imageFiles[index].type,
              name: imageFiles[index].name,
              type: checkAttachment(imageFiles[index].name),
              fileSize: imageFiles[index].size,
              guiId: pathFileList[index].guid
            });
          }
  
          messageSend.messageType = ENUM_KIND_OF_MESSAGE.ATTACHMENT;
          messageSend.attachments = attachments;
          const lastFile = attachments[attachments.length - 1]
          // quyennq : thêm tin nhắn khi gửi attachment để hiển thị last message
          messageSend.message = 'Đã gửi ' + returnAttachment(lastFile.type);
  
          // Kiểm tra url có phải là object user hay không, nếu là user thì dùng api gửi message lần đầu
          if (await checkObjectUser(messageSend)) {
            return;
          }
  
          response = await ChatInputServices.getInstance().sendMessage(messageSend);
          if (response && response.status === ENUM_KIND_OF_STATUS_CODE.SUCCESS) {
  
          }
        }
      }

      const filesTemp = files.filter((file:File) => !isFileImage(file));
      if(filesTemp.length > 0) {
        const messageSend = JSON.parse(JSON.stringify(messSend))
        filesTemp.forEach(async (file:any) => {
          let attachments: IAttachment[] = [];
          let formData = new FormData();
          formData.append("fileContent", file);

          let response = await FileServices.send(formData);
  
          if (response && response.status === ENUM_KIND_OF_STATUS_CODE.SUCCESS) {
            const pathFileList = response.data;
    
            // quyennq : sửa gửi file :
            // Thêm type, name, size vào attachment
            for (let index = 0; index < pathFileList.length; index++) {
              await attachments.push({
                contentType: file.type,
                name: file.name,
                type: checkAttachment(file.name),
                fileSize: file.size,
                guiId: pathFileList[index].guid
              });
            }
    
            messageSend.messageType = ENUM_KIND_OF_MESSAGE.ATTACHMENT;
            messageSend.attachments = attachments;
            const lastFile = attachments[attachments.length - 1]
            // quyennq : thêm tin nhắn khi gửi attachment để hiển thị last message
            messageSend.message = 'Đã gửi ' + returnAttachment(lastFile.type);
    
            // Kiểm tra url có phải là object user hay không, nếu là user thì dùng api gửi message lần đầu
            if (await checkObjectUser(messageSend)) {
              return;
            }
    
            response = await ChatInputServices.getInstance().sendMessage(messageSend);
            if (response && response.status === ENUM_KIND_OF_STATUS_CODE.SUCCESS) {
    
            }
          }
        })
      }

      setFiles(null);
      setHasUploadFiles(false);
      !isScrollBottom && setIsScrollBottom(true)
    }
  };

  // const sendMessageFile = async (messageSend: any) => {
  //   if (files?.length > 0) {
  //     let attachments: IAttachment[] = [];
  //     const formData = new FormData();

  //     for (let index = 0; index < files.length; index++) {
  //       formData.append("fileContent", files[index]);

  //       attachments.push({
  //         contentType: files[index].type,
  //         name: files[index].name,
  //         type: checkAttachment(files[index].name),
  //         fileSize: files[index].size,
  //         guiId: "",
  //         isUploading:true
  //       });
  //     }

  //     messageSend.messageType = ENUM_KIND_OF_MESSAGE.ATTACHMENT;
  //     messageSend.attachments = attachments;
  //     messageSend.isUpdating = true;
  //     const lastFile = attachments[attachments.length - 1]
  //     // quyennq : thêm tin nhắn khi gửi attachment để hiển thị last message
  //     messageSend.message = 'Đã gửi ' + returnAttachment(lastFile.type);

  //     // Kiểm tra url có phải là object user hay không, nếu là user thì dùng api gửi message lần đầu
  //     if(await checkObjectUser(messageSend)){
  //       return;
  //     }

  //     if (respondedMess) {
  //       messageSend = {
  //         ...messageSend,
  //         parentId: respondedMess.messageId,
  //         parent: {
  //           createdAt: new Date(),
  //           id: respondedMess.messageId,
  //           message: respondedMess.context,
  //           messageStatus: "1",
  //           messageType: respondedMess.type,
  //           parentId: "",
  //           status: "0",
  //           user: { userName: respondedMess.userName },
  //         },
  //       };
  //     }

  //     setFiles(null);
  //     setHasUploadFiles(false);
  //     setRespondedMess();
  //     setIsScrollBottom(true)
  //     setListMessage((prev: any) => [messageSend, ...prev]);

  //     // let response = await FileServices.send(formData);

  //     // if (response) {
  //     //   const pathFileList = response.data;

  //     //   // quyennq : sửa gửi file :
  //     //   // Thêm type, name, size vào attachment

  //     //   response = await ChatInputServices.getInstance().sendMessage(messageSend);
  //     //   if (response) {
  //     //     // const data = response.data;
  //     //     // messageSend = { ...messageSend, id: data?.id };

  //     //     // setFiles(null);
  //     //     // setHasUploadFiles(false);
  //     //     // setRespondedMess();

  //     //     // setIsScrollBottom(true)
  //     //     // setListMessage((prev: any) => [messageSend, ...prev]);
  //     //   }
  //     // }
  //   }
  // };

  const checkObjectUser = async (messageSend: any) => {
    // Kiểm tra url có phải là object user hay không, nếu là user thì dùng api gửi message lần đầu
    const SUB_ROOM_ID = roomId.substring(18, 21);
    if (USER_OBJ_ID === SUB_ROOM_ID) {
      const response = await ChatListServices.getInstance().sendFirstMessage(messageSend);

      if (response && response.status === ENUM_KIND_OF_STATUS_CODE.SUCCESS) {
        const chatRoom = response.data;
        if (chatRoom !== undefined && chatRoom !== null) {

          history.push(`/g/${chatRoom.id}`);
        }
        return true;
      }
    }

    return false
  }

  const cb = (pathFileListTemp: string[]) => {
    setHasUploadFiles(true);
  };

  const setFilesState = (fileList: any) => {
    let filesTemp = fileList;
    if (files) {
      filesTemp = [...files, ...filesTemp];
    }

    const result = filesTemp.reduce((unique: any, item: any) => {
      if (!unique.some((file: any) => item.name === file.name)) {
        unique.push(item);
      }
      return unique;
    }, []);

    setFiles(result);
  };

  const fileSelector = buildFileSelector(true, false, cb, setFilesState);

  const handleFileSelect = (e: any) => {
    if (!editedMess) {
      e.preventDefault();
      fileSelector.click();

      setIsFocused(true)
    }
  };

  const removeFile = (name: string) => {
    const list = files.filter((file: any) => file.name !== name);
    setFiles(list);
    if (list.length === 0) {
      setHasUploadFiles(false);
    }
  };

  const removeEditedmess = () => {
    setEditedMess();
    setMessage("")
  }

  const showContextRespondedMess = () => {
    const { type, context } = respondedMess;
    switch (type) {
      case ENUM_KIND_OF_MESSAGE.TEXT:
        return context;
      case ENUM_KIND_OF_MESSAGE.ATTACHMENT:
        return "File";
      case ENUM_KIND_OF_MESSAGE.LINK:
        return "Link";
      default:
        return "";
    }
  };

  const classNameChatInput = () => {
    const containerClass = "chatinput-container";
    const extensionClass = "chatinput-extension";
    const hasResponseMessClass = "chatinput--hasresponseMess";
    const space = " ";
    let result = containerClass;

    if (hasUploadFiles || respondedMess) {
      result += space + extensionClass + space + hasResponseMessClass;
    } else {
      if (isMultilineText) {
        result += space + extensionClass;
      }
    }
    return result;
  };

  const addEmoji = (event: any) => {
    let sym = event.unified.split("-");
    let codesArray: any = [];
    sym.forEach((el: any) => codesArray.push("0x" + el));
    let emoji: string = String.fromCodePoint(...codesArray);
    setMessage((prev) => prev + emoji);
  };

  //hungdm - đẩy notification khi được tag tên
  const chatRoomId = useIdInPath();
  const userId = localStorage.getItem("userId") || "";
  const pushNotificationTagName = async (ListItem: any) => {
    if (ListItem) {
      for (let i = 0; i < ListItem.length; i++) {
        let params = {
          chatRoomId: chatRoomId,
          userIdSend:userId,
          userId: ListItem[i].id
        }
        const response = await ChatInputServices.getInstance().pushNotificationTagName(params);
      }
    }
    return true;
  }

  //hungdm - gán list Item được gắn thẻ
  const GetListMemberTag = async (Item: any) => {
    if (Item) {
      setListMemberTag(Item)
    }
    return true;
  }


  return {
    respondedMess,
    classNameChatInput,
    showContextRespondedMess,
    hasUploadFiles,
    handleFileSelect,
    removeFile,
    setIsMultilineText,
    message, setMessage,
    sendChat,
    isFocused, setIsFocused,
    setListMessage,
    addEmoji,
    isVisibleEmojiPicker, setVisibleEmojiPicker,
    editedMess,
    files,
    removeEditedmess,
    isSendChat,
    pushNotificationTagName,
    listMemberTag, setListMemberTag,
    GetListMemberTag
  };
}

export default ChatInputAdapter;
