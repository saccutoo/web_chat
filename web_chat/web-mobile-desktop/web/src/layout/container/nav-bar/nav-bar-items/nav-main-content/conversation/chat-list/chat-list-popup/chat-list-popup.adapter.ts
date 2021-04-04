import { IChat } from './../../main/conversation.props';
import { useEffect, useState } from "react";
import { ENUM_KIND_OF_MESSAGE } from "../../../../../../../../libraries/Enum/message";
import { ENUM_KIND_OF_STATUS_CODE } from "../../../../../../../../libraries/Enum/status-code";
import ChatInputServices from "../../chat-input/main/chat-input.services";
import useIdInPath from '../../../../../../../../libraries/Hooks/useIdInPath';
import ChatListPopupServices from './chat-list-popup.services';
import checkAttachment from '../../../../../../../../libraries/Functions/check-attachment';
import { IUserOther } from './chat-list-popup.props';

function ChatListPopupAdapter() {
    const [popupRemoveIsDisplayed, setPopupRemoveIsDisplayed] = useState<boolean>(false);
    const [popupShareIsDisplayed, setPopupShareIsDisplayed] = useState<boolean>(false);
    const [listChatInPopup, setListChatInPopup] = useState<[]>();
    const [listUserOtherConversion, setListUserOtherConversion] = useState<IUserOther[]>();
    useEffect(() => {
        (async () => {
            const data = {
                userId: localStorage.getItem("userId") || ""
            }
            const response = await ChatListPopupServices().getInstance().getListChatInPopup(data);
            if (response) {
                setListChatInPopup(response.data)
            }
            const response2 = await ChatListPopupServices().getInstance().getListUserOther(data);
            if (response2) {
                setListUserOtherConversion(response2.data)
            }
        })();
    }, [])

    const shareMessage = async (itemMessageShare: any, roomId: string) => {
        let itemMessage: IChat;
        itemMessage = {
            message: itemMessageShare.itemMessge.context,
            messageType: itemMessageShare.itemMessge.type,
            messageStatus: "1",
            userId: itemMessageShare.itemMessge.userId,
            user: { userName: "System", status: "1", id: itemMessageShare.itemMessge.userId },
            chatRoomId: roomId,
            createdAt: new Date(),
            attachments: []
        }
        if (itemMessageShare.itemMessge.type === "1") {
            const attachments = [{
                contentType: itemMessageShare.itemMessge.attachment.contentType,
                name: itemMessageShare.itemMessge.attachment.name,
                type: checkAttachment(itemMessageShare.itemMessge.attachment.name),
                fileSize: itemMessageShare.itemMessge.attachment.fileSize,
                guiId: itemMessageShare.itemMessge.attachment.guiId
            }];
            itemMessage.attachments = attachments;
        }
        let response = await ChatInputServices.getInstance().sendMessage(itemMessage);
        if (response) {
            return alert("Share thành công");
        }
        return alert("Share thất bại");
    }

    return {
        popupRemoveIsDisplayed, setPopupRemoveIsDisplayed,
        popupShareIsDisplayed, setPopupShareIsDisplayed,
        listChatInPopup, setListChatInPopup,
        listUserOtherConversion, setListUserOtherConversion,
        shareMessage
    }
}

export default ChatListPopupAdapter;
