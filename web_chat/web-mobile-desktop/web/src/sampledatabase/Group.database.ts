export interface IGroupDatabase{
    id: number,
    name: string,
    avatar: string,
    userIdList: number[],
    messageIdList: number[]
}

export const groupDatabase: IGroupDatabase[] = [
    {
        id:1,
        name:"Hội người yêu chim",
        avatar:'https://www.w3schools.com/w3images/avatar2.png',
        userIdList:[1,2],
        messageIdList:[11,12],
    },
    {
        id:2,
        name:"Hội người yêu chim",
        avatar:'https://www.w3schools.com/w3images/avatar2.png',
        userIdList:[3,2],
        messageIdList:[8,9],
    },
    {
        id:3,
        name:"Hội người yêu chim",
        avatar:'https://www.w3schools.com/w3images/avatar2.png',
        userIdList:[3,2],
        messageIdList:[8,9],
    },
]