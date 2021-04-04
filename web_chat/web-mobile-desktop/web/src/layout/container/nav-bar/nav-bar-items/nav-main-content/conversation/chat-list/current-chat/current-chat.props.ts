
export interface ICurrentChat {
    roomId:string,
    type: string,
    context: string,
    children: React.ReactNode,
    setRespondedMess:any,
    messageId: string,
    userId: string,
    setChatList: any,
    setEditedMess: any,
    attachment?: any
}