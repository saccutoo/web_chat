import { IMessage } from "./Message.model";
import { IUser } from "./User.model";

export interface IGroup{
    id: number,
    name: string,
    avatar: string,
    listUser: IUser[],
    listMessage: IMessage[]
}