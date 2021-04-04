export interface IChatRoom{
    id?: string,
    avatar?: string,
    title?: string,
    description?:string,
    status?:string,
    type?:string,
    slogan?:string,
    createdBy?: string;
    createdAt?: Date;
    updatedAt?: Date;
    lastMessage?: string;
    isOnline?: string;
}