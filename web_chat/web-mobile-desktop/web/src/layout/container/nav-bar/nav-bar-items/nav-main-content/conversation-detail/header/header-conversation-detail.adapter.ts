
import React,{useState,useEffect} from 'react'
import HeaderConversationDetailServices from './header-conversation-detail.services'
import useIdInPath from "../../../../../../../libraries/Hooks/useIdInPath";

function HeaderConversationDetailAdapter(){
    const [chatRoom, setChatRoom] = useState<any>();
    const roomIdInPath = useIdInPath();

    useEffect(() => {
        (async () => {
            const response = await HeaderConversationDetailServices().getInstance().getRoomChatById(roomIdInPath);
            if (response) {
                setChatRoom(response.result)
            }
        })();
    }, [])

    return {
        chatRoom, setChatRoom
    }
}

export default HeaderConversationDetailAdapter;