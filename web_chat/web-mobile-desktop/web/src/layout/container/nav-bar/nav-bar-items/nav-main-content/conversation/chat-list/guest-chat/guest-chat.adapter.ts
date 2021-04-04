import { useState } from "react";
import { useHistory } from "react-router-dom";
import { ENUM_KIND_OF_MESSAGE } from "../../../../../../../../libraries/Enum/message";
import ToastifyAdapter from "../../../../../../../../libraries/Features/toastify/toastify.adapter";
import { IGuestChat } from "./guest-chat.props";
import GuestChatServices from "./guest-chat.services";

function GuestChatAdapter(props: IGuestChat) {
    // state
    const [isVisibleReaction, setVisibleReaction] = useState<Boolean>(false);

    const history = useHistory();
    const { success } = ToastifyAdapter();

    const { chat , setRespondedMess , roomId } = props;

    const { user , user: { userName } } = chat;

    const type = chat.messageType

    const context= chat.messageType === ENUM_KIND_OF_MESSAGE.ATTACHMENT ? chat.attachments[0]?.name : chat.message

    const redirectToDetailUser = () => {
        history.push("/personal/detail/" + roomId);
    }

    const setResponMess = () => {

        const chatId = chat.id;
        setRespondedMess({
            chatId,
            context,
            type,
            userName
        })
    }

    const addReaction = async (event: any) => {
        // console.log(props.message.id);
        let sym = event.unified.split('-')
        let codesArray: any = []
        sym.forEach((el: any) => codesArray.push('0x' + el))
        let emoji: string = String.fromCodePoint(...codesArray)
        // console.log(emoji);

        let loginId = localStorage.getItem("userId");

        let messageTemp = chat;
        // console.log(message);
        if (messageTemp.reaction) {
            let reactionList = messageTemp.reaction;
            if (reactionList.constructor !== [{}].constructor) {
                reactionList = JSON.parse(reactionList);
            }
            let flagEmoji: boolean = false;
            for (let reaction of reactionList) {
                if (reaction.key === emoji) {
                    let flag: boolean = false;
                    for (let userId of reaction.userListId) {
                        if (userId === loginId) {
                            flag = true;
                            reaction.userListId = reaction.userListId.filter((item: string) => item !== loginId);
                            break;
                        }
                    }
                    if (!flag) {
                        // console.log("add")
                        // console.log(reaction.userListId)
                        reaction.userListId.push(loginId);
                        // console.log(reaction.userListId)
                    }
                    flagEmoji = true;
                    break
                }
            }
            if (!flagEmoji) {
                let newKey = {
                    key: emoji,
                    userListId: [loginId]
                }
                reactionList.push(newKey);
            }
            messageTemp["reaction"] = reactionList;
        } else {
            messageTemp["reaction"] = [
                {
                    key: emoji,
                    userListId: [loginId]
                }
            ]
        }


        messageTemp["reaction"] = JSON.stringify(messageTemp["reaction"]);
        await GuestChatServices.getInstance().updateMessage(messageTemp);

    }

    const copyText = () => {
        if(type === ENUM_KIND_OF_MESSAGE.TEXT || type === ENUM_KIND_OF_MESSAGE.LINK){
            navigator.clipboard.writeText(context);
            success("Bạn đã copy thành công");
        } 
    }

    return {
        redirectToDetailUser,
        setResponMess,
        copyText,
        addReaction,
        isVisibleReaction, setVisibleReaction,
        type,
        user
    }
}

export default GuestChatAdapter;