export interface IHeaderConversationDetail{
    name:string,
    title:string,
    srcImage:string,
    isAdmin?: string,
    eleOption:React.ReactElement, 
    isDisplay?:boolean,
    onChangeDisplay?:any
}