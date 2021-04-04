export interface IUser{
    id:number,
    userName:string,
    avatar: string,
    isOnline: boolean,
    //...
}

export interface IMessage{
    id: number,
    userid: number,
    kindOfMess:number, // 0: text , 1 : image , 2: file , 3: link
    context: string,
    datetime: string,
    isGroupNoti:boolean,
    groupNoti:{
        status:number,
        username:string,
        imgSrc:string
    },
    useridHaveRead:number[],
}

export interface IConversation{
    id: number,
    name: string,
    avatar: string,
    isOnline:boolean,
    listUser: IUser[],
    listMessage: IMessage[]
}

export interface IGroup{
    id:number,
    name:string,
    avatar: string,
    isOnline: boolean,
    listUser: IUser[],
    listConversation: IConversation[]
}