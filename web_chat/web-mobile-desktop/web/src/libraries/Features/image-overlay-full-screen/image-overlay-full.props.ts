export interface IImageOverlay {
    close:any,
    miniImageList: IMiniImage[],
    mainMiniImage: IMiniImage
}

export interface IMiniImage{
    id:string,
    srcImage: string,
    userName:string,
    index:number,
    createdAt?:Date
}