export interface IHeaderCreateGroup {
    title:string;
    setTitle:(title:string) => void,
    slogan:string;
    setSlogan:(title:string) => void,
    setAvatar:any
    setAvatarTemp:(title:string[]) => void,
    avatarTemp:string[]
}