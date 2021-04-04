import useWindowSize from "../../../../../../libraries/Hooks/useWindowSize";
import { ENUM_KIND_OF_CHATROOM } from "../../../../../../libraries/Enum/chat-room";
import { ENUM_KIND_OF_STATUS } from "../../../../../../libraries/Enum/status";
import getApiUrl from "../../../../../../libraries/Functions/get-api-url";
import getTimePeriodFromNow from "../../../../../../libraries/Functions/get-time-period-from-now";
import { USER } from "../../../../../../libraries/Enum/user";

function DescriptionChatAdapter(props: any) {
    const { width } = useWindowSize();

    const { descriptionChat, activedDescriptionChat, onClick, } = props;
    let createdAt = null;
    try {
        if (descriptionChat.chats && descriptionChat.chats.length > 0) {
            // createdAt = moment(descriptionChat.chats[0]?.createdAt).format("HH:mm");
            createdAt = getTimePeriodFromNow(descriptionChat.chats[0]?.createdAt)
        }
    } catch (error) {
    }

    const lastMessage = descriptionChat.chats ? descriptionChat.chats[0]?.message : "";

    const isGroup = descriptionChat.type === ENUM_KIND_OF_CHATROOM.GROUP;

    let hasActived = false;
    if (activedDescriptionChat) {
        hasActived = activedDescriptionChat === descriptionChat.id;
    }
    const hasRead = descriptionChat.status === ENUM_KIND_OF_STATUS.ACTIVE;

    let isOnline = descriptionChat.status === ENUM_KIND_OF_STATUS.ACTIVE;

    let widthAva = "48px";
    let heightAva = "48px";
    if (width < 768) {
        widthAva = "40px";
        heightAva = "40px";
    }

    let nameConversation = descriptionChat.title;
    let srcImage = getApiUrl(descriptionChat.avatar);
    
    // useEffect(() => {
    //     console.log("123123")
        try {
            // quyennq 14/3/21 sửa lấy tên + avt người đối diện ở list chat room
            const lstMemberInRoom = descriptionChat.chat_room_members
            const userIdLogin: string = localStorage.getItem("userId") || "";
            if (!isGroup) {
                for (let i = 0; i < lstMemberInRoom.length; i++) {
                    if (lstMemberInRoom[i].userId !== userIdLogin) {
                        nameConversation = lstMemberInRoom[i].user.lastName + " " + lstMemberInRoom[i].user.firstName
                        let avatar = lstMemberInRoom[i].user.avatar
    
                        if (avatar !== undefined || avatar !== null) {
                            srcImage = getApiUrl(avatar);
                        }
                        isOnline = lstMemberInRoom[i].user.isOnline === USER.ONLINE ? true : false;
                        break;
                    }
                }
                // added by tuda
            } else {
                let flagStatusGroup = false;
                for (let i = 0; i < lstMemberInRoom.length; i++) {
                    if (lstMemberInRoom[i].userId !== userIdLogin && lstMemberInRoom[i].user.isOnline === USER.ONLINE) {
                        flagStatusGroup = true;
                        break;
                    }
                }
                isOnline = flagStatusGroup;
            }
        } catch (error) {
            
        }
    // }, [descriptionChat])

    return {
        isGroup,
        hasRead,
        hasActived,
        isOnline,
        createdAt,
        lastMessage,
        onClick,
        nameConversation,
        srcImage,
    }
}

export default DescriptionChatAdapter;
