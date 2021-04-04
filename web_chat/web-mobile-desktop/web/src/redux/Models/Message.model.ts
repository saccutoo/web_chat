import { IUser } from "./User.model";

export interface IMessage{
    id: number,
    user: IUser,
    context: string,
    datetime: string,
    kindOfMess: number,
    isResponseMess: boolean,
    responseMess: IMessage
}