export interface ICircleAvatar {
    src: string,
    width?: string,
    height?: string,
    class: string,
    isOnline: boolean,
    hasCursor?: boolean,
    canRomove?:boolean,
    onRemove?:any,
    onClick?:any,
    ref?:any,
    notiIcon?:any,
    title?:string
}
