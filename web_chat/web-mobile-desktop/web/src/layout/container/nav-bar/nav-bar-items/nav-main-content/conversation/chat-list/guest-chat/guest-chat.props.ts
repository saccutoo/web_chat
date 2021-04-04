import { IUser } from "../main/chat-list.props";

export interface IGuestChat {
    respondedMess: any,
    roomId: string,
    children: React.ReactNode,
    setRespondedMess: any,
    setChatList?: any,
    chat: any,
    shape: number,
    time: any
}