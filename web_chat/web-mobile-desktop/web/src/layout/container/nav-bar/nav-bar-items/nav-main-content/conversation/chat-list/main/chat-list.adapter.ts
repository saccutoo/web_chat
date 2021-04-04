import { useEffect , useRef, useState } from "react";
import { ENUM_KIND_OF_STATUS_CODE } from "../../../../../../../../libraries/Enum/status-code";
import useScrollChatList from "../../../../../../../../libraries/Hooks/useScrollChatList";
import ChatListServices from "./chat-list.services";
import { useHistory } from "react-router-dom";
import { ENUM_KIND_OF_MESSAGE } from "../../../../../../../../libraries/Enum/message";

function ChatListAdapter(props: any) {
  const history = useHistory();
  const chatlistRef = useRef<HTMLInputElement>(null);

  const { 
    count,
    page, setPage, 
    isUpdating, 
    roomId, 
    setListMessage , 
    isScrollBottom , setIsScrollBottom ,
    isFirstLoad , setIsFirstLoad,
    indexRecord
  } = props;

  // state
  const [userid, setUserid] = useState<string>("");
  const [bottom , setBottom] = useState<string>("60");
  const [isOpenOverlay , setIsOpenOverlay] = useState<boolean>(false);
  const [mainSrcImage , setMainSrcImage] = useState<string>()
  const [prevHeightChatList , setPrevHeightChatList] = useState<number>(0)
  const [scrollDownIsDisplayed , setScrollDownIsDisplayed] = useState<boolean>(false);

  useEffect(() => {
    const eleChatInput = document.getElementById("chat-input");
    if (eleChatInput) {
      setBottom(eleChatInput.offsetHeight.toString());
    }
  });

  // useEffect(() => {
  //     const userId: string = localStorage.getItem("userId") || "";
  //     if (userId) {
  //         console.log('test_init_app...');
  //         pushStreamService.subChat(userId);
  //     }
  // }, []);

  /**
   * Huy : Scroll xuống để load thêm data khi tới vị trí của text tìm kiếm
   */
  useEffect(() => {
    if (chatlistRef.current) {
      if(indexRecord > 0 && page > 1){
        const currentEle = chatlistRef.current;
        if(currentEle.scrollHeight === currentEle.clientHeight){
          console.log(122222222222222222222222222222)
        }
      }
    }
  });

  /**
   * Huy : Khi gửi tin nhắn thì scroll đến vị trí cuối cùng
   */
  useEffect(() => {
    if (isScrollBottom) { 
      if (chatlistRef.current) {
        const currentEle = chatlistRef.current;
        currentEle.scrollTop = currentEle.scrollHeight; 
      }

      setIsScrollBottom(false);
    }
  } , [ isScrollBottom , setIsScrollBottom ]);

  /**
   * Huy : Load lần đầu tiên thì scroll đến vị trí cuối cùng
   */
  useEffect(() => {
    if (chatlistRef.current) {
      const currentEle = chatlistRef.current;

      const clientHeightItems = currentEle.children[0]?.clientHeight - 40;
      const clientHeight = currentEle.clientHeight;      

      if (clientHeightItems > clientHeight && !isUpdating && !isFirstLoad) {
        setPrevHeightChatList(clientHeightItems)
        setIsFirstLoad(true)

        currentEle.scrollTop = currentEle.scrollHeight;
      } 
    }
  });

  /**
   * Huy : Load các page tiếp theo thì load đến vị trí của phần tử cuối cùng trước đấy
   */
  useEffect(() => {
    if (chatlistRef.current) {
      if ( page > 1 && !isUpdating && isFirstLoad ) {
        const nextHeightChatList = chatlistRef.current.children[0].clientHeight;
        setPrevHeightChatList(nextHeightChatList)
        
        chatlistRef.current.scrollTop = nextHeightChatList - prevHeightChatList;

      }
    }
  } , [ page , isUpdating ]);

  /**
   * Huy : Load đến vị trí mà phần tử muốn tìm kiếm
   */
  useEffect(() => {
    if (chatlistRef.current) {
      if(indexRecord !== 0){
        const refTemp = chatlistRef.current.children[0].children;
        const length = refTemp.length;
        if(length > indexRecord){
          let height = 0;
          for (let index = 0; index < length - indexRecord; index++) {
            height = refTemp[index].clientHeight;        
          }
  
          chatlistRef.current.scrollTop = height
        }
        if(page > 1){
          setScrollDownIsDisplayed(true)
        }
      }
    }

  } , [ indexRecord ])

  useEffect(() => {
    const userId = localStorage.getItem("userId") || "";
    setUserid(userId);
  }, [setUserid]);

  // HUY : scroll tới cuối
  const scrollDown = () =>{
    if (chatlistRef.current) {
      if(indexRecord){
        setListMessage([]);
        setPage(1);
      }

      setIsFirstLoad(false)
      setScrollDownIsDisplayed(false)
    }
  }

  const clickFirstMessage = async () => {
    const chats = {
      chatRoomId: roomId,
      message: "Xin chào",
      messageStatus: "1",
      messageType: ENUM_KIND_OF_MESSAGE.TEXT,
      user: { userName: "System", status: "1", id: userid },
      userId: userid,
      createdAt: new Date(),
      attachments: [],
    };

    // setListMessage((prev: any) => [chats, ...prev]);

    const response = await ChatListServices.getInstance().sendFirstMessage(
      chats
    );
    if (response &&response.status === ENUM_KIND_OF_STATUS_CODE.SUCCESS) {
      const chatRoom = response.data;
      if (chatRoom !== undefined && chatRoom !== null) {
        history.push(`/g/${chatRoom.id}`);
      }
    }
  };

  const { handleScroll } = useScrollChatList(
    page,
    setPage,
    count,
    isUpdating,
    chatlistRef,
    indexRecord,
    setScrollDownIsDisplayed
  );

  const toggleOverlay = (srcImage: string) => {
    if (isOpenOverlay) {
      setMainSrcImage("");
    } else {
      setMainSrcImage(srcImage);
    }

    setIsOpenOverlay((prev) => !prev);
  };


  return {
    userid,
    chatlistRef,
    handleScroll,
    isUpdating,
    clickFirstMessage,
    bottom,
    isOpenOverlay,
    mainSrcImage,
    toggleOverlay,
    scrollDown,
    scrollDownIsDisplayed,
  };
}

export default ChatListAdapter;
