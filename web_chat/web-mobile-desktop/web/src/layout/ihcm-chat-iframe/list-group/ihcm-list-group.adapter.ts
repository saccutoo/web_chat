import { useEffect, useState, useCallback, useContext, useReducer } from "react";
import EventBus, {
    EventBusName,
    EventBusType,
} from "../../../helpers/api/event-bus";
import ReconnectingWebSocket from 'reconnecting-websocket';
import { APP_CONFIGS } from "../../../helpers/api/app-config";
import useEventBus from "../../../libraries/Hooks/useEventBus";
import ihcmListGroupServices from "./ihcm-list-group.services";
import { ENUM_KIND_OF_STATUS_CODE } from "../../../libraries/Enum/status-code";
import { IHCM_MESSAGE } from "../../../libraries/Enum/ihcm-message";
import { UserContext } from "../../../App";
import debounce from "../../../libraries/Functions/debounce";
import DescriptionChatListServices from "../../container/nav-bar/nav-bar-items/nav-messages/main/description-chat-list.services";
import useEventListener from "../../../libraries/Hooks/useEventListener";
import { ISearchChatRoom } from "../../container/nav-bar/nav-bar-items/nav-messages/description-chat/description-chat.props";

const WAIT_INTERVAL = 1000;

function IhcmListGroupAdapater() {
    // state
    const [listGroup, setListGroup] = useState<any>([]);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [page, setPage] = useState<number>(1);
    const [activedId, setActivedId] = useState<string>("");
    const [isUpdating, setIsUpdating] = useState<boolean>(false);
    const [isShowSkeleton, setShowSkeleton] = useState<boolean>(false);
    const [textSearch, setTextSearch] = useState<string>("");
    const [hasSearch, setHasSearch] = useState<boolean>(false);
    const [searchDescriptionChatList, setSearchDescriptionChatList] = useState<ISearchChatRoom[]>([]);

    const user = useContext(UserContext);
    // Huy : nhận data từ event bus
    const handleOnEventBus = (res: EventBusType) => {
        const payload = res?.payload;

        if (payload) {
            switch (res?.type) {
                case EventBusName.NEW_MESSENGER:
                    handleNewMessageOnEventBus(payload);
                    break;
                case EventBusName.PUSH_UPDATE_AVATAR:
                    handleUpdateAvatarOnEventBus(payload);
                    break;
            }
        }
    }

    const handleNewMessageOnEventBus = (payload: any) => {
        let newMess = payload;
        setListGroup((prev: any) => {
            const hasItem = prev.some((item: any) => item.id === newMess.chatRoomId);
            if (hasItem) {
                const group = prev.find((item: any) => item.id === newMess.chatRoomId);
                console.log(group)
                const newGroup = {
                    ...group,
                    chats: [
                        {
                            ...group.chats[0],
                            message: newMess.message,
                            createdAt: newMess.createdAt
                        }
                    ]
                }
                const listTemp = prev.filter((item: any) => item.id !== newGroup.id)
                return [newGroup, ...listTemp]
            }
            return prev
        });
    }

    const handleUpdateAvatarOnEventBus = (payload: any) => {
        let updatedGroup = payload;
        setListGroup((prev: any) => {
            const hasItem = prev.some((item: any) => item.id === updatedGroup.id);
            if (hasItem) {
                return prev.map((item: any) => {
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

    useEventBus(handleOnEventBus)

    useEffect(() => {
        const getData = async () => {
            setIsUpdating(true);
            const userId = localStorage.getItem("userId");
            const pageSize = process.env.REACT_APP_NUM_ITEMS_PER_PAGE;
            const response = await ihcmListGroupServices.getInstance().getListChatRooms(page, pageSize, userId);
            if (response && response.status === ENUM_KIND_OF_STATUS_CODE.SUCCESS) {
                setTotalPages(response.totalPages);
                setListGroup((prev: any) => [...prev, ...response.data]);
            }
            setIsUpdating(false);
        }

        getData();
    }, [page])

    const setActivedGroup = async (roomId: string) => {
        setActivedId(roomId);

        // tuda: open box chat
        window.parent.postMessage(IHCM_MESSAGE.OPEN_BOX_CHAT, "*");

        // tuda: send room id to box chat
        let messageSendRoomId = {
            roomId: roomId,
            userId: localStorage.getItem('userId')
        }
        await ihcmListGroupServices.getInstance().sendRoomIdToBoxChat(messageSendRoomId);
    }

    const openNewTabChat = () => {
        window.open(window.location.protocol, '_blank');
    }

    const openNewTabCreateChat = (tabPersonal: boolean) => {
        window.open(window.location.protocol + (tabPersonal ? '/p' : '/g') + '/create', '_blank');
    }

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
                setListGroup((prev: any) => [...prev, ...response.data]);
            }

            setIsUpdating(false);
        };

        getData();
    }, [page, setListGroup, setTotalPages, setIsUpdating]);

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
        if (hasSearch) {
            (async () => {
                if (textSearch) {
                    console.log("🚀 ~ file: description-chat-list.adapter.ts ~ line 271 ~ query", textSearch)
                    const userId = localStorage.getItem("userId");
                    const pageSize = process.env.REACT_APP_NUM_CHAT_ITEMS_PER_PAGE;
                    const dataSearch = await DescriptionChatListServices.getInstance().searchListChatRoom(
                        textSearch,
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
            setTextSearch("");
        }
    }, [hasSearch, textSearch]);

    return {
        listGroup,
        totalPages,
        page, setPage,
        isUpdating,
        setActivedGroup,
        activedId,
        openNewTabChat,
        openNewTabCreateChat,
        textSearch, setTextSearch,
        isShowSkeleton,
        searchDescriptionChatList,
        hasSearch, setHasSearch
    }
}

export default IhcmListGroupAdapater;