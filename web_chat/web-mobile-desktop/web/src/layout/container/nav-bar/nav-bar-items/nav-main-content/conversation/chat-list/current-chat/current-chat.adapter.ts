import { useState } from "react";
import { ENUM_KIND_OF_MESSAGE } from "../../../../../../../../libraries/Enum/message";
import { ENUM_KIND_OF_STATUS_CODE } from "../../../../../../../../libraries/Enum/status-code";
import ToastifyAdapter from "../../../../../../../../libraries/Features/toastify/toastify.adapter";
import { ICurrentChat } from "./current-chat.props";
import CurrentChatServices from "./current-chat.services";

function CurrentChatAdapter(props: ICurrentChat) {
    const [ popupRemoveIsDisplayed , setPopupRemoveIsDisplayed ] = useState<boolean>(false);
    const [ popupShareIsDisplayed , setPopupShareIsDisplayed ] = useState<boolean>(false);

    const { messageId , context , type  , setRespondedMess , roomId , userId , setChatList , setEditedMess } = props;
    const { success } = ToastifyAdapter();

    const setResponMess = () => {

        setRespondedMess({
            messageId,
            context,
            type
        })
    }

    const copyText = () => {
        if(props.type === ENUM_KIND_OF_MESSAGE.TEXT || props.type === ENUM_KIND_OF_MESSAGE.LINK){
            navigator.clipboard.writeText(props.context);
            success("Bạn đã copy thành công");
        } 
    }

    const removeMessage = async () => {
        let messageSend: any = {
            id:messageId,
            message: '',
            messageType: '',
            messageStatus: "1",
            userId: userId,
            user: {
                userName: "Test 1",
                status: "1",
                id: userId
            },
            chatRoomId: roomId,
            createdAt: new Date(),
            attachments: []
        }

        const response = await CurrentChatServices.getInstance().removeMessage(messageSend);
        if (response && response.status === ENUM_KIND_OF_STATUS_CODE.SUCCESS) {
            setChatList((prev: any) => prev.filter((chat:any) => chat.id !== messageId))
        }
    }

    const editMessage = () =>{
        if(type === ENUM_KIND_OF_MESSAGE.TEXT){
            setRespondedMess()
            
            setEditedMess({
                messageId,
                context,
                type
            })
        }
    }

    return {
        setResponMess,
        copyText,
        removeMessage,
        editMessage,
        type,
        popupRemoveIsDisplayed , setPopupRemoveIsDisplayed,
        popupShareIsDisplayed , setPopupShareIsDisplayed
    }
}

export default CurrentChatAdapter;