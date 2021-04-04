export interface IConversationDatabase{
    id: number,
    userIdList: number[],
    messageIdList: number[]
}

export const conversationDatabase: IConversationDatabase[] = [
    {
        id:1,
        userIdList:[1,2],
        messageIdList:[1,2,3,4,5,6,7]
    },
    {
        id:2,
        userIdList:[3,2],
        messageIdList:[8,9,10]
    },
]